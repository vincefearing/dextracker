"use client";
import { useState, useRef, useEffect } from "react";

// A helper component for the input fields to keep the main component clean.
const FormInput = ({
  icon,
  placeholder,
  type = "text",
}: {
  icon: React.ReactNode;
  placeholder: string;
  type?: string;
}) => (
  <div className="relative flex items-center w-full group">
    <span className="absolute left-4 text-brand-grey group-focus-within:text-brand-light transition-colors duration-200">
      {icon}
    </span>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full bg-brand-black text-brand-grey border border-brand-dark rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-blue-hl focus:text-brand-light focus:placeholder-brand-light transition-colors duration-200"
    />
  </div>
);

export default function AuthForm() {
  const [mode, setMode] = useState("login");
  
  const loginTabRef = useRef<HTMLButtonElement>(null);
  const registerTabRef = useRef<HTMLButtonElement>(null);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    // Set initial position for the underline
    if (loginTabRef.current) {
        setUnderlineStyle({
            left: loginTabRef.current.offsetLeft,
            width: loginTabRef.current.offsetWidth,
        });
    }
  }, []);

  useEffect(() => {
    if (mode === 'register' && registerTabRef.current) {
      setUnderlineStyle({
        left: registerTabRef.current.offsetLeft,
        width: registerTabRef.current.offsetWidth,
      });
    } else if (mode === 'login' && loginTabRef.current) {
      setUnderlineStyle({
        left: loginTabRef.current.offsetLeft,
        width: loginTabRef.current.offsetWidth,
      });
    }
  }, [mode]);

  return (
    <div className="w-full max-w-sm flex flex-col items-center gap-12 text-brand-grey">
      <div className="relative flex items-center gap-8 text-xl font-medium">
        <button
          ref={loginTabRef}
          onClick={() => setMode("login")}
          className={`transition-colors cursor-pointer ${mode === 'login' ? 'text-brand-light' : 'text-brand-grey hover:text-brand-light'}`}
        >
          login
        </button>
        <button
          ref={registerTabRef}
          onClick={() => setMode("register")}
          className={`transition-colors cursor-pointer ${mode === 'register' ? 'text-brand-light' : 'text-brand-grey hover:text-brand-light'}`}
        >
          register
        </button>
        <div
          className="absolute -bottom-2 h-1 bg-brand-red rounded-full transition-all duration-300 ease-in-out"
          style={underlineStyle}
        ></div>
      </div>

      <form className="w-full flex flex-col items-center gap-4">
        {/* Wrapper for the animated username field */}
        <div className={`w-full transition-all duration-500 ease-in-out ${mode === 'register' ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
            <FormInput
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              }
              placeholder="Username"
              type="text"
            />
        </div>
        <FormInput
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
          }
          placeholder="Email"
          type="email"
        />
        <FormInput
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
          }
          placeholder="Password"
          type="password"
        />
        <button
          type="submit"
          className="relative w-1/2 h-12 bg-brand-red text-brand-light font-bold rounded-full py-3 mt-4 shadow-[0_6px_0_rgb(159,28,46)] hover:shadow-[0_4px_0_rgb(159,28,46)] hover:translate-y-0.5 active:shadow-none active:translate-y-1 transition-all duration-150 cursor-pointer"
        >
          <span className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${mode === 'register' ? 'opacity-100' : 'opacity-0'}`}>
            Sign Up
          </span>
          <span className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${mode === 'login' ? 'opacity-100' : 'opacity-0'}`}>
            Log In
          </span>
        </button>
      </form>

      {/* Divider */}
      <div className="w-full flex items-center gap-4">
        <div className="flex-grow border-b border-brand-grey"></div>
        <span className="text-brand-grey text-sm">or continue with</span>
        <div className="flex-grow border-b border-brand-grey"></div>
      </div>

      {/* Google Sign-in Button */}
      <button className="w-full flex items-center justify-center gap-2 bg-brand-black text-brand-grey border border-brand-dark rounded-full py-3 hover:text-brand-grey-hl hover:bg-brand-black-hl  transition-colors group cursor-pointer">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="filter brightness-100 group-hover:brightness-150 transition-all duration-200"
        >
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          <path d="M1 1h22v22H1z" fill="none" />
        </svg>
        <span>Google</span>
      </button>
    </div>
  );
}
