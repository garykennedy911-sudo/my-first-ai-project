import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PorscheLogo } from '../components/PorscheLogo';
import { Eye, EyeOff, Globe, Send, ChevronDown, Mail, Phone, Lock, UserCheck } from 'lucide-react';

export const AuthView: React.FC = () => {
  const { login, register, loginAsDemo, t, language, setLanguage, setActiveModal } = useApp();
  const [isSignUp, setIsSignUp] = useState(true); // Default to registration so new users register first!

  // Form fields
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [inviteCode, setInviteCode] = useState('167111');

  // Login single identifier (email or phone)
  const [loginIdentifier, setLoginIdentifier] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (isSignUp) {
      // Validation for Sign Up: Email + Phone + Password + Confirm Password
      if (!email.trim() || !email.includes('@')) {
        setErrorMsg(language === 'ar' ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email address');
        return;
      }
      if (!phone.trim() || phone.length < 6) {
        setErrorMsg(language === 'ar' ? 'يرجى إدخال رقم هاتف صحيح' : 'Please enter a valid phone number');
        return;
      }
      if (!password || password.length < 6) {
        setErrorMsg(language === 'ar' ? 'كلمة المرور يجب أن لا تقل عن 6 أحرف' : 'Password must be at least 6 characters');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg(language === 'ar' ? 'كلمتا المرور غير متطابقتين' : 'Passwords do not match');
        return;
      }

      register(email.trim(), phone.trim(), inviteCode.trim());
    } else {
      // Validation for Sign In
      if (!loginIdentifier.trim()) {
        setErrorMsg(language === 'ar' ? 'يرجى إدخال البريد الإلكتروني أو رقم الهاتف' : 'Please enter email or phone number');
        return;
      }
      if (!password) {
        setErrorMsg(language === 'ar' ? 'يرجى إدخال كلمة المرور' : 'Please enter password');
        return;
      }

      login(loginIdentifier.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#082057] via-[#051740] to-[#020b22] text-white flex flex-col justify-between p-4 relative overflow-hidden font-sans">
      {/* Background ambient radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-blue-600/20 rounded-full blur-[130px] pointer-events-none" />

      {/* Top language selector */}
      <div className="relative flex justify-end z-20 pt-2">
        <button
          onClick={() => setLangOpen(!langOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white shadow-sm transition-all"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>{language === 'ar' ? 'العربية' : 'English'}</span>
          <ChevronDown className="w-3 h-3 text-white/70" />
        </button>

        {langOpen && (
          <div className="absolute right-0 top-10 w-36 bg-slate-900 border border-blue-600/40 rounded-2xl shadow-2xl py-1 z-50 text-xs overflow-hidden">
            <button
              onClick={() => {
                setLanguage('ar');
                setLangOpen(false);
              }}
              className="w-full text-right px-3.5 py-2.5 hover:bg-blue-600/20 text-slate-200 flex items-center justify-between"
            >
              <span>العربية</span>
              {language === 'ar' && <span className="text-blue-400 font-bold">✓</span>}
            </button>
            <button
              onClick={() => {
                setLanguage('en');
                setLangOpen(false);
              }}
              className="w-full text-left px-3.5 py-2.5 hover:bg-blue-600/20 text-slate-200 flex items-center justify-between"
            >
              <span>English</span>
              {language === 'en' && <span className="text-blue-400 font-bold">✓</span>}
            </button>
          </div>
        )}
      </div>

      {/* Center content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-sm mx-auto w-full z-10 py-4">
        {/* Brand Crest */}
        <PorscheLogo size="lg" showText={true} className="mb-2" />

        {/* Title */}
        <h1 className="text-2xl font-black tracking-tight text-white mt-1">
          {t.appName}
        </h1>
        <p className="text-xs text-blue-200/80 mb-5">
          {t.welcome}
        </p>

        {/* Main Glass Form Card */}
        <div className="w-full bg-[#112457]/75 backdrop-blur-xl border border-blue-500/25 rounded-3xl p-5 shadow-2xl relative">
          {/* Floating telegram button on right */}
          <button
            onClick={() => setActiveModal('telegram')}
            className="absolute top-12 -right-3 w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-lg shadow-sky-500/40 hover:scale-105 active:scale-95 transition-all border border-white/20"
            title="Customer Support"
          >
            <Send className="w-4 h-4 -rotate-12 translate-x-[-1px]" />
          </button>

          {/* Segmented Tab Switch: Sign Up vs Sign In */}
          <div className="flex bg-[#0b173a]/80 p-1 rounded-2xl mb-4 border border-blue-900/40 text-xs">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(true);
                setErrorMsg('');
              }}
              className={`flex-1 py-2.5 rounded-xl font-bold transition-all ${
                isSignUp
                  ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {language === 'ar' ? 'إنشاء حساب جديد' : 'Sign Up'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(false);
                setErrorMsg('');
              }}
              className={`flex-1 py-2.5 rounded-xl font-bold transition-all ${
                !isSignUp
                  ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
            </button>
          </div>

          {errorMsg && (
            <div className="mb-4 p-2.5 bg-red-500/20 border border-red-500/40 rounded-xl text-xs text-red-200 text-center animate-shake">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {isSignUp ? (
              <>
                {/* 1. Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-4 py-2.5 bg-[#0d1d45]/90 border border-blue-900/60 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all pl-10"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* 2. Phone Number */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+963 / +971 / +1..."
                      className="w-full px-4 py-2.5 bg-[#0d1d45]/90 border border-blue-900/60 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all pl-10"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* 3. Password */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {language === 'ar' ? 'كلمة السر' : 'Password'}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={language === 'ar' ? 'كلمة السر' : 'Password'}
                      className="w-full px-4 py-2.5 bg-[#0d1d45]/90 border border-blue-900/60 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all pr-10 pl-10"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-slate-400" />}
                    </button>
                  </div>
                </div>

                {/* 4. Confirm Password */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {language === 'ar' ? 'تأكيد كلمة السر' : 'Confirm Password'}
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder={language === 'ar' ? 'إعادة إدخال كلمة السر' : 'Re-enter Password'}
                      className="w-full px-4 py-2.5 bg-[#0d1d45]/90 border border-blue-900/60 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all pr-10 pl-10"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-slate-400" />}
                    </button>
                  </div>
                </div>

                {/* 5. Invitation Code */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {language === 'ar' ? 'رمز الدعوة' : 'Invitation Code'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={inviteCode}
                      onChange={(e) => setInviteCode(e.target.value)}
                      placeholder="167111"
                      className="w-full px-4 py-2.5 bg-[#0d1d45]/90 border border-blue-900/60 rounded-xl text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 pl-10"
                    />
                    <UserCheck className="w-4 h-4 text-sky-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Sign In form fields */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {language === 'ar' ? 'البريد الإلكتروني أو رقم الهاتف' : 'Email or Phone Number'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder="name@example.com / +1..."
                      className="w-full px-4 py-2.5 bg-[#0d1d45]/90 border border-blue-900/60 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 pl-10"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {language === 'ar' ? 'كلمة السر' : 'Password'}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={language === 'ar' ? 'كلمة السر' : 'Password'}
                      className="w-full px-4 py-2.5 bg-[#0d1d45]/90 border border-blue-900/60 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 pr-10 pl-10"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-slate-400" />}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-3 py-3.5 px-4 bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 active:scale-[0.99] transition-all text-sm"
            >
              {isSignUp ? (language === 'ar' ? 'تسجيل حساب جديد' : 'Sign Up') : (language === 'ar' ? 'تسجيل الدخول' : 'Sign In')}
            </button>
          </form>

          {/* Toggle between Sign Up and Sign In */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setErrorMsg('');
              }}
              className="text-xs font-semibold text-blue-300 hover:text-white transition-colors"
            >
              {isSignUp
                ? (language === 'ar' ? 'لديك حساب بالفعل؟ تسجيل الدخول' : 'Already have an account? Sign In')
                : (language === 'ar' ? 'ليس لديك حساب؟ إنشاء حساب جديد' : "Don't have an account? Sign Up")}
            </button>
          </div>
        </div>

        {/* Demo Fast Access */}
        <button
          onClick={loginAsDemo}
          className="mt-4 px-4 py-2 text-xs text-blue-300/80 hover:text-blue-100 border border-blue-500/20 rounded-full hover:bg-blue-900/30 transition-all flex items-center gap-1.5"
        >
          <span>⚡ {language === 'ar' ? 'استكشاف سريع بحساب تجريبي (Demo)' : 'Quick Demo Explore'}</span>
        </button>
      </div>

      {/* Footer copyright */}
      <footer className="text-center text-[10px] text-slate-500 py-2">
        © 2026 BingX Global Asset Platform. All rights reserved.
      </footer>
    </div>
  );
};
