import { useState, type FormEvent } from "react";

interface DictionaryResult {
  words: {
    reading: { kanji?: string; kana: string };
    senses: { glosses: string[] }[];
  }[];
  kanji: { literal: string; meanings: string[]; onyomi: string[]; kunyomi: string[]; stroke_count: number }[];
}

interface TranslationResult {
  responseStatus: number;
  quotaFinished: boolean;
  responseData?: { translatedText?: string };
}

const labels = {
  my: ["အဘိဓာန်", "ဘာသာပြန်", "ဂျပန်စကားလုံး ရှာပါ", "ဘာသာပြန်လိုသော စာသား", "ရှာမယ်", "ဘာသာပြန်မယ်", "ရလဒ် မတွေ့ပါ", "ဝန်ဆောင်မှု ခေတ္တအသုံးမပြုနိုင်ပါ။ ထပ်စမ်းကြည့်ပါ။", "စောင့်ပါ…", "သိမ်းထားသော စကားလုံးများ", "အဖြေပြပါ", "နောက်တစ်လုံး", "လေ့ကျင့်ရန် စကားလုံး အရင်သိမ်းပါ။"],
  en: ["Dictionary", "Translation", "Search Japanese vocabulary", "Text to translate", "Search", "Translate", "No results", "Service unavailable. Please try again.", "Loading…", "Review saved words", "Reveal answer", "Next word", "Save a word to start reviewing."],
  ja: ["辞書", "翻訳", "日本語の単語を検索", "翻訳する文章", "検索", "翻訳する", "結果がありません", "サービスに接続できません。もう一度お試しください。", "読み込み中…", "保存した単語の復習", "答えを見る", "次の単語", "単語を保存すると復習できます。"],
  th: ["พจนานุกรม", "แปลภาษา", "ค้นหาคำศัพท์ญี่ปุ่น", "ข้อความที่จะแปล", "ค้นหา", "แปล", "ไม่พบผลลัพธ์", "บริการไม่พร้อมใช้งาน กรุณาลองอีกครั้ง", "กำลังโหลด…", "ทบทวนคำที่บันทึก", "ดูคำตอบ", "คำถัดไป", "บันทึกคำศัพท์เพื่อเริ่มทบทวน"],
} as const;

type Language = keyof typeof labels;

