import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <header className="w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">工</div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">簡単工事提案書メーカー</h1>
              <p className="text-xs text-gray-500">YTS Apps</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-6 text-sm text-gray-600">
            <a href="#features" className="hover:text-blue-600">機能</a>
            <a href="#pricing" className="hover:text-blue-600">料金</a>
            <a href="#contact" className="hover:text-blue-600">お問い合わせ</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
          ✨ 職人さんのための提案書作成ツール
        </div>

        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          見積の次の一手を、<br />
          <span className="text-blue-600">3分で。</span>
        </h2>

        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          工事内容・金額・写真を入れるだけ。<br />
          お客様に渡せる提案書が、その場で完成します。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/create" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all text-lg">
            無料ではじめる →
          </Link>
          <button className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-full border-2 border-gray-300 transition-all text-lg">
            サンプルを見る
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          登録不要・クレジットカード不要ですぐに使えます
        </p>
      </main>

      <section id="features" className="max-w-6xl mx-auto px-6 py-20">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
          こんな悩みを解決します
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl mb-4">📝</div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">かんたん入力</h4>
            <p className="text-gray-600 leading-relaxed">工事内容と金額を入力するだけ。面倒な設定はいりません。</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl mb-4">📸</div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">写真で伝わる</h4>
            <p className="text-gray-600 leading-relaxed">施工写真を添付して、お客様に具体的なイメージを提示できます。</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl mb-4">📄</div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">PDFで即出力</h4>
            <p className="text-gray-600 leading-relaxed">完成した提案書は、その場でPDFとして保存・印刷できます。</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200 bg-white mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-sm text-gray-500">
          <p className="mb-2">
            <strong className="text-gray-700">YTS Apps - 簡単工事提案書メーカー</strong>
          </p>
          <p>運営: YTS Products © 2026</p>
        </div>
      </footer>
    </div>
  );
}
