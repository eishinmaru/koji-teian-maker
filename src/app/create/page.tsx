"use client";

import { useState } from "react";
import Link from "next/link";

type WorkItem = {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
};

export default function CreatePage() {
  const [projectName, setProjectName] = useState("");
  const [projectDate, setProjectDate] = useState("");
  const [projectLocation, setProjectLocation] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyPerson, setCompanyPerson] = useState("");
  const [companyContact, setCompanyContact] = useState("");
  const [items, setItems] = useState<WorkItem[]>([
    { id: 1, name: "", quantity: 1, unit: "式", unitPrice: 0 },
  ]);
  const [photo, setPhoto] = useState<string | null>(null);

  const addItem = () => {
    const newId = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    setItems([...items, { id: newId, name: "", quantity: 1, unit: "式", unitPrice: 0 }]);
  };

  const removeItem = (id: number) => {
    if (items.length <= 1) return;
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id: number, field: keyof WorkItem, value: string | number) => {
    setItems(items.map((item) => item.id === id ? { ...item, [field]: value } : item));
  };

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const tax = Math.floor(subtotal * 0.1);
  const total = subtotal + tax;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">← 戻る</Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-xl font-bold text-gray-900">新しい提案書を作成</h1>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">プレビュー</button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">PDF出力</button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="space-y-6">

          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>
              基本情報
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">工事名 <span className="text-red-500">*</span></label>
                <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="例：〇〇様邸 外壁塗装工事" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">工事予定日</label>
                <input type="date" value={projectDate} onChange={(e) => setProjectDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">工事場所</label>
                <input type="text" value={projectLocation} onChange={(e) => setProjectLocation(e.target.value)} placeholder="例：兵庫県淡路市〇〇" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>
              お客様情報
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">お客様名 <span className="text-red-500">*</span></label>
                <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="例：山田 太郎" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">お電話番号</label>
                <input type="tel" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="例：090-1234-5678" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">ご住所</label>
                <input type="text" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} placeholder="例：兵庫県淡路市〇〇1-2-3" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>
              工事内容・金額
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 text-sm text-gray-600">
                    <th className="text-left py-2 pr-2 font-medium">項目名</th>
                    <th className="text-right py-2 px-2 font-medium w-20">数量</th>
                    <th className="text-left py-2 px-2 font-medium w-16">単位</th>
                    <th className="text-right py-2 px-2 font-medium w-28">単価</th>
                    <th className="text-right py-2 px-2 font-medium w-28">金額</th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100">
                      <td className="py-2 pr-2">
                        <input type="text" value={item.name} onChange={(e) => updateItem(item.id, "name", e.target.value)} placeholder="例：外壁塗装" className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                      </td>
                      <td className="py-2 px-2">
                        <input type="number" value={item.quantity} onChange={(e) => updateItem(item.id, "quantity", Number(e.target.value))} min="0" className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm text-right focus:outline-none focus:ring-1 focus:ring-blue-500" />
                      </td>
                      <td className="py-2 px-2">
                        <input type="text" value={item.unit} onChange={(e) => updateItem(item.id, "unit", e.target.value)} className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                      </td>
                      <td className="py-2 px-2">
                        <input type="number" value={item.unitPrice} onChange={(e) => updateItem(item.id, "unitPrice", Number(e.target.value))} min="0" className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm text-right focus:outline-none focus:ring-1 focus:ring-blue-500" />
                      </td>
                      <td className="py-2 px-2 text-right text-sm font-medium text-gray-900">
                        ¥{(item.quantity * item.unitPrice).toLocaleString()}
                      </td>
                      <td className="py-2 px-2 text-center">
                        <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 text-lg" title="削除">×</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button onClick={addItem} className="mt-3 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">
              + 項目を追加
            </button>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="space-y-1 max-w-xs ml-auto text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>小計</span>
                  <span>¥{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>消費税（10%）</span>
                  <span>¥{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200 text-lg font-bold text-gray-900">
                  <span>合計</span>
                  <span>¥{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">4</span>
              自社情報
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">会社名・屋号</label>
                <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="例：YTS電工" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">担当者名</label>
                <input type="text" value={companyPerson} onChange={(e) => setCompanyPerson(e.target.value)} placeholder="例：柳 亮佑" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">連絡先</label>
                <input type="text" value={companyContact} onChange={(e) => setCompanyContact(e.target.value)} placeholder="例：090-0000-0000" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">5</span>
              施工写真
              <span className="text-xs font-normal text-gray-500 ml-2">（無料版：1枚まで）</span>
            </h2>
            {photo ? (
              <div className="relative inline-block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo} alt="施工写真" className="max-w-xs rounded-lg border border-gray-200" />
                <button onClick={() => setPhoto(null)} className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white">×</button>
              </div>
            ) : (
              <label className="block border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                <div className="text-gray-500">
                  <div className="text-3xl mb-2">📷</div>
                  <p className="font-medium">クリックして写真を選択</p>
                  <p className="text-xs mt-1">JPG / PNG / HEIC対応</p>
                </div>
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              </label>
            )}
          </section>

          <div className="flex justify-end gap-3 py-6">
            <button className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">プレビュー</button>
            <button className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm">PDF出力</button>
          </div>
        </div>
      </main>
    </div>
  );
}
