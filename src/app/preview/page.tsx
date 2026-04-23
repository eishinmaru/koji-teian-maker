"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    const saved = localStorage.getItem("proposalData");
    if (saved) setData(JSON.parse(saved));
    const now = new Date();
    setToday(`${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`);
  }, []);

  const handlePrint = () => window.print();

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
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/create" className="text-gray-600 hover:text-blue-600 font-medium">← 編集に戻る</Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-xl font-bold text-gray-900">プレビュー</h1>
          </div>
          <button onClick={handlePrint} className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm">
            🖨 印刷 / PDF出力
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 print:p-0 print:max-w-none">
        <div className="bg-white shadow-lg print:shadow-none p-12 print:p-8 relative">
          <div className="absolute top-4 right-4 text-gray-300 text-xs print:text-gray-400">YTS Apps 製</div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 border-b-4 border-blue-600 inline-block pb-2 px-8">
              工 事 ご 提 案 書
            </h1>
            <p className="text-sm text-gray-600 mt-4">発行日：{today}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-lg font-bold text-gray-900 mb-2">
                {data.customerName || "お客様名"} <span className="text-base font-normal">様</span>
              </p>
              {data.customerAddress && <p className="text-sm text-gray-700">{data.customerAddress}</p>}
              {data.customerPhone && <p className="text-sm text-gray-700">TEL: {data.customerPhone}</p>}
            </div>
            <div className="text-right">
              {data.companyName && <p className="text-base font-bold text-gray-900">{data.companyName}</p>}
              {data.companyPerson && <p className="text-sm text-gray-700">担当：{data.companyPerson}</p>}
              {data.companyContact && <p className="text-sm text-gray-700">TEL: {data.companyContact}</p>}
            </div>
          </div>

          <div className="mb-8 text-sm text-gray-800 leading-relaxed">
            <p>拝啓 平素より格別のご高配を賜り、誠にありがとうございます。</p>
            <p className="mt-2">この度は、下記工事につきましてご提案させていただきます。ご検討のほど、何卒よろしくお願い申し上げます。</p>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 border-l-4 border-blue-600 pl-3 mb-4">工事概要</h2>
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 pr-4 w-32 font-medium text-gray-700 bg-gray-50 px-3">工事名</td>
                  <td className="py-2 px-3 text-gray-900">{data.projectName || "（未入力）"}</td>
                </tr>
                {data.projectLocation && (
                  <tr className="border-b border-gray-200">
                    <td className="py-2 pr-4 font-medium text-gray-700 bg-gray-50 px-3">工事場所</td>
                    <td className="py-2 px-3 text-gray-900">{data.projectLocation}</td>
                  </tr>
                )}
                {data.projectDate && (
                  <tr className="border-b border-gray-200">
                    <td className="py-2 pr-4 font-medium text-gray-700 bg-gray-50 px-3">工事予定日</td>
                    <td className="py-2 px-3 text-gray-900">{data.projectDate}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 border-l-4 border-blue-600 pl-3 mb-4">工事内容</h2>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-blue-50 border-b-2 border-blue-600">
                  <th className="py-2 px-3 text-left font-medium text-gray-700">項目名</th>
                  <th className="py-2 px-3 text-right font-medium text-gray-700 w-20">数量</th>
                  <th className="py-2 px-3 text-center font-medium text-gray-700 w-16">単位</th>
                  <th className="py-2 px-3 text-right font-medium text-gray-700 w-28">単価</th>
                  <th className="py-2 px-3 text-right font-medium text-gray-700 w-28">金額</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200">
                    <td className="py-2 px-3 text-gray-900">{item.name || "—"}</td>
                    <td className="py-2 px-3 text-right text-gray-900">{item.quantity}</td>
                    <td className="py-2 px-3 text-center text-gray-900">{item.unit}</td>
                    <td className="py-2 px-3 text-right text-gray-900">¥{item.unitPrice.toLocaleString()}</td>
                    <td className="py-2 px-3 text-right text-gray-900 font-medium">¥{(item.quantity * item.unitPrice).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mb-8 flex justify-end">
            <div className="w-80 bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex justify-between text-sm text-gray-700 mb-1">
                <span>小計</span>
                <span>¥{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700 mb-2">
                <span>消費税（10%）</span>
                <span>¥{tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-2 border-t-2 border-gray-400 text-xl font-bold text-gray-900">
                <span>合計金額</span>
                <span className="text-blue-600">¥{total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {data.photo && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-blue-600 pl-3 mb-4">参考写真</h2>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.photo} alt="施工写真" className="max-w-md mx-auto rounded-lg border border-gray-200" />
            </div>
          )}

          <div className="mt-12 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
            <p>ご不明な点がございましたら、お気軽にお問い合わせください。</p>
            <p className="mt-2">敬具</p>
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
