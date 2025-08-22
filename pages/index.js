import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>SiftMail — Take Back Control of Your Inbox</title>
        <meta
          name="description"
          content="SiftMail filters out spam, scams, and distractions — leaving only the emails that matter."
        />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      <div className="bg-white text-gray-800 font-sans">
        {/* Header */}
        <header className="w-full border-b border-gray-100">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
            <a href="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="SiftMail Logo" className="w-9 h-9" />
              <span className="font-semibold text-lg">SiftMail</span>
            </a>
          </div>
        </header>

        {/* Hero */}
        <section className="text-center py-20 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Take back control of your inbox.
            </h1>
            <p className="text-lg mb-8 text-gray-600">
              SiftMail filters out spam, scams, and distractions — leaving only
              the emails that matter.
            </p>
            <a
              href="#signup"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg"
            >
              Get Early Access
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
