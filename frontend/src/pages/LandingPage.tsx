import { useEffect, useState } from "react";
import { LookupTools, type Language } from "./LookupTools";

const languages = { my: "မြန်မာ", en: "English", ja: "日本語", th: "ไทย" };
const subtitles = {
  my: "ဂျပန်အဘိဓာန်နှင့် မြန်မာဘာသာပြန်",
  en: "Japanese dictionary & Burmese translation",
  ja: "日本語辞書とミャンマー語翻訳",
  th: "พจนานุกรมญี่ปุ่นและแปลภาษาพม่า",
};

export default function LandingPage() {
  const [language, setLanguage] = useState<Language>("my");
  useEffect(() => { document.documentElement.lang = language; }, [language]);

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top"><span className="brand-mark" lang="ja">日</span><b>Nihongo Companion</b></a>
        <label className="language-picker">
          <span className="sr-only">Language</span>
          <select value={language} onChange={event => setLanguage(event.target.value as Language)}>
            {Object.entries(languages).map(([code, label]) => <option key={code} value={code} lang={code}>{label}</option>)}
          </select>
        </label>
      </header>
      <main id="top">
        <div className="study-hero">
          <h1>{subtitles[language]}</h1>
        </div>
        <LookupTools language={language} />
      </main>
    </>
  );
}
