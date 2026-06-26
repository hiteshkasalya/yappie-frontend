"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { saveStoredSession } from "@/lib/clientSession";
import { MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function JoinForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session && (event === "SIGNED_IN" || event === "TOKEN_REFRESHED")) {
        try {
          const res = await fetch("/api/auth/session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ access_token: session.access_token }),
          });
          const data = await res.json();
          if (res.ok && data.user) {
            saveStoredSession(data);
          }
        } catch (err) {
          console.error("Session sync failed:", err);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleGoogleSuccess = async (accessToken: string) => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token: accessToken })
      });
      const data = await res.json();
      if (res.ok && data.user) {
        saveStoredSession(data);
        trackEvent("login", { method: "Google" });
        window.location.href = "/";
      } else {
        setError(data.error || "Google Login failed.");
      }
    } catch {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="join-root">
      {/* Layered background */}
      <div className="join-bg" />
      <div className="join-noise" />

      {/* Ambient orbs */}
      <div className="join-orb join-orb-1" />
      <div className="join-orb join-orb-2" />
      <div className="join-orb join-orb-3" />

      {/* ── HEADER ── */}
      <header className="join-header">
        <div className="join-logo">
          <div className="join-logo-icon">
            <MessageCircle className="h-5 w-5 text-white" />
          </div>
          <span className="join-logo-text">Yappie</span>
        </div>

        <nav className="join-nav">
          <Link href="/" className="join-nav-link join-nav-link--active">Home</Link>
          <Link href="/about" className="join-nav-link">About</Link>
        </nav>

        <Link href="/about" className="join-header-cta">
          About us
        </Link>
      </header>

      {/* ── HERO ── */}
      <main className="join-hero">
        {/* Left: pitch */}
        <div className="join-pitch">
          <div className="join-eyebrow">
            <span className="join-eyebrow-dot" />
            <span>Anonymous · Verified · Instant</span>
          </div>

          <h1 className="join-headline">
            Talk freely.<br />
            <span className="join-headline-accent">Make real connections.</span>
          </h1>

          <p className="join-subline">
            The anonymous campus network built for college students. Chat, confess, connect — all without revealing who you are.
          </p>

          {/* Social proof bar */}
          <div className="join-social-proof">
            <div className="join-avatars">
              {["A","B","C","D"].map((l, i) => (
                <div key={i} className="join-avatar" style={{ zIndex: 4 - i }}>
                  {l}
                </div>
              ))}
            </div>
            <p className="join-social-text">
              <strong>2,400+</strong> students already chatting
            </p>
          </div>

          {/* Feature pills */}
          <div className="join-pills">
            <span className="join-pill">Campus Chat</span>
            <span className="join-pill">Anonymous Confessions</span>
            <span className="join-pill">Stranger Chat</span>
          </div>
        </div>

        {/* Right: auth card */}
        <div id="auth-card" className="join-card-wrap">
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "558841127533-v0gpcqrn1f45ru62rknkm79fk73odoa9.apps.googleusercontent.com"}>
            <div className="join-card">
              {/* Card glow rim */}
              <div className="join-card-glow" />

              {/* Card top accent line */}
              <div className="join-card-accent" />

              <div className="join-card-icon">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>

              <h2 className="join-card-title">Enter Yappie</h2>
              <p className="join-card-desc">Sign in once. Stay anonymous forever.</p>

              {error && (
                <div className="join-card-error">
                  {error}
                </div>
              )}

              <GoogleLoginButton
                onSuccess={handleGoogleSuccess}
                onError={() => setError("Google Login failed.")}
                loading={loading}
              />

              <p className="join-card-legal">
                By continuing, you agree to our{" "}
                <Link href="/about" className="join-card-legal-link">Terms</Link>
                {" & "}
                <Link href="/about" className="join-card-legal-link">Privacy</Link>.
                Your identity is never shared.
              </p>
            </div>
          </GoogleOAuthProvider>
        </div>
      </main>

      {/* ── FEATURES ── */}
      <section className="join-features" aria-label="Yappie Core Features">
        <div className="join-features-header">
          <p className="join-features-eyebrow">Why students love Yappie</p>
          <h2 className="join-features-title">The anonymous college network,<br />built different.</h2>
        </div>

        <div className="join-features-grid">
          {/* Feature 1 */}
          <article className="join-feat-card join-feat-card--cyan">
            <div className="join-feat-icon join-feat-icon--cyan">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="join-feat-title">Campus Chat</h3>
            <p className="join-feat-desc">Private rooms locked to your college. Talk to peers on your campus without anyone outside seeing.</p>
          </article>

          {/* Feature 2 */}
          <article className="join-feat-card join-feat-card--violet">
            <div className="join-feat-icon join-feat-icon--violet">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="join-feat-title">Anonymous Confessions</h3>
            <p className="join-feat-desc">A campus wall for secrets, gossip, and honest thoughts. Your identity is stripped at the server — guaranteed.</p>
          </article>

          {/* Feature 3 */}
          <article className="join-feat-card join-feat-card--rose">
            <div className="join-feat-icon join-feat-icon--rose">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="join-feat-title">Stranger Chat</h3>
            <p className="join-feat-desc">Match with a random student from any college for a spontaneous conversation. No profile, no history.</p>
          </article>
        </div>

        {/* FAQ strip */}
        <div className="join-faq">
          <div className="join-faq-item">
            <h4 className="join-faq-q">Is Yappie really anonymous?</h4>
            <p className="join-faq-a">Yes. You get a random username like @ghost882. Real IDs are stripped — even inspect element reveals nothing.</p>
          </div>
          <div className="join-faq-divider" />
          <div className="join-faq-item">
            <h4 className="join-faq-q">Can I chat outside my college?</h4>
            <p className="join-faq-a">Yes. Global rooms and Stranger Chat connect you with students across COEP, PICT, MIT-WPU, VIT, and more.</p>
          </div>
          <div className="join-faq-divider" />
          <div className="join-faq-item">
            <h4 className="join-faq-q">Why Google Sign-in?</h4>
            <p className="join-faq-a">Only to verify you&apos;re a real student and assign your college. We never store your personal data.</p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="join-footer">
        <div className="join-footer-brand">
          <div className="join-logo-icon join-logo-icon--sm">
            <MessageCircle className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="join-footer-name">Yappie</span>
        </div>
        <p className="join-footer-copy">&copy; {new Date().getFullYear()} Yappie. Built anonymously for college students.</p>
        <nav className="join-footer-nav" aria-label="Footer Navigation">
          <Link href="/" className="join-footer-link">Home</Link>
          <Link href="/about" className="join-footer-link">About</Link>
        </nav>
      </footer>
    </div>
  );
}

function GoogleLoginButton({
  onSuccess,
  onError,
  loading
}: {
  onSuccess: (accessToken: string) => void;
  onError: () => void;
  loading: boolean;
}) {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => onSuccess(tokenResponse.access_token),
    onError: () => onError()
  });

  return (
    <button
      type="button"
      onClick={() => login()}
      disabled={loading}
      className="join-google-btn"
    >
      {loading ? (
        <span className="join-google-spinner" />
      ) : (
        <svg className="h-[18px] w-[18px] shrink-0" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
        </svg>
      )}
      <span>{loading ? "Connecting…" : "Continue with Google"}</span>
    </button>
  );
}
