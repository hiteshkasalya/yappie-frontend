import Link from "next/link";
import { ArrowLeft, Sparkles, MessageCircle, Lock, Users, Smile } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-[#07080a] text-slate-100 selection:bg-cyan-400 selection:text-slate-950 font-sans">
      
      {/* High-Precision Grid Background */}
      <div className="yappie-grid-bg" />

      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-violet-500/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex-grow flex flex-col items-center px-4 py-12 sm:px-6 sm:py-20">
        <div className="w-full max-w-3xl">
          
          {/* Back button */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-[#0c0d12]/40 text-slate-400 hover:text-white hover:border-white/10 hover:bg-[#0c0d12]/60 hover:shadow-[0_0_20px_rgba(255,255,255,0.02)] transition-all duration-200 mb-12 backdrop-blur-md"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-bold">Back to Home</span>
          </Link>
          
          {/* Main Article */}
          <article className="space-y-16">
            
            {/* Header section */}
            <header className="border-b border-white/5 pb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                  <MessageCircle className="h-4 w-4 text-cyan-400" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Our Story</span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 campus-glow-text">
                About Yappie
              </h1>
              <p className="text-lg sm:text-xl font-medium leading-relaxed text-slate-300">
                Yappie started with a simple observation.
              </p>
            </header>

            {/* Core Premise */}
            <section className="space-y-6">
              <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
                Every day, thousands of students walk through the same campus, attend the same classes, and pass each other in hallways—yet many never get the chance to have a real conversation.
              </p>
              
              {/* Motivation Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="p-5 rounded-xl border border-white/5 bg-[#0c0d12]/20 backdrop-blur-sm flex items-start gap-4">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm sm:text-base">Make new friends</h3>
                    <p className="text-xs text-slate-400 mt-1">Connect with peers across different departments or global rooms.</p>
                  </div>
                </div>
                <div className="p-5 rounded-xl border border-white/5 bg-[#0c0d12]/20 backdrop-blur-sm flex items-start gap-4">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/20">
                    <Lock className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm sm:text-base">Share thoughts anonymously</h3>
                    <p className="text-xs text-slate-400 mt-1">Express yourself without fear of judgment or profile bias.</p>
                  </div>
                </div>
                <div className="p-5 rounded-xl border border-white/5 bg-[#0c0d12]/20 backdrop-blur-sm flex items-start gap-4">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm sm:text-base">Confess secrets</h3>
                    <p className="text-xs text-slate-400 mt-1">Share secrets and gossip on the dedicated campus confessions board.</p>
                  </div>
                </div>
                <div className="p-5 rounded-xl border border-white/5 bg-[#0c0d12]/20 backdrop-blur-sm flex items-start gap-4">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Smile className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm sm:text-base">Simply be heard</h3>
                    <p className="text-xs text-slate-400 mt-1">Find a sympathetic ear when you just want someone to listen.</p>
                  </div>
                </div>
              </div>

              <p className="text-lg font-bold text-white campus-gradient-text pt-4">
                Yappie was created to make those conversations possible.
              </p>
            </section>

            {/* Platform Philosophy */}
            <section className="space-y-6 border-t border-white/5 pt-10">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">A Space with Purpose</h2>
              <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
                This platform isn&apos;t about likes, followers, or popularity. It&apos;s about creating genuine human connections in a space where people can be themselves without the fear of being judged.
              </p>
              <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
                Whether you&apos;re looking to meet someone from your campus, chat with someone from across the world, or anonymously share what&apos;s on your mind, Yappie exists to make that easier.
              </p>
              <p className="text-slate-200 font-semibold leading-relaxed text-base sm:text-lg border-l-2 border-cyan-400 pl-4 py-1 bg-cyan-950/10">
                Every feature—from Anonymous Chat to Campus Chat and Confessions—has been designed with one goal: <strong>Helping people connect more honestly.</strong>
              </p>
            </section>

            {/* Builder block */}
            <section className="p-6 sm:p-8 rounded-2xl border border-white/5 bg-[#0c0d12]/40 backdrop-blur-md space-y-6">
              <h2 className="font-heading text-xl font-extrabold text-white">Built Independently</h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Yappie was built independently by a student who believed that meaningful conversations shouldn&apos;t be difficult to start.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-2 text-xs font-semibold text-slate-400">
                <span className="flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5 text-cyan-400" /> No big company</span>
                <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-violet-400" /> No large team</span>
                <span className="flex items-center gap-1.5"><Smile className="h-3.5 w-3.5 text-fuchsia-400" /> Just an idea that conversations deserve to feel real</span>
              </div>
            </section>

            {/* Concluding Section */}
            <section className="text-center space-y-6 border-t border-white/5 pt-10">
              <p className="text-slate-300 italic text-base sm:text-lg max-w-2xl mx-auto">
                &ldquo;If Yappie has helped you smile, make a friend, express yourself, or simply feel heard—even once—then it has achieved its purpose.&rdquo;
              </p>
              <div className="pt-4">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Thank you for being part of this journey.</p>
                <p className="font-heading text-2xl font-black campus-gradient-text">Welcome to Yappie.</p>
              </div>
            </section>

          </article>
        </div>
      </div>
      
      {/* Simple Footer */}
      <footer className="relative z-10 w-full text-center py-8 border-t border-white/5">
        <p className="text-xs text-slate-600">
          &copy; {new Date().getFullYear()} Yappie. Built anonymously for college students.
        </p>
      </footer>
    </div>
  );
}
