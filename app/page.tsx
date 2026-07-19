import Image from "next/image";
import Link from "next/link";
import { SignInButton, SignUpButton, Show, UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 font-sans text-slate-50 selection:bg-indigo-500/30">
      <header className="flex items-center justify-between px-8 py-6 border-b border-white/10 backdrop-blur-md bg-black/20 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-500/20">
            C
          </div>
          <span className="font-semibold text-xl tracking-tight">Clerk Auth</span>
        </div>
        <div className="flex items-center gap-4">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="text-sm font-medium px-4 py-2 rounded-full bg-white text-black hover:bg-slate-200 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                Sign Up
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton appearance={{ elements: { avatarBox: "w-10 h-10 shadow-lg shadow-indigo-500/20 ring-2 ring-white/10" } }} />
          </Show>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-indigo-300 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            Next.js App Router + Clerk
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            Secure Authentication, <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Made Beautiful</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">
            Experience a seamless, polished authentication flow. Get started by signing up for an account using the buttons above.
          </p>

          <Show when="signed-out">
            <SignUpButton mode="modal">
              <button className="group relative px-8 py-4 bg-white text-black rounded-full font-semibold text-lg hover:bg-slate-100 transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center gap-2">
                Get Started
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </SignUpButton>
          </Show>

          <Show when="signed-in">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col items-center">
              <h2 className="text-2xl font-semibold mb-2">Welcome Back! ✨</h2>
              <p className="text-slate-400 mb-6">You are successfully authenticated and ready to explore.</p>
              <Link href="/dashboard" className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full font-medium transition-colors shadow-lg shadow-indigo-500/20 flex items-center gap-2">
                Go to Dashboard
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </Show>
        </div>
      </main>
    </div>
  );
}
