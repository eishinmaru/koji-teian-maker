"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type WorkItem = {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
};

type ProposalData = {
  projectName: string;
  projectDate: string;
  projectLocation: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  companyName: string;
  companyPerson: string;
  companyContact: string;
  items: WorkItem[];
  photo: string | null;
};

export default function PreviewPage() {
  const [data, setData] = useState<ProposalData | null>(null);
  const [today, setToday] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const proposalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("proposalData");
    if (saved) setData(JSON.parse(saved));
    const now = new Date();
    setToday(`${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`);
  }, []);

  const handlePrint = () => window.print();

  const handleDownloadPDF = async () => {
    if (!proposalRef.current) return;
    setIsGenerating(true);
    try {
      const html2canvas = (await import("html2canvas-pro")).default;
      const jsPDF = (await import("jspdf")).default;

      const element = proposalRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      const fileName = `提案書_${data?.customerName || "お客様"}_${new Date().getTime()}.pdf`;
      pdf.save(fileName);
    } catch (err) {
      console.error("PDF生成エラー:", err);
      alert("PDF生成中にエラーが発生しました。コンソール(F12)でエラー内容を確認してください。");
    } finally {
      setIsGenerating(false);
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 mb-4">提案書データがありません</p>
          <Link href="/create" className="text-blue-600 hover:underline">← 作成ページに戻る</Link>
        </div>
      </div>
    );
  }

  const subtotal = data.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const tax = Math.floor(subtotal * 0.1);
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 print:hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/create" className="text-gray-600 hover:text-blue-600 font-medium text-sm sm:text-base">← 編集</Link>
            <div className="h-6 w-px bg-gray-300 hidden sm:block"></div>
            <h1 className="text-base sm:text-xl font-bold text-gray-900">プレビュー</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={handlePrint} className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              🖨 印刷
            </button>
            <button onClick={handleDownloadPDF} disabled={isGenerating} className="px-3 sm:px-6 py-2 text-xs sm:text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed">
              {isGenerating ? "生成中..." : "📄 PDFダウンロード"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-2 sm:px-6 py-4 sm:py-8 print:p-0 print:max-w-none">
        <div ref={proposalRef} className="bg-white shadow-lg print:shadow-none p-6 sm:p-12 print:p-8 relative" style={{ color: "#111827" }}>
          <div className="absolute top-4 right-4 flex items-center gap-1 opacity-60">
            <span className="text-xs" style={{ color: "#9ca3af" }}>Powered by</span>
            <span className="text-xs font-bold" style={{ color: "#3b82f6" }}>YTS Apps</span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <div className="text-8xl font-bold transform -rotate-45 select-none whitespace-nowrap" style={{ color: "#f3f4f6" }}>
              YTS Apps
            </div>
          </div>

          <div className="relative">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold inline-block pb-2 px-4 sm:px-8" style={{ color: "#111827", borderBottom: "4px solid #2563eb" }}>
                工 事 ご 提 案 書
              </h1>
              <p className="text-xs sm:text-sm mt-3 sm:mt-4" style={{ color: "#4b5563" }}>発行日：{today}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-8">
              <div>
                <p className="text-base sm:text-lg font-bold mb-2" style={{ color: "#111827" }}>
                  {data.customerName || "お客様名"} <span className="text-sm sm:text-base font-normal">様</span>
                </p>
                {data.customerAddress && <p className="text-xs sm:text-sm" style={{ color: "#374151" }}>{data.customerAddress}</p>}
                {data.customerPhone && <p className="text-xs sm:text-sm" style={{ color: "#374151" }}>TEL: {data.customerPhone}</p>}
              </div>
              <div className="sm:text-right">
                {data.companyName && <p className="text-sm sm:text-base font-bold" style={{ color: "#111827" }}>{data.companyName}</p>}
                {data.companyPerson && <p className="text-xs sm:text-sm" style={{ color: "#374151" }}>担当：{data.companyPerson}</p>}
                {data.companyContact && <p className="text-xs sm:text-sm" style={{ color: "#374151" }}>TEL: {data.companyContact}</p>}
              </div>
            </div>

            <div className="mb-6 sm:mb-8 text-xs sm:text-sm leading-relaxed" style={{ color: "#1f2937" }}>
              <p>拝啓 平素より格別のご高配を賜り、誠にありがとうございます。</p>
              <p className="mt-2">この度は、下記工事につきましてご提案させていただきます。ご検討のほど、何卒よろしくお願い申し上げます。</p>
            </div>

            <div className="mb-6 sm:mb-8">
              <h2 className="text-base sm:text-lg font-bold pl-3 mb-3 sm:mb-4" style={{ color: "#111827", borderLeft: "4px solid #2563eb" }}>工事概要</h2>
              <table className="w-full text-xs sm:text-sm">
                <tbody>
                  <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td className="py-2 pr-2 sm:pr-4 w-24 sm:w-32 font-medium px-2 sm:px-3" style={{ color: "#374151", backgroundColor: "#f9fafb" }}>工事名</td>
                    <td className="py-2 px-2 sm:px-3" style={{ color: "#111827" }}>{data.projectName || "（未入力）"}</td>
                  </tr>
                  {data.projectLocation && (
                    <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                      <td className="py-2 pr-2 sm:pr-4 font-medium px-2 sm:px-3" style={{ color: "#374151", backgroundColor: "#f9fafb" }}>工事場所</td>
                      <td className="py-2 px-2 sm:px-3" style={{ color: "#111827" }}>{data.projectLocation}</td>
                    </tr>
                  )}
                  {data.projectDate && (
                    <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                      <td className="py-2 pr-2 sm:pr-4 font-medium px-2 sm:px-3" style={{ color: "#374151", backgroundColor: "#f9fafb" }}>工事予定日</td>
                      <td className="py-2 px-2 sm:px-3" style={{ color: "#111827" }}>{data.projectDate}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mb-6 sm:mb-8">
              <h2 className="text-base sm:text-lg font-bold pl-3 mb-3 sm:mb-4" style={{ color: "#111827", borderLeft: "4px solid #2563eb" }}>工事内容</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr style={{ backgroundColor: "#eff6ff", borderBottom: "2px solid #2563eb" }}>
                      <th className="py-2 px-2 sm:px-3 text-left font-medium" style={{ color: "#374151" }}>項目名</th>
                      <th className="py-2 px-2 sm:px-3 text-right font-medium w-16 sm:w-20" style={{ color: "#374151" }}>数量</th>
                      <th className="py-2 px-2 sm:px-3 text-center font-medium w-12 sm:w-16" style={{ color: "#374151" }}>単位</th>
                      <th className="py-2 px-2 sm:px-3 text-right font-medium w-20 sm:w-28" style={{ color: "#374151" }}>単価</th>
                      <th className="py-2 px-2 sm:px-3 text-right font-medium w-20 sm:w-28" style={{ color: "#374151" }}>金額</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.items.map((item) => (
                      <tr key={item.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                        <td className="py-2 px-2 sm:px-3" style={{ color: "#111827" }}>{item.name || "—"}</td>
                        <td className="py-2 px-2 sm:px-3 text-right" style={{ color: "#111827" }}>{item.quantity}</td>
                        <td className="py-2 px-2 sm:px-3 text-center" style={{ color: "#111827" }}>{item.unit}</td>
                        <td className="py-2 px-2 sm:px-3 text-right" style={{ color: "#111827" }}>¥{item.unitPrice.toLocaleString()}</td>
                        <td className="py-2 px-2 sm:px-3 text-right font-medium" style={{ color: "#111827" }}>¥{(item.quantity * item.unitPrice).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mb-6 sm:mb-8 flex justify-end">
              <div className="w-full sm:w-80 rounded-lg p-3 sm:p-4" style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}>
                <div className="flex justify-between text-xs sm:text-sm mb-1" style={{ color: "#374151" }}>
                  <span>小計</span>
                  <span>¥{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm mb-2" style={{ color: "#374151" }}>
                  <span>消費税（10%）</span>
                  <span>¥{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 text-lg sm:text-xl font-bold" style={{ color: "#111827", borderTop: "2px solid #9ca3af" }}>
                  <span>合計金額</span>
                  <span style={{ color: "#2563eb" }}>¥{total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {data.photo && (
              <div className="mb-6 sm:mb-8">
                <h2 className="text-base sm:text-lg font-bold pl-3 mb-3 sm:mb-4" style={{ color: "#111827", borderLeft: "4px solid #2563eb" }}>参考写真</h2>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={data.photo} alt="施工写真" className="max-w-full sm:max-w-md mx-auto rounded-lg" style={{ border: "1px solid #e5e7eb" }} />
              </div>
            )}

            <div className="mt-8 sm:mt-12 pt-4 sm:pt-6 text-center text-xs" style={{ color: "#6b7280", borderTop: "1px solid #e5e7eb" }}>
              <p>ご不明な点がございましたら、お気軽にお問い合わせください。</p>
              <p className="mt-2">敬具</p>
              <p className="mt-4" style={{ color: "#9ca3af" }}>この提案書は YTS Apps - 簡単工事提案書メーカーで作成されました</p>
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 10mm; }
          body { background: white; }
        }
      `}</style>
    </div>
  );
}
