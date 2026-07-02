import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { School, User, IdCard, MapPin, Phone, Mail, QrCode, ArrowLeft, CheckCircle2, ChevronRight, GraduationCap, Coins } from 'lucide-react';
import { removeVietnameseTones } from './utils/string';
import { BANK_CONFIG } from './config';
import { cn } from './lib/utils';

type EnrollmentData = {
  studentName: string;
  studentCccd: string;
  studentId: string;
  address: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
};

interface FeeItem {
  id: string;
  name: string;
  amount: number;
  required?: boolean;
}

const FEES: FeeItem[] = [
  { id: 'phi_ho_so', name: 'Phí hồ sơ', amount: 350000, required: true },
  { id: 'dong_phuc', name: 'Đồng phục', amount: 2000000 },
  { id: 'co_so_vat_chat', name: 'Cơ sở vật chất', amount: 3000000 },
  { id: 'le_phi_nhap_hoc', name: 'Lệ phí nhập học', amount: 500000 },
];

export default function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<EnrollmentData>({
    studentName: '',
    studentCccd: '',
    studentId: '',
    address: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
  });

  const [selectedFees, setSelectedFees] = useState<string[]>(['phi_ho_so']);
  const [qrUrl, setQrUrl] = useState('');
  const [transferContent, setTransferContent] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleFee = (feeId: string) => {
    const fee = FEES.find(f => f.id === feeId);
    if (fee?.required) return;
    setSelectedFees((prev) => 
      prev.includes(feeId) ? prev.filter(id => id !== feeId) : [...prev, feeId]
    );
  };

  const totalAmount = FEES.reduce((sum, fee) => {
    if (selectedFees.includes(fee.id)) {
      return sum + fee.amount;
    }
    return sum;
  }, 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const cleanName = removeVietnameseTones(formData.studentName).toUpperCase();
    const cleanId = formData.studentId.trim();
    const content = `K29THT ${cleanId} ${cleanName}`.replace(/\s+/g, ' ');
    
    setTransferContent(content);

    const url = `https://img.vietqr.io/image/${BANK_CONFIG.BANK_ID}-${BANK_CONFIG.ACCOUNT_NO}-compact2.png?amount=${totalAmount}&addInfo=${encodeURIComponent(content)}&accountName=${encodeURIComponent(BANK_CONFIG.ACCOUNT_NAME)}`;
    setQrUrl(url);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      {/* Top Contact Bar */}
      <div className="bg-[#1e3a5f] text-white/80 py-2 text-xs sm:text-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> 086 572 1519</span>
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> c3tohienthanh@hanoiedu.vn</span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <a href="https://c3tohienthanh.edu.vn/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Trang chủ</a>
            <a href="#" className="hover:text-white transition-colors">Tuyển sinh</a>
            <a href="#" className="hover:text-white transition-colors">Liên hệ</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="w-14 h-16 sm:w-16 sm:h-20 overflow-hidden shrink-0 bg-white flex items-center justify-center">
              <img 
                src="https://res.cloudinary.com/dbfngei2f/image/upload/v1782995774/logo_tht_tf6h9r.jpg" 
                alt="Logo Trường THPT Tô Hiến Thành" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-[#c1272d] font-bold text-sm tracking-wider uppercase mb-1">Sở Giáo Dục và Đào Tạo Hà Nội</h2>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#1e3a5f] uppercase tracking-tight">
                Trường THPT Tô Hiến Thành
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center py-8 sm:py-12 px-4 relative">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-[#1e3a5f]/5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1e3a5f 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="w-full max-w-3xl relative z-0">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#1e3a5f] text-sm font-medium mb-4">
              <GraduationCap className="w-4 h-4" /> Khóa 29 (K29)
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1e3a5f] mb-3">
              Đăng Ký Nhập Học
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
              Vui lòng điền đầy đủ và chính xác thông tin học sinh để hệ thống ghi nhận hồ sơ và khởi tạo mã thanh toán học phí.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl shadow-[#1e3a5f]/5 border border-slate-200/60 overflow-hidden">
            {/* Form Progress Header */}
            <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center justify-between text-sm font-medium">
              <div className={cn("flex items-center gap-2", !isSubmitted ? "text-[#1e3a5f]" : "text-slate-400")}>
                <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs", !isSubmitted ? "bg-[#1e3a5f] text-white" : "bg-slate-200")}>1</div>
                Điền thông tin
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
              <div className={cn("flex items-center gap-2", isSubmitted ? "text-[#1e3a5f]" : "text-slate-400")}>
                <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs", isSubmitted ? "bg-[#1e3a5f] text-white" : "bg-slate-200")}>2</div>
                Thanh toán
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="p-6 sm:p-10 space-y-8"
                >
                  <div className="space-y-5">
                    <h3 className="text-lg font-serif font-bold text-[#1e3a5f] flex items-center gap-2 border-b-2 border-slate-100 pb-2">
                      <User className="w-5 h-5 text-[#c1272d]" />
                      Thông Tin Học Sinh
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-5">
                      <div>
                        <label htmlFor="studentName" className="block text-sm font-semibold text-slate-700 mb-1.5">
                          Họ và tên học sinh <span className="text-[#c1272d]">*</span>
                        </label>
                        <input
                          type="text"
                          id="studentName"
                          name="studentName"
                          required
                          value={formData.studentName}
                          onChange={handleInputChange}
                          placeholder="VD: Nguyễn Văn A"
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/20 outline-none transition-all"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="studentId" className="block text-sm font-semibold text-slate-700 mb-1.5">
                            Mã định danh <span className="text-[#c1272d]">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id="studentId"
                              name="studentId"
                              required
                              value={formData.studentId}
                              onChange={handleInputChange}
                              placeholder="VD: 01030099"
                              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/20 outline-none transition-all pl-10"
                            />
                            <IdCard className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="studentCccd" className="block text-sm font-semibold text-slate-700 mb-1.5">
                            Số CCCD học sinh <span className="text-[#c1272d]">*</span>
                          </label>
                          <input
                            type="text"
                            id="studentCccd"
                            name="studentCccd"
                            required
                            value={formData.studentCccd}
                            onChange={handleInputChange}
                            placeholder="VD: 0013..."
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/20 outline-none transition-all"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="address" className="block text-sm font-semibold text-slate-700 mb-1.5">
                          Địa chỉ thường trú <span className="text-[#c1272d]">*</span>
                        </label>
                        <div className="relative">
                          <textarea
                            id="address"
                            name="address"
                            required
                            rows={2}
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Nhập địa chỉ đầy đủ..."
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/20 outline-none transition-all pl-10 resize-none"
                          />
                          <MapPin className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <h3 className="text-lg font-serif font-bold text-[#1e3a5f] flex items-center gap-2 border-b-2 border-slate-100 pb-2">
                      <User className="w-5 h-5 text-[#c1272d]" />
                      Thông Tin Phụ Huynh
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-5">
                      <div>
                        <label htmlFor="parentName" className="block text-sm font-semibold text-slate-700 mb-1.5">
                          Họ và tên cha/mẹ <span className="text-[#c1272d]">*</span>
                        </label>
                        <input
                          type="text"
                          id="parentName"
                          name="parentName"
                          required
                          value={formData.parentName}
                          onChange={handleInputChange}
                          placeholder="VD: Nguyễn Văn B"
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/20 outline-none transition-all"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="parentPhone" className="block text-sm font-semibold text-slate-700 mb-1.5">
                            Số điện thoại <span className="text-[#c1272d]">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="tel"
                              id="parentPhone"
                              name="parentPhone"
                              required
                              value={formData.parentPhone}
                              onChange={handleInputChange}
                              placeholder="VD: 0912778899"
                              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/20 outline-none transition-all pl-10"
                            />
                            <Phone className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="parentEmail" className="block text-sm font-semibold text-slate-700 mb-1.5">
                            Email liên lạc
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              id="parentEmail"
                              name="parentEmail"
                              value={formData.parentEmail}
                              onChange={handleInputChange}
                              placeholder="email@example.com"
                              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/20 outline-none transition-all pl-10"
                            />
                            <Mail className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Các Khoản Thu & Lệ Phí Section */}
                  <div className="space-y-5">
                    <h3 className="text-lg font-serif font-bold text-[#1e3a5f] flex items-center gap-2 border-b-2 border-slate-100 pb-2">
                      <Coins className="w-5 h-5 text-[#c1272d]" />
                      Các Khoản Thu & Lệ Phí
                    </h3>
                    
                    <div className="space-y-3 bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200">
                      {FEES.map((fee) => {
                        const isSelected = selectedFees.includes(fee.id);
                        return (
                          <div 
                            key={fee.id}
                            onClick={() => toggleFee(fee.id)}
                            className={cn(
                              "flex items-center justify-between p-3.5 rounded-lg border transition-all cursor-pointer select-none",
                              isSelected 
                                ? "bg-white border-[#1e3a5f]/30 shadow-sm" 
                                : "bg-white/60 border-slate-200 hover:border-slate-300 hover:bg-white"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                disabled={fee.required}
                                onChange={() => {}} // handled by parent onClick
                                className={cn(
                                  "w-4 h-4 rounded text-[#1e3a5f] focus:ring-[#1e3a5f]/20 cursor-pointer accent-[#1e3a5f]",
                                  fee.required && "opacity-60 cursor-not-allowed"
                                )}
                              />
                              <div>
                                <span className={cn("text-sm font-semibold", isSelected ? "text-slate-800" : "text-slate-500")}>
                                  {fee.name}
                                </span>
                                {fee.required && (
                                  <span className="ml-2 text-xs bg-red-50 text-[#c1272d] px-1.5 py-0.5 rounded font-medium">Mặc định</span>
                                )}
                              </div>
                            </div>
                            <span className={cn("text-sm font-bold font-mono", isSelected ? "text-[#1e3a5f]" : "text-slate-400")}>
                              {formatCurrency(fee.amount)}
                            </span>
                          </div>
                        );
                      })}
                      
                      <div className="border-t border-slate-200 pt-3.5 mt-4 flex justify-between items-center px-1">
                        <span className="text-sm font-bold text-slate-700">Tổng cộng:</span>
                        <span className="text-lg font-bold text-[#c1272d] font-mono">{formatCurrency(totalAmount)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-[#1e3a5f] hover:bg-[#152a45] text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                    >
                      Đăng ký
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 sm:p-10 flex flex-col items-center"
                >
                  <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm border border-green-100">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  
                  <h2 className="text-2xl font-serif font-bold text-[#1e3a5f] mb-3 text-center">Xác Nhận Hồ Sơ</h2>
                  <p className="text-slate-600 text-center mb-8 max-w-md">
                    Hồ sơ học sinh <strong className="text-[#1e3a5f]">{formData.studentName}</strong> đã được ghi nhận. Phụ huynh vui lòng quét mã QR dưới đây để hoàn tất thanh toán.
                  </p>

                  <div className="bg-[#1e3a5f]/5 p-6 sm:p-8 rounded-2xl border border-[#1e3a5f]/10 mb-8 w-full max-w-md flex flex-col items-center shadow-inner">
                    <div className="bg-white p-4 rounded-xl shadow-md mb-6 w-full max-w-[280px]">
                      <img 
                        src={qrUrl} 
                        alt="QR Code Chuyển Khoản" 
                        className="w-full h-auto rounded-lg"
                        loading="lazy"
                      />
                    </div>
                    
                    <div className="w-full bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                      <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
                        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider text-center">Thông tin chuyển khoản</p>
                      </div>
                      <div className="p-4 space-y-3 text-sm">
                        <div className="flex justify-between items-start gap-4">
                          <span className="text-slate-500 whitespace-nowrap">Ngân hàng:</span>
                          <span className="font-semibold text-right text-slate-800">{BANK_CONFIG.BANK_ID}</span>
                        </div>
                        <div className="flex justify-between items-start gap-4">
                          <span className="text-slate-500 whitespace-nowrap">Số tài khoản:</span>
                          <span className="font-semibold text-right text-slate-800">{BANK_CONFIG.ACCOUNT_NO}</span>
                        </div>
                        <div className="flex justify-between items-start gap-4">
                          <span className="text-slate-500 whitespace-nowrap">Chủ tài khoản:</span>
                          <span className="font-semibold text-right text-slate-800">{BANK_CONFIG.ACCOUNT_NAME}</span>
                        </div>
                        
                        {/* Selected Fees breakdown */}
                        <div className="border-t border-b border-slate-100 py-2.5 my-1 space-y-1.5">
                          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Các khoản thu đã chọn</p>
                          {FEES.filter(fee => selectedFees.includes(fee.id)).map(fee => (
                            <div key={fee.id} className="flex justify-between items-center text-xs">
                              <span className="text-slate-600">{fee.name}</span>
                              <span className="font-semibold text-slate-800 font-mono">{formatCurrency(fee.amount)}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between items-start gap-4 pt-1">
                          <span className="text-slate-500 whitespace-nowrap font-semibold">Tổng số tiền:</span>
                          <span className="font-bold text-right text-[#c1272d] text-base font-mono">{formatCurrency(totalAmount)}</span>
                        </div>

                        <div className="flex justify-between items-start gap-4 border-t border-slate-100 pt-3 mt-1">
                          <span className="text-slate-500 whitespace-nowrap">Nội dung:</span>
                          <span className="font-mono font-bold text-blue-700 text-right bg-blue-50 px-2 py-0.5 rounded break-all">{transferContent}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full max-w-md space-y-4">
                    <div className="bg-red-50 border-l-4 border-[#c1272d] text-red-800 text-sm p-4 rounded-r-xl">
                      <p className="font-semibold mb-1 flex items-center gap-1">Lưu ý quan trọng:</p>
                      <ul className="list-disc list-inside space-y-1 ml-1">
                        <li>Kiểm tra chính xác <strong className="font-semibold">Nội dung chuyển khoản</strong>.</li>
                        <li>Vui lòng chụp lại màn hình giao dịch thành công.</li>
                      </ul>
                    </div>

                    <button
                      onClick={handleReset}
                      className="w-full bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 font-medium py-3.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Quay lại sửa thông tin
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1e3a5f] text-white/80 py-8 text-sm mt-auto border-t-4 border-[#c1272d]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-16 bg-white overflow-hidden shrink-0 flex items-center justify-center p-1.5 rounded shadow-sm">
                <img 
                  src="https://res.cloudinary.com/dbfngei2f/image/upload/v1782995774/logo_tht_tf6h9r.jpg" 
                  alt="Logo Trường THPT Tô Hiến Thành" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h4 className="text-white font-serif font-bold text-lg sm:text-xl uppercase tracking-wider leading-tight">
                  Trường THPT <br /> Tô Hiến Thành
                </h4>
              </div>
            </div>

            <div className="border-l-4 border-amber-400 pl-4 py-1 mb-6">
              <p className="text-white/95 font-serif font-medium italic tracking-wide text-sm sm:text-base">
                "KỶ LUẬT - CHĂM CHỈ - THÀNH CÔNG"
              </p>
            </div>

            <p className="mb-2 font-semibold text-white/95">Văn phòng Tuyển sinh</p>
            <p className="mb-2 flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#c1272d]" /> 42A Lương Ngọc Quyến, phường Thanh Liệt, Thành phố Hà Nội</p>
          </div>
          <div className="md:text-right flex flex-col md:items-end justify-end pb-1">
            <p className="mb-2 flex items-center gap-2 md:justify-end"><Phone className="w-4 h-4 text-[#c1272d]" /> ĐT: 086 572 1519</p>
            <p className="mb-2 flex items-center gap-2 md:justify-end"><Mail className="w-4 h-4 text-[#c1272d]" /> Email: c3tohienthanh@hanoiedu.vn</p>
            <p className="flex items-center gap-2 md:justify-end"><School className="w-4 h-4 text-[#c1272d]" /> Mã trường: 01030099</p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 pt-6 border-t border-white/10 text-center text-xs text-white/50">
          © {new Date().getFullYear()} Trường THPT Tô Hiến Thành - Sở GD & ĐT Hà Nội. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