export function LookupTools({ language }: { language: Language }) {
  const t = labels[language];
  const [query, setQuery] = useState("");
  const [dictionary, setDictionary] = useState<DictionaryResult>();
  const [lookupStatus, setLookupStatus] = useState<"idle" | "pending" | "error">("idle");
  const [sourceText, setSourceText] = useState("");
  const [reverse, setReverse] = useState(false);
  const [translation, setTranslation] = useState("");
  const [translationStatus, setTranslationStatus] = useState<"idle" | "pending" | "error">("idle");
  const byteCount = new TextEncoder().encode(sourceText.trim()).length;

  async function lookup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!query.trim() || lookupStatus === "pending") return;
    setDictionary(undefined);
    setLookupStatus("pending");
    try {
      const response = await fetch("https://jotoba.de/api/search/words", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query.trim(), language: "English", no_english: false }),
        signal: AbortSignal.timeout(12000),
      });
      if (!response.ok) throw new Error("Dictionary lookup failed");
      const result = await response.json() as DictionaryResult;
      if (!Array.isArray(result.words) || !Array.isArray(result.kanji)) throw new Error("Invalid dictionary response");
      setDictionary(result);
      setLookupStatus("idle");
    } catch {
      setLookupStatus("error");
    }
  }

  async function translate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!byteCount || byteCount > 500 || translationStatus === "pending") return;
    setTranslation("");
    setTranslationStatus("pending");
    try {
      const params = new URLSearchParams({
        q: sourceText.trim(),
        langpair: reverse ? "my|ja" : "ja|my",
      });
      const response = await fetch(`https://api.mymemory.translated.net/get?${params}`, {
        signal: AbortSignal.timeout(12000),
      });
      if (!response.ok) throw new Error("Translation failed");
      const result = await response.json() as TranslationResult;
      const translatedText = result.responseData?.translatedText;
      if (result.responseStatus !== 200 || result.quotaFinished || !translatedText) {
        throw new Error("Translation unavailable");
      }
      setTranslation(translatedText);
      setTranslationStatus("idle");
    } catch {
      setTranslationStatus("error");
    }
  }

  return (
    <div className="library lookup-tools">
      <section className="word-card" aria-labelledby="dictionary-title">
        <h2 id="dictionary-title">{t[0]}</h2>
        <form onSubmit={lookup}>
          <label htmlFor="dictionary-query">{t[2]}</label>
          <input id="dictionary-query" value={query} maxLength={100}
            disabled={lookupStatus === "pending"} onChange={event => setQuery(event.target.value)} />
          <button className="saved-filter" disabled={!query.trim() || lookupStatus === "pending"}>{t[4]}</button>
        </form>
        <small><a href="https://jotoba.de/">Jotoba · JMdict / KANJIDIC</a> · EN</small>
        <div aria-live="polite">
          {lookupStatus === "pending" && <p>{t[8]}</p>}
          {lookupStatus === "error" && <p>{t[7]}</p>}
          {dictionary && !dictionary.words.length && !dictionary.kanji.length && <p>{t[6]}</p>}
        </div>
        {dictionary?.words.slice(0, 15).map((word, index) => (
          <article className="lookup-result" key={index}>
            <h3 lang="ja">{word.reading.kanji ?? word.reading.kana}</h3>
            {word.reading.kanji && <p lang="ja">{word.reading.kana}</p>}
            <ol lang="en">{word.senses.map((sense, i) => <li key={i}>{sense.glosses.join(", ")}</li>)}</ol>
          </article>
        ))}
        {dictionary?.kanji.slice(0, 10).map(kanji => (
          <article className="lookup-result" key={kanji.literal}>
            <h3 lang="ja">{kanji.literal} · {kanji.stroke_count} 画</h3>
            <p lang="ja">{[...(kanji.onyomi ?? []), ...(kanji.kunyomi ?? [])].join(" / ")}</p>
            <p lang="en">{kanji.meanings.join(", ")}</p>
          </article>
        ))}
      </section>
      <section className="word-card" aria-labelledby="translation-title">
        <h2 id="translation-title">{t[1]}</h2>
        <form onSubmit={translate}>
          <select aria-label={t[1]} disabled={translationStatus === "pending"} value={String(reverse)} onChange={event => {
            setReverse(event.target.value === "true");
            setTranslation("");
            setTranslationStatus("idle");
          }}>
            <option value="false">日本語 → မြန်မာ</option>
            <option value="true">မြန်မာ → 日本語</option>
          </select>
          <label htmlFor="translation-input">{t[3]}</label>
          <textarea id="translation-input" lang={reverse ? "my" : "ja"} rows={4}
            value={sourceText} disabled={translationStatus === "pending"}
            onChange={event => {
              setSourceText(event.target.value);
              setTranslation("");
              setTranslationStatus("idle");
            }} />
          <small>{byteCount} / 500 bytes · <a href="https://mymemory.translated.net/">MyMemory</a></small>
          <button className="saved-filter" disabled={!byteCount || byteCount > 500 || translationStatus === "pending"}>{t[5]}</button>
        </form>
        <div aria-live="polite">
          {translationStatus === "pending" && <p>{t[8]}</p>}
          {translationStatus === "error" && <p>{t[7]}</p>}
          {translation && <p className="example" lang={reverse ? "ja" : "my"}>{translation}</p>}
        </div>
      </section>
    </div>
  );
}

interface ReviewWord {
  id: number;
  kanji: string;
  reading: string;
  meaning: Record<Language, string>;
}

export function Flashcards({ words, language }: { words: ReviewWord[]; language: Language }) {
  const [position, setPosition] = useState(0);
  const [revealedId, setRevealedId] = useState<number>();
  const word = words.length ? words[position % words.length] : undefined;
  const t = labels[language];
  return (
    <section className="word-card flashcards" aria-labelledby="review-title">
      <h2 id="review-title">{t[9]}</h2>
      {word ? (
        <>
          <h3 lang="ja">{word.kanji}</h3>
          {revealedId === word.id && <p><span lang="ja">{word.reading}</span> · {word.meaning[language]}</p>}
          <button className="saved-filter" onClick={() => setRevealedId(word.id)}>{t[10]}</button>{" "}
          <button className="saved-filter" onClick={() => {
            setPosition(current => (current + 1) % words.length);
            setRevealedId(undefined);
          }}>{t[11]}</button>
        </>
      ) : <p>{t[12]}</p>}
    </section>
  );
}
