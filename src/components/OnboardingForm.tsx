"use client";

import { FormEvent, useState } from "react";
import { authFetch, getStoredSession, saveStoredSession, clearStoredSession } from "@/lib/clientSession";
import { ArrowRight, MessageCircle } from "lucide-react";
import { DashboardShell } from "./DashboardShell";
import { trackEvent } from "@/lib/analytics";
import { CollegeSelectorModal, COLLEGES } from "./CollegeSelectorModal";

export function OnboardingForm() {
  const [age, setAge] = useState("");
  const [college, setCollege] = useState("MIT WPU");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleOnboardSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum < 17 || ageNum > 80) {
      setError("Please enter a valid age between 17 and 80.");
      setLoading(false);
      return;
    }

    try {
      const response = await authFetch("/api/auth/onboard", {
        method: "POST",
        body: JSON.stringify({ age: ageNum, college }),
      });

      const data = await response.json().catch(() => null);
      setLoading(false);

      if (!response.ok) {
        if (response.status === 401) {
          clearStoredSession();
          window.location.href = "/";
          return;
        }
        setError(data?.error || "Failed to update profile.");
        return;
      }

      const session = getStoredSession();
      if (session && data.user) {
        session.user = data.user;
        saveStoredSession(session);
      }

      trackEvent("sign_up", { method: "Google" });
      trackEvent("profile_completed", { age: ageNum, college });

      window.location.href = "/";
    } catch (err) {
      console.error(err);
      setError("Unable to connect. Please try again.");
      setLoading(false);
    }
  }

  const selectedCollege = COLLEGES.find((c) => c.id === college);

  return (
    <DashboardShell>
      {/* ── BACKGROUND ── */}
      <div className="ob-root">
        <div className="ob-bg" />
        <div className="ob-orb ob-orb-1" />
        <div className="ob-orb ob-orb-2" />

        {/* ── HEADER ── */}
        <header className="ob-header">
          <div className="ob-logo">
            <div className="ob-logo-icon">
              <MessageCircle className="h-4 w-4 text-white" />
            </div>
            <span className="ob-logo-text">Yappie</span>
          </div>
        </header>

        {/* ── FORM PANEL ── */}
        <div className="ob-center">
          <div className="ob-card">
            {/* Card glow rim */}
            <div className="ob-card-rim" />

            {/* Step indicator */}
            <div className="ob-steps">
              <div className="ob-step ob-step--done">1</div>
              <div className="ob-step-line" />
              <div className="ob-step ob-step--active">2</div>
              <div className="ob-step-line ob-step-line--dim" />
              <div className="ob-step ob-step--idle">3</div>
            </div>

            <div className="ob-card-body">
              <p className="ob-eyebrow">Almost there</p>
              <h2 className="ob-title">Set up your profile</h2>
              <p className="ob-desc">
                Tell us your age and campus so we can connect you with the right stream.
              </p>

              <form onSubmit={handleOnboardSubmit} className="ob-form">
                {/* Age field */}
                <div className="ob-field">
                  <label className="ob-label" htmlFor="onboard-age">Your age</label>
                  <div className="ob-input-wrap">
                    <input
                      id="onboard-age"
                      required
                      type="number"
                      min={17}
                      max={80}
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="ob-input"
                      placeholder="e.g. 20"
                    />
                  </div>
                </div>

                {/* College field */}
                <div className="ob-field">
                  <label className="ob-label">College / University</label>
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(true)}
                    className="ob-select"
                  >
                    <span className="ob-select-value">
                      {selectedCollege?.name ?? "Select your college"}
                    </span>
                    <svg className="h-4 w-4 shrink-0 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <CollegeSelectorModal
                    isOpen={dropdownOpen}
                    onClose={() => setDropdownOpen(false)}
                    selectedValue={college}
                    onChange={(val) => setCollege(val)}
                  />
                </div>

                {error && <div className="ob-error">{error}</div>}

                <button disabled={loading} type="submit" className="ob-submit">
                  {loading ? (
                    <>
                      <span className="ob-spinner" />
                      <span>Connecting…</span>
                    </>
                  ) : (
                    <>
                      <span>Enter campus stream</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              <p className="ob-footer-note">
                Your identity stays strictly anonymous. We never store your real name.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
