// pages/index.js
import Head from "next/head";
import { useEffect, useRef, useState } from "react";

const WORDS = ["calm", "safe", "focused", "quiet", "scam-free"];

function Rotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI(v => (v + 1) % WORDS.length), 1400);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-block">
      <span className="sr-only">{WORDS[i]}</span>
      {WORDS.map((w, idx) => (
        <span
          key={w}
          className={`absolute inset-0 transition-opacity duration-500 ${idx === i ? "opacity-100" : "opacity-0"}`}
        >
          {w}
        </span>
      ))}
    </span>
  );
}

export default function Home() {
  const API = process.env.NEXT_PUBLIC_API_URL || "";
  const [from, setFrom] = useState("amy@siftmail.app");
  const [subject, setSubject] = useState("🚨 Your package is on hold");
  const [body, setBody] = useState("We attempted delivery but need your payment info. Click here: http://bit.ly/hold-pkg");
  const [out, setOut] = useState(null);
  const [err, setErr] = useState("");

  async function score(e) {
    e.preventDefault();
    setErr(""); setOut(null);
    if (!API) { setErr("Set NEXT_PUBLIC_API_URL to enable live scoring."); return; }
    try {
      const r = await fetch(API.replace(/\/$/,"") + "/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from_addr: from, subject, text: body })
      });
      if (!r.ok) throw new Error("HTTP " + r.status);
      setOut(await r.json());
    } catch (ex) { setErr(String(ex)); }
  }

  const confetti = useRef(null);
  useEffect(() => {
    if (!out || !confetti.current) return;
    confetti.current.animate(
      [{ transform: "scale(.98)", opacity: .7 }, { transform: "scale(1)", opacity: 1 }],
      { duration: 300, easing: "cubic-bezier(.2,.8,.2,1)" }
    );
  }, [out]);

  return (
    <>
      <Head>
        <title>SiftMail — Take Back Control of Your Inbox</title>
        <meta name="description" content="SiftMail filters out spam, scams, and distractions — leaving only the emails that matter." />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      <div className="relative min-h-screen overflow-hidden bg-[#060b18] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -inset-[20%] bg-[radial-gradient(60%_40%_at_50%_10%,rgba(80,180,255,.25),transparent_60%)]" />
          <div className="animate-spin-slow absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-cyan-400/30 via-fuchsia-400/20 to-violet-500/30 blur-3xl" />
          <div className="animate-pulse-slow absolute -bottom-24 -left-24 h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-emerald-400/30 via-sky-400/20 to-blue-500/30 blur-3xl" />
          <div className="mask-grid absolute inset-0 opacity-[.08]" />
        </div>

        <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="inline-grid h-8 w-8 place-items-center rounded-xl bg-white text-[#0b1b2d] font-black">S</span>
            <span className="text-lg font-semibold tracking-tight">SiftMail</span>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <a href="#features" className="text-white/70 hover:text-white">Features</a>
            <a href="#playground" className="text-white/70 hover:text-white">Playground</a>
            <a href="/extension.zip" className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#0b1b2d] hover:brightness-95" download>⬇️ Download for Chrome</a>
          </div>
        </nav>

        <header className="relative z-10 mx-auto max-w-6xl px-6 pb-8 pt-10 sm:pt-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
            ✨ New: inbox health scoring • phishing shield • promotions mute
          </div>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-6xl">
            Your inbox, finally{" "}
            <span className="bg-gradient-to-tr from-cyan-300 via-sky-400 to-fuchsia-400 bg-clip-text text-transparent"><Rotator /></span>.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            SiftMail removes spam and scams in real-time, boosts people-first emails to the top,
            and gives you a dead-simple “peace mode” when you need focus.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href="#playground" className="rounded-xl bg-gradient-to-tr from-sky-400 to-fuchsia-400 px-5 py-3 font-semibold text-[#0b1020] shadow-lg shadow-sky-500/20 hover:brightness-95">Try the live spam check</a>
            <a href="/extension.zip" download className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10">⬇️ Add to Chrome</a>
            {API ? <span className="ml-2 text-sm text-emerald-300/90">API connected</span> : <span className="ml-2 text-sm text-amber-300/90">Set NEXT_PUBLIC_API_URL to enable scoring</span>}
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 text-white/50 sm:grid-cols-4">
            {[
              ["99.4%","phish detection"],
              ["10,000+","emails cleaned"],
              ["0-click","mute promotions"],
              ["Open-source","privacy-first"],
            ].map(([n,l])=>(
              <div key={l} className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                <div className="text-2xl font-bold text-white">{n}</div>
                <div className="text-xs">{l}</div>
              </div>
            ))}
          </div>
        </header>

        <section id="features" className="relative z-10 mx-auto max-w-6xl px-6 py-8">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["🚫","Spam & Scam Blocking","Heuristics + ML crush the obvious and the sneaky."],
              ["⭐","Priority Inbox","People and threads that matter auto-float to the top."],
              ["🫧","Peace Mode","One switch to silence promos, newsletters & bots."]
            ].map(([icon,title,desc])=>(
              <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <div className="text-2xl">{icon}</div>
                <div className="mt-2 text-lg font-semibold">{title}</div>
                <p className="mt-1 text-sm text-white/70">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="playground" className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <h3 className="text-xl font-semibold">Live spam check</h3>
              <p className="mt-1 text-white/70 text-sm">Paste any email and see score/label/reasons instantly.</p>
              <form onSubmit={score} className="mt-4 grid gap-3">
                <input className="rounded-lg border border-white/10 bg-[#0a1426] px-3 py-2 outline-none focus:border-sky-400/50" placeholder="From" value={from} onChange={e=>setFrom(e.target.value)} />
                <input className="rounded-lg border border-white/10 bg-[#0a1426] px-3 py-2 outline-none focus:border-sky-400/50" placeholder="Subject" value={subject} onChange={e=>setSubject(e.target.value)} />
                <textarea rows={6} className="rounded-lg border border-white/10 bg-[#0a1426] px-3 py-2 outline-none focus:border-sky-400/50" placeholder="Body" value={body} onChange={e=>setBody(e.target.value)} />
                <div className="flex items-center gap-3">
                  <button type="submit" className="rounded-xl bg-gradient-to-tr from-sky-400 to-fuchsia-400 px-5 py-2 font-semibold text-[#081020] hover:brightness-95">Score email</button>
                  <a href="/extension.zip" download className="rounded-xl border border-white/15 bg-white/5 px-5 py-2 font-semibold hover:bg-white/10">⬇️ Download for Chrome</a>
                </div>
                {err && <div className="text-rose-300 text-sm">Error: {err}</div>}
              </form>
            </div>
            <div ref={confetti} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <h3 className="text-xl font-semibold">Result</h3>
              <div className="mt-3 rounded-lg border border-white/10 bg-black/30 p-3 text-sm">
                {out ? <pre className="whitespace-pre-wrap">{JSON.stringify(out, null, 2)}</pre> : <div className="text-white/60">Submit an email on the left to see results here.</div>}
              </div>
            </div>
          </div>
        </section>

        <footer className="relative z-10 border-t border-white/10 bg-white/5 py-6 text-center text-sm text-white/60">
          © {new Date().getFullYear()} SiftMail • <a className="hover:text-white" href="/privacy.html">Privacy</a> · <a className="hover:text-white" href="/terms.html">Terms</a> · <a className="hover:text-white" href="mailto:hello@siftmail.app">Contact</a>
        </footer>
      </div>

      <style jsx>{`
        .mask-grid {
          background-image:
            linear-gradient(#fff 1px, transparent 1px),
            linear-gradient(90deg, #fff 1px, transparent 1px);
          background-size: 40px 40px, 40px 40px;
          filter: invert(1);
          mix-blend-mode: screen;
        }
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 24s linear infinite; }
        @keyframes pulse-slow { 0%,100% { transform: scale(1); opacity:.7; } 50% { transform: scale(1.06); opacity:1; } }
        .animate-pulse-slow { animation: pulse-slow 7s ease-in-out infinite; }
      `}</style>
    </>
  );
}
