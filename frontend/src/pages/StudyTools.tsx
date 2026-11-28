import { useState } from "react";

const kana = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";
const readings = "a i u e o ka ki ku ke ko sa shi su se so ta chi tsu te to na ni nu ne no ha hi fu he ho ma mi mu me mo ya yu yo ra ri ru re ro wa wo n".split(" ");
const notesKey = "nihongo-study-notes";

export default function StudyTools() {
  const [katakana, setKatakana] = useState(false);
  const [question, setQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [speech, setSpeech] = useState("");
  const [speechStatus, setSpeechStatus] = useState("");
  const [notes, setNotes] = useState(() => {
    try { return localStorage.getItem(notesKey) ?? ""; } catch { return ""; }
  });
  const [noteStatus, setNoteStatus] = useState("");
  const symbols = [...kana].map(char => katakana ? String.fromCharCode(char.charCodeAt(0) + 96) : char);

  function speak() {
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
      setSpeechStatus("ဒီ browser မှာ အသံဖတ်စနစ် မရပါ။");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(speech.trim());
    utterance.lang = "ja-JP";
    const voice = window.speechSynthesis.getVoices().find(item => /^ja(?:-|_|$)/i.test(item.lang));
    if (voice) utterance.voice = voice;
    utterance.onerror = event => {
      if (event.error !== "canceled" && event.error !== "interrupted") {
        setSpeechStatus("ဂျပန်အသံ ဖွင့်မရပါ။ စက်ရဲ့ voice settings ကို စစ်ကြည့်ပါ။");
      }
    };
    setSpeechStatus("");
    window.speechSynthesis.speak(utterance);
  }

  return (
    <div className="library lookup-tools">
      <section className="word-card">
        <h2>Kana ဇယား</h2>
        <label><input className="kana-toggle" type="checkbox" checked={katakana} onChange={event => {
          setKatakana(event.target.checked);
          setAnswer("");
          setFeedback("");
        }} /> Katakana</label>
        <ul className="kana-grid" aria-label={katakana ? "Katakana" : "Hiragana"}>
          {symbols.map((symbol, index) => (
            <li key={symbol}><strong lang="ja">{symbol}</strong><small>{readings[index]}</small></li>
          ))}
        </ul>
      </section>
      <section className="word-card">
        <h2>Kana Quiz</h2>
        <form onSubmit={event => {
          event.preventDefault();
          setFeedback(answer.trim().toLowerCase() === readings[question]
            ? "မှန်ပါတယ်။" : `အဖြေမှန်က ${readings[question]} ပါ။`);
        }}>
          <p className="quiz-symbol" lang="ja">{symbols[question]}</p>
          <label htmlFor="kana-answer">Romaji ဖတ်ပုံ</label>
          <input id="kana-answer" value={answer} onChange={event => setAnswer(event.target.value)} />
          <button className="saved-filter" disabled={!answer.trim()}>အဖြေစစ်မယ်</button>
          <p role="status">{feedback}</p>
        </form>
        <button className="saved-filter" onClick={() => {
          setQuestion(current => (current + 1 + Math.floor(Math.random() * (symbols.length - 1))) % symbols.length);
          setAnswer("");
          setFeedback("");
        }}>နောက်တစ်ခု</button>
      </section>
      <section className="word-card">
        <h2>ဂျပန်စာ အသံထွက်</h2>
        <form onSubmit={event => { event.preventDefault(); speak(); }}>
          <label htmlFor="speech-text">ဖတ်စေချင်တဲ့ ဂျပန်စာ</label>
          <textarea id="speech-text" lang="ja" rows={4} value={speech} onChange={event => setSpeech(event.target.value)} />
          <button className="saved-filter" disabled={!speech.trim()}>အသံဖွင့်မယ်</button>
          <p role="status">{speechStatus}</p>
        </form>
      </section>
      <section className="word-card">
        <h2>လေ့လာရေးမှတ်စု</h2>
        <form onSubmit={event => {
          event.preventDefault();
          try {
            localStorage.setItem(notesKey, notes);
            setNoteStatus("ဒီ browser မှာ သိမ်းပြီးပါပြီ။");
          } catch {
            setNoteStatus("မှတ်စု သိမ်းလို့မရပါ။");
          }
        }}>
          <label htmlFor="study-notes">ကိုယ်ပိုင်မှတ်စု</label>
          <textarea id="study-notes" rows={4} value={notes} onChange={event => {
            setNotes(event.target.value);
            setNoteStatus("");
          }} />
          <button className="saved-filter">မှတ်စုသိမ်းမယ်</button>
          <p role="status">{noteStatus}</p>
        </form>
      </section>
    </div>
  );
}
