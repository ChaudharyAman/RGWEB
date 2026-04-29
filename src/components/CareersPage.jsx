import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import GoogleIdentityButton from "./GoogleIdentityButton";
import { resolvePublicApiBase } from "../lib/apiBase";

const TOKEN_KEY = "applicant_token";
const USER_KEY = "applicant_user";
const POPULAR_SKILLS = ["React", "Node.js", "JavaScript", "TypeScript", "MongoDB", "QA", "Recruitment"];
const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Freelance", "Internship", "Remote"];
const JOB_SEARCH_STATUSES = ["Actively Looking", "Open to Opportunities", "Not Looking"];
const EMPTY_EXPERIENCE = {
  jobTitle: "",
  companyName: "",
  employmentType: "Full-time",
  location: "",
  locationType: "Onsite",
  startMonth: "",
  startYear: "",
  endMonth: "",
  endYear: "",
  isCurrent: false,
  description: "",
  skillsText: "",
};
const EMPTY_EDUCATION = {
  degree: "",
  fieldOfStudy: "",
  institution: "",
  grade: "",
  startYear: "",
  endYear: "",
  isCurrent: false,
  description: "",
};

const formatDate = (value) => {
  if (!value) return "";
  try {
    return new Date(value).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
};

const trimText = (value, max = 180) => {
  const clean = String(value || "").replace(/\s+/g, " ").trim();
  if (!clean) return "";
  return clean.length > max ? `${clean.slice(0, max).trim()}...` : clean;
};

const normalizeCommaList = (value, maxItems = null) => {
  const items = String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return maxItems ? items.slice(0, maxItems) : items;
};

const formatRelativePosted = (value) => {
  if (!value) return "Recently posted";

  const timestamp = new Date(value).getTime();
  if (Number.isNaN(timestamp)) {
    return "Recently posted";
  }

  const diffMs = Date.now() - timestamp;
  const diffMinutes = Math.max(1, Math.round(diffMs / 60000));

  if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
  }

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  }

  const diffDays = Math.round(diffHours / 24);
  if (diffDays < 30) {
    return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  }

  return formatDate(value);
};

const getJobSkills = (job, maxItems = null) => {
  const values = [
    ...(job?.requirements?.mustHaveSkills?.technical || []),
    ...(job?.requirements?.mustHaveSkills?.softSkills || []),
    ...(job?.requirements?.niceToHaveSkills || []),
  ]
    .map((item) => String(item || "").trim())
    .filter(Boolean);

  const uniqueValues = Array.from(new Set(values));
  return maxItems ? uniqueValues.slice(0, maxItems) : uniqueValues;
};

const getLocationMode = (value) => {
  const normalized = String(value || "").toLowerCase();

  if (normalized.includes("remote")) return "remote";
  if (normalized.includes("hybrid")) return "hybrid";
  if (
    normalized.includes("onsite") ||
    normalized.includes("on-site") ||
    normalized.includes("on site") ||
    normalized.includes("office")
  ) {
    return "onsite";
  }

  return "flexible";
};

const getUniqueValues = (values) => Array.from(new Set(values.filter(Boolean)));

const getJobCompanyLabel = (job) => job?.client || job?.companyId?.name || "Hiring Partner";

const formatBudgetRange = (budgetRange) => {
  if (!budgetRange) {
    return "Shared after screening";
  }

  if (budgetRange.isOpen) {
    return "Open";
  }

  if (budgetRange.min || budgetRange.max) {
    return `${budgetRange.currency || "INR"} ${budgetRange.min || "-"} - ${budgetRange.max || "-"}`;
  }

  return "Shared after screening";
};

const createBasicForm = (profile) => ({
  firstName: profile?.firstName || "",
  lastName: profile?.lastName || "",
  mobile: profile?.mobile || "",
  headline: profile?.headline || "",
  currentCity: profile?.currentCity || "",
  currentState: profile?.currentState || "",
  currentCountry: profile?.currentCountry || "India",
  willingToRelocate: Boolean(profile?.willingToRelocate),
  preferredLocationsText: (profile?.preferredLocations || []).join(", "),
  preferredJobTypes: profile?.preferredJobTypes || [],
  preferredDepartmentsText: (profile?.preferredDepartments || []).join(", "),
  jobSearchStatus: profile?.jobSearchStatus || "Actively Looking",
  totalExperienceYears:
    profile?.totalExperienceYears !== undefined && profile?.totalExperienceYears !== null
      ? String(profile.totalExperienceYears)
      : "",
});

const createLinksForm = (profile) => ({
  linkedinUrl: profile?.linkedinUrl || "",
  githubUrl: profile?.githubUrl || "",
  portfolioUrl: profile?.portfolioUrl || "",
  otherLinks: (profile?.otherLinks || []).length ? profile.otherLinks : [{ label: "", url: "" }],
});

const createCompensationForm = (profile) => ({
  currentCTC: profile?.currentCTC?.toString?.() || "",
  expectedCTC: profile?.expectedCTC?.toString?.() || "",
  noticePeriod: profile?.noticePeriod?.toString?.() || "",
});

const createApplyForm = (applicant, profile) => ({
  candidateName:
    `${profile?.firstName || applicant?.firstName || ""} ${profile?.lastName || applicant?.lastName || ""}`.trim(),
  email: profile?.email || applicant?.email || "",
  mobile: profile?.mobile || applicant?.mobile || "",
  currentCTC: profile?.currentCTC?.toString?.() || "",
  expectedCTC: profile?.expectedCTC?.toString?.() || "",
  noticePeriod: profile?.noticePeriod?.toString?.() || "",
  coverNote: "",
  resume: null,
});

const toExperienceForm = (item) => ({
  jobTitle: item?.jobTitle || "",
  companyName: item?.companyName || "",
  employmentType: item?.employmentType || "Full-time",
  location: item?.location || "",
  locationType: item?.locationType || "Onsite",
  startMonth: item?.startMonth?.toString?.() || "",
  startYear: item?.startYear?.toString?.() || "",
  endMonth: item?.endMonth?.toString?.() || "",
  endYear: item?.endYear?.toString?.() || "",
  isCurrent: Boolean(item?.isCurrent),
  description: item?.description || "",
  skillsText: (item?.skills || []).join(", "),
});

const toEducationForm = (item) => ({
  degree: item?.degree || "",
  fieldOfStudy: item?.fieldOfStudy || "",
  institution: item?.institution || "",
  grade: item?.grade || "",
  startYear: item?.startYear?.toString?.() || "",
  endYear: item?.endYear?.toString?.() || "",
  isCurrent: Boolean(item?.isCurrent),
  description: item?.description || "",
});

const extractMessage = (payload, fallback) => {
  if (payload && typeof payload === "object" && payload.message) {
    return payload.message;
  }

  return fallback;
};

function ModalFrame({ isOpen, onClose, maxWidth = "max-w-3xl", children }) {
  useEffect(() => {
    if (!isOpen) return undefined;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={`surface-card scrollbar-hidden max-h-[92vh] w-full overflow-y-auto ${maxWidth}`}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            onClick={(event) => event.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function FieldError({ message }) {
  return message ? <p className="mt-2 text-sm text-red-600">{message}</p> : null;
}

function ProfileStrengthCard({ completion, onOpenProfile }) {
  if (!completion) {
    return null;
  }

  const score = completion.score || 0;
  const nextSection = Object.entries(completion.sections || {}).find(([, section]) => !section.complete);

  return (
    <div className="rounded-[24px] border border-cyan-100 bg-cyan-50/70 p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">Profile Strength</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-900">{score}% complete</h3>
          <p className="mt-2 text-sm text-slate-600">
            Stronger profiles make repeat applications much faster and give recruiters better context.
          </p>
        </div>
        <div className="flex h-20 w-20 items-center justify-center rounded-full border-8 border-cyan-200 bg-white text-xl font-black text-cyan-700">
          {score}%
        </div>
      </div>

      <div className="mt-4 h-3 overflow-hidden rounded-full bg-white">
        <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600" style={{ width: `${score}%` }} />
      </div>

      {nextSection ? (
        <button type="button" onClick={onOpenProfile} className="mt-4 text-sm font-semibold text-cyan-700 hover:underline">
          Next best step: complete {nextSection[1].label?.toLowerCase() || "your profile"}
        </button>
      ) : null}
    </div>
  );
}

function AuthDialog({ isOpen, mode, onModeChange, onClose, apiRequest, onAuthSuccess, announce }) {
  const [submitting, setSubmitting] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [verifyForm, setVerifyForm] = useState({ email: "", otp: "" });
  const [forgotForm, setForgotForm] = useState({ email: "" });
  const [resetForm, setResetForm] = useState({ email: "", otp: "", newPassword: "" });

  useEffect(() => {
    if (!isOpen) {
      setSubmitting(false);
    }
  }, [isOpen]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      const data = await apiRequest("/api/public/applicant/login", {
        method: "POST",
        body: {
          email: loginForm.email.trim().toLowerCase(),
          password: loginForm.password,
        },
      });
      await onAuthSuccess(data.token, data.applicant, "Signed in successfully.");
      onClose();
    } catch (error) {
      if (error.payload?.needsVerification && error.payload?.email) {
        setVerifyForm({ email: error.payload.email, otp: "" });
        onModeChange("verify");
      }
      announce(error.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      const data = await apiRequest("/api/public/applicant/register", {
        method: "POST",
        body: {
          ...registerForm,
          email: registerForm.email.trim().toLowerCase(),
        },
      });
      setVerifyForm({ email: data.email || registerForm.email.trim().toLowerCase(), otp: "" });
      announce(data.message || "Account created. Check your inbox for the verification code.", "success");
      onModeChange("verify");
    } catch (error) {
      announce(error.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerify = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      const data = await apiRequest("/api/public/applicant/verify-email", {
        method: "POST",
        body: {
          email: verifyForm.email.trim().toLowerCase(),
          otp: verifyForm.otp.trim(),
        },
      });
      await onAuthSuccess(data.token, data.applicant, data.message || "Email verified successfully.");
      onClose();
    } catch (error) {
      announce(error.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    try {
      setSubmitting(true);
      const data = await apiRequest("/api/public/applicant/resend-verification", {
        method: "POST",
        body: {
          email: verifyForm.email.trim().toLowerCase(),
        },
      });
      announce(data.message || "A new verification code has been sent.", "success");
    } catch (error) {
      announce(error.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgot = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      const data = await apiRequest("/api/public/applicant/forgot-password", {
        method: "POST",
        body: {
          email: forgotForm.email.trim().toLowerCase(),
        },
      });
      setResetForm((current) => ({ ...current, email: forgotForm.email.trim().toLowerCase() }));
      announce(data.message || "Reset instructions sent.", "success");
      onModeChange("reset");
    } catch (error) {
      announce(error.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      const data = await apiRequest("/api/public/applicant/reset-password", {
        method: "POST",
        body: {
          email: resetForm.email.trim().toLowerCase(),
          otp: resetForm.otp.trim(),
          newPassword: resetForm.newPassword,
        },
      });
      announce(data.message || "Password reset successfully.", "success");
      setLoginForm((current) => ({ ...current, email: resetForm.email.trim().toLowerCase(), password: "" }));
      onModeChange("login");
    } catch (error) {
      announce(error.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleCredential = async (credential) => {
    try {
      setSubmitting(true);
      const data = await apiRequest("/api/public/applicant/google", {
        method: "POST",
        body: { credential },
      });
      await onAuthSuccess(data.token, data.applicant, data.message || "Signed in with Google.");
      onClose();
    } catch (error) {
      announce(error.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const modeConfig = {
    login: {
      title: "Applicant Sign In",
      subtitle: "Use your TalentCIO applicant account inside Resource Gateway.",
    },
    register: {
      title: "Create Your Account",
      subtitle: "Start here once, then keep applying and tracking jobs from this page.",
    },
    verify: {
      title: "Verify Your Email",
      subtitle: "Enter the 6-digit code sent to your inbox to activate your account.",
    },
    forgot: {
      title: "Forgot Password",
      subtitle: "We will send a reset code to your email address.",
    },
    reset: {
      title: "Reset Password",
      subtitle: "Use the reset code from your email and choose a new password.",
    },
  };

  const currentConfig = modeConfig[mode] || modeConfig.login;

  return (
    <ModalFrame isOpen={isOpen} onClose={onClose} maxWidth="max-w-2xl">
      <div className="border-b border-slate-200 px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-700">Resource Gateway Careers</p>
            <h2 className="mt-2 text-3xl font-black text-slate-900">{currentConfig.title}</h2>
            <p className="mt-2 max-w-xl text-sm leading-7 text-slate-600">{currentConfig.subtitle}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-800">
            Close
          </button>
        </div>
      </div>

      <div className="p-6">
        {mode === "login" || mode === "register" ? (
          <div className="mb-6 rounded-[22px] border border-slate-200 bg-gradient-to-r from-slate-50 to-white px-5 py-4">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">Quick Access</p>
            <GoogleIdentityButton
              onCredential={handleGoogleCredential}
              disabled={submitting}
              className="max-w-[340px]"
              width={340}
            />
          </div>
        ) : null}

        {mode === "login" ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label-shell">Email Address</label>
              <input
                type="email"
                className="input-shell"
                value={loginForm.email}
                onChange={(event) => setLoginForm((current) => ({ ...current, email: event.target.value }))}
                placeholder="name@example.com"
              />
            </div>
            <div>
              <label className="label-shell">Password</label>
              <input
                type="password"
                className="input-shell"
                value={loginForm.password}
                onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))}
                placeholder="Minimum 8 characters"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-70">
                {submitting ? "Signing In..." : "Sign In"}
              </button>
              <button type="button" onClick={() => onModeChange("forgot")} className="text-sm font-semibold text-cyan-700 hover:underline">
                Forgot password?
              </button>
            </div>
            <p className="text-sm text-slate-500">
              New here?{" "}
              <button type="button" onClick={() => onModeChange("register")} className="font-semibold text-cyan-700 hover:underline">
                Create an account
              </button>
            </p>
          </form>
        ) : null}

        {mode === "register" ? (
          <form onSubmit={handleRegister} className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-shell">First Name</label>
              <input className="input-shell" value={registerForm.firstName} onChange={(event) => setRegisterForm((current) => ({ ...current, firstName: event.target.value }))} />
            </div>
            <div>
              <label className="label-shell">Last Name</label>
              <input className="input-shell" value={registerForm.lastName} onChange={(event) => setRegisterForm((current) => ({ ...current, lastName: event.target.value }))} />
            </div>
            <div className="sm:col-span-2">
              <label className="label-shell">Email Address</label>
              <input type="email" className="input-shell" value={registerForm.email} onChange={(event) => setRegisterForm((current) => ({ ...current, email: event.target.value }))} />
            </div>
            <div>
              <label className="label-shell">Mobile Number</label>
              <input className="input-shell" value={registerForm.mobile} onChange={(event) => setRegisterForm((current) => ({ ...current, mobile: event.target.value.replace(/\D/g, "").slice(0, 10) }))} />
            </div>
            <div>
              <label className="label-shell">Password</label>
              <input type="password" className="input-shell" value={registerForm.password} onChange={(event) => setRegisterForm((current) => ({ ...current, password: event.target.value }))} />
            </div>
            <div className="sm:col-span-2 flex flex-wrap items-center gap-3 pt-2">
              <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-70">
                {submitting ? "Creating..." : "Create Account"}
              </button>
              <button type="button" onClick={() => onModeChange("login")} className="btn-secondary">
                Back to Sign In
              </button>
            </div>
          </form>
        ) : null}

        {mode === "verify" ? (
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="label-shell">Email Address</label>
              <input type="email" className="input-shell" value={verifyForm.email} onChange={(event) => setVerifyForm((current) => ({ ...current, email: event.target.value }))} />
            </div>
            <div>
              <label className="label-shell">Verification Code</label>
              <input className="input-shell" maxLength={6} value={verifyForm.otp} onChange={(event) => setVerifyForm((current) => ({ ...current, otp: event.target.value.replace(/\D/g, "").slice(0, 6) }))} placeholder="6-digit code" />
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-70">
                {submitting ? "Verifying..." : "Verify Email"}
              </button>
              <button type="button" onClick={handleResend} disabled={submitting} className="btn-secondary">
                Resend Code
              </button>
            </div>
          </form>
        ) : null}

        {mode === "forgot" ? (
          <form onSubmit={handleForgot} className="space-y-4">
            <div>
              <label className="label-shell">Email Address</label>
              <input type="email" className="input-shell" value={forgotForm.email} onChange={(event) => setForgotForm({ email: event.target.value })} />
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-70">
                {submitting ? "Sending..." : "Send Reset Code"}
              </button>
              <button type="button" onClick={() => onModeChange("login")} className="btn-secondary">
                Back to Sign In
              </button>
            </div>
          </form>
        ) : null}

        {mode === "reset" ? (
          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <label className="label-shell">Email Address</label>
              <input type="email" className="input-shell" value={resetForm.email} onChange={(event) => setResetForm((current) => ({ ...current, email: event.target.value }))} />
            </div>
            <div>
              <label className="label-shell">Reset Code</label>
              <input className="input-shell" value={resetForm.otp} onChange={(event) => setResetForm((current) => ({ ...current, otp: event.target.value.replace(/\D/g, "").slice(0, 6) }))} />
            </div>
            <div>
              <label className="label-shell">New Password</label>
              <input type="password" className="input-shell" value={resetForm.newPassword} onChange={(event) => setResetForm((current) => ({ ...current, newPassword: event.target.value }))} />
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-70">
                {submitting ? "Resetting..." : "Reset Password"}
              </button>
              <button type="button" onClick={() => onModeChange("login")} className="btn-secondary">
                Back to Sign In
              </button>
            </div>
          </form>
        ) : null}
      </div>
    </ModalFrame>
  );
}

function ApplyDialog({
  isOpen,
  job,
  token,
  applicant,
  profile,
  alreadyApplied,
  onClose,
  onRequireAuth,
  onApplied,
  onViewApplications,
  apiRequest,
  announce,
}) {
  const [form, setForm] = useState(() => createApplyForm(applicant, profile));
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [usingProfileResume, setUsingProfileResume] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setForm(createApplyForm(applicant, profile));
    setErrors({});
    setUsingProfileResume(Boolean(profile?.resumeUrl));
    setSubmitted(false);
  }, [isOpen, applicant, profile, job?._id]);

  if (!job) {
    return null;
  }

  const mustHaveSkills = job?.requirements?.mustHaveSkills || {};
  const allMustHaveSkills = [
    ...(mustHaveSkills.technical || []),
    ...(mustHaveSkills.softSkills || []),
  ];

  const validate = () => {
    const nextErrors = {};

    if (!form.candidateName.trim()) {
      nextErrors.candidateName = "Full name is required.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim().toLowerCase())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) {
      nextErrors.mobile = "Enter a valid 10-digit mobile number.";
    }

    if (!usingProfileResume && !form.resume) {
      nextErrors.resume = "Resume is required.";
    } else if (!usingProfileResume && form.resume) {
      const extension = form.resume.name.split(".").pop()?.toLowerCase();
      const allowedExtensions = ["pdf", "doc", "docx"];

      if (!allowedExtensions.includes(extension)) {
        nextErrors.resume = "Resume must be PDF, DOC, or DOCX.";
      } else if (form.resume.size > 5 * 1024 * 1024) {
        nextErrors.resume = "Resume must be smaller than 5MB.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    try {
      setSubmitting(true);
      const payload = new FormData();
      payload.append("candidateName", form.candidateName.trim());
      payload.append("email", form.email.trim().toLowerCase());
      payload.append("mobile", form.mobile.trim());
      if (form.currentCTC) payload.append("currentCTC", form.currentCTC);
      if (form.expectedCTC) payload.append("expectedCTC", form.expectedCTC);
      if (form.noticePeriod) payload.append("noticePeriod", form.noticePeriod);
      if (form.coverNote.trim()) payload.append("coverNote", form.coverNote.trim());

      if (usingProfileResume && profile?.resumeUrl) {
        payload.append("useProfileResume", "true");
        payload.append("profileResumeUrl", profile.resumeUrl);
        payload.append("profileResumePublicId", profile.resumePublicId || "");
      } else if (form.resume) {
        payload.append("resume", form.resume);
      }

      const data = await apiRequest(`/api/public/jobs/${job._id}/apply`, {
        method: "POST",
        body: payload,
        token,
      });

      announce(data.message || "Application submitted successfully.", "success");
      await onApplied();
      setSubmitted(true);
    } catch (error) {
      announce(error.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ModalFrame isOpen={isOpen} onClose={onClose} maxWidth="max-w-5xl">
      <div className="border-b border-slate-200 px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-700">Apply from Resource Gateway</p>
            <h2 className="mt-2 text-3xl font-black text-slate-900">{job.publicJobTitle || job.roleDetails?.title}</h2>
            <p className="mt-2 text-sm text-slate-500">{getJobCompanyLabel(job)}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-800">
            Close
          </button>
        </div>
      </div>

      <div className="space-y-6 p-6">
        <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
              {job.roleDetails?.employmentType || "Full-time"}
            </span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
              {job.roleDetails?.department || "General"}
            </span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
              {job.requirements?.location || "Flexible"}
            </span>
            {(job.requirements?.experienceMin || job.requirements?.experienceMax) ? (
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                {job.requirements?.experienceMin || 0}-{job.requirements?.experienceMax || job.requirements?.experienceMin || 0} yrs
              </span>
            ) : null}
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[22px] border border-white bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Openings</p>
              <p className="mt-2 text-lg font-bold text-slate-900">{job.hiringDetails?.openPositions || 1}</p>
            </div>
            <div className="rounded-[22px] border border-white bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Published</p>
              <p className="mt-2 text-lg font-bold text-slate-900">{formatDate(job.createdAt)}</p>
            </div>
            <div className="rounded-[22px] border border-white bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Shift</p>
              <p className="mt-2 text-lg font-bold text-slate-900">{job.requirements?.shift || "Standard"}</p>
            </div>
            <div className="rounded-[22px] border border-white bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Budget</p>
              <p className="mt-2 text-lg font-bold text-slate-900">{formatBudgetRange(job.hiringDetails?.budgetRange)}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">Role Snapshot</h3>
            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
              {job.publicJobDescription || job.jobDescription || "The hiring team has not added a public description for this role yet."}
            </p>
          </div>

          {allMustHaveSkills.length ? (
            <div className="mt-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">Must-Have Skills</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {allMustHaveSkills.map((skill) => (
                  <span key={skill} className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {job.requirements?.niceToHaveSkills?.length ? (
            <div className="mt-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">Nice-to-Have Skills</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {job.requirements.niceToHaveSkills.map((skill) => (
                  <span key={skill} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {!token ? (
          <div className="rounded-[28px] border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-slate-50 p-6">
            <h3 className="text-2xl font-bold text-slate-900">Sign in to apply</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              We keep the full applicant experience here on Resource Gateway, but applications still need your TalentCIO applicant account so you can track status later.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={() => onRequireAuth("login")} className="btn-primary">
                Sign In
              </button>
              <button type="button" onClick={() => onRequireAuth("register")} className="btn-secondary">
                Create Account
              </button>
            </div>
          </div>
        ) : submitted ? (
          <div className="rounded-[28px] border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-cyan-50 p-6">
            <div className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">
              Application Received
            </div>
            <h3 className="mt-4 text-3xl font-black text-slate-900">Welcome to the next step.</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Your application for <span className="font-semibold text-slate-900">{job.publicJobTitle || job.roleDetails?.title}</span> has been shared with the hiring team.
              We will review your profile and update your status in your applicant dashboard.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-[22px] border border-white bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Applied As</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{form.candidateName || applicant?.firstName || "Applicant"}</p>
              </div>
              <div className="rounded-[22px] border border-white bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Tracking Email</p>
                <p className="mt-2 text-sm font-semibold text-slate-900 break-all">{form.email || applicant?.email || "Saved to your account"}</p>
              </div>
              <div className="rounded-[22px] border border-white bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Next Update</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">Inside My Applications</p>
              </div>
            </div>

            <div className="mt-6 rounded-[22px] border border-emerald-100 bg-white/90 p-4 text-sm leading-7 text-slate-600">
              Keep your profile and resume updated to make future applications even faster. This submission is already saved to your applicant account.
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onViewApplications?.();
                }}
                className="btn-primary"
              >
                Open My Applications
              </button>
              <button type="button" onClick={onClose} className="btn-secondary">
                Explore More Roles
              </button>
            </div>
          </div>
        ) : alreadyApplied ? (
          <div className="rounded-[24px] border border-emerald-200 bg-emerald-50 p-5">
            <h3 className="text-xl font-bold text-emerald-800">You already applied to this role.</h3>
            <p className="mt-2 text-sm text-emerald-700">
              This role is on your account already. You can close this window or keep reviewing the full details above.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
          {profile?.resumeUrl ? (
            <div className="mb-5 rounded-[24px] border border-cyan-100 bg-cyan-50 p-4 text-sm text-cyan-800">
              Your TalentCIO profile resume is available here. You can reuse it or upload a different one for this application.
            </div>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="label-shell">Full Name</label>
              <input className="input-shell" value={form.candidateName} onChange={(event) => setForm((current) => ({ ...current, candidateName: event.target.value }))} />
              <FieldError message={errors.candidateName} />
            </div>
            <div>
              <label className="label-shell">Email Address</label>
              <input type="email" className="input-shell" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} />
              <FieldError message={errors.email} />
            </div>
            <div>
              <label className="label-shell">Phone Number</label>
              <input className="input-shell" value={form.mobile} onChange={(event) => setForm((current) => ({ ...current, mobile: event.target.value.replace(/\D/g, "").slice(0, 10) }))} />
              <FieldError message={errors.mobile} />
            </div>
            <div>
              <label className="label-shell">Current CTC (LPA)</label>
              <input type="number" className="input-shell" value={form.currentCTC} onChange={(event) => setForm((current) => ({ ...current, currentCTC: event.target.value }))} />
            </div>
            <div>
              <label className="label-shell">Expected CTC (LPA)</label>
              <input type="number" className="input-shell" value={form.expectedCTC} onChange={(event) => setForm((current) => ({ ...current, expectedCTC: event.target.value }))} />
            </div>
            <div className="sm:col-span-2">
              <label className="label-shell">Notice Period (days)</label>
              <input type="number" className="input-shell" value={form.noticePeriod} onChange={(event) => setForm((current) => ({ ...current, noticePeriod: event.target.value }))} />
            </div>
            <div className="sm:col-span-2">
              <label className="label-shell">Cover Note</label>
              <textarea rows={4} className="input-shell resize-none" value={form.coverNote} onChange={(event) => setForm((current) => ({ ...current, coverNote: event.target.value.slice(0, 500) }))} placeholder="Anything you want the hiring team to know?" />
            </div>
            <div className="sm:col-span-2">
              <label className="label-shell">Resume</label>
              {usingProfileResume && profile?.resumeUrl ? (
                <div className="rounded-[22px] border border-emerald-200 bg-emerald-50 p-4">
                  <p className="text-sm font-semibold text-emerald-800">
                    Using saved resume {profile.resumeFileName ? `(${profile.resumeFileName})` : ""}
                  </p>
                  <button type="button" onClick={() => setUsingProfileResume(false)} className="mt-2 text-sm font-semibold text-slate-600 hover:underline">
                    Upload a different resume
                  </button>
                </div>
              ) : (
                <div>
                  <label className={`flex cursor-pointer items-center justify-between gap-4 rounded-[24px] border border-dashed px-4 py-4 transition ${errors.resume ? "border-red-300 bg-red-50" : "border-slate-300 bg-slate-50 hover:border-cyan-300 hover:bg-cyan-50"}`}>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{form.resume?.name || "Upload PDF, DOC, or DOCX"}</p>
                      <p className="mt-1 text-xs text-slate-500">Maximum size 5MB</p>
                    </div>
                    <span className="btn-secondary px-4 py-2">Choose File</span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      className="hidden"
                      onChange={(event) => setForm((current) => ({ ...current, resume: event.target.files?.[0] || null }))}
                    />
                  </label>
                  {profile?.resumeUrl ? (
                    <button type="button" onClick={() => setUsingProfileResume(true)} className="mt-2 text-sm font-semibold text-cyan-700 hover:underline">
                      Use saved resume instead
                    </button>
                  ) : null}
                </div>
              )}
              <FieldError message={errors.resume} />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-70">
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      )}
      </div>
    </ModalFrame>
  );
}

function ExperienceManager({ items = [], onSave, onDelete }) {
  const [form, setForm] = useState(EMPTY_EXPERIENCE);
  const [editingId, setEditingId] = useState("");
  const [adding, setAdding] = useState(false);
  const [saving, setSaving] = useState(false);

  const sortedItems = useMemo(
    () =>
      [...items].sort((left, right) => {
        const leftYear = left.isCurrent ? 9999 : Number(left.endYear || left.startYear || 0);
        const rightYear = right.isCurrent ? 9999 : Number(right.endYear || right.startYear || 0);
        return rightYear - leftYear;
      }),
    [items]
  );

  const reset = () => {
    setForm(EMPTY_EXPERIENCE);
    setEditingId("");
    setAdding(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await onSave(editingId, {
        ...form,
        skills: normalizeCommaList(form.skillsText),
      });
      reset();
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="surface-card p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-2xl font-bold text-slate-950">Work Experience</h3>
          <p className="mt-1 text-sm text-slate-500">Keep your recent career history up to date.</p>
        </div>
        <button type="button" onClick={() => { setAdding(true); setEditingId(""); setForm(EMPTY_EXPERIENCE); }} className="btn-secondary">
          Add Experience
        </button>
      </div>

      {(adding || editingId) ? (
        <form onSubmit={handleSubmit} className="rounded-[28px] border border-cyan-100 bg-cyan-50/70 p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-shell">Job Title</label>
              <input className="input-shell" value={form.jobTitle} onChange={(event) => setForm((current) => ({ ...current, jobTitle: event.target.value }))} required />
            </div>
            <div>
              <label className="label-shell">Company Name</label>
              <input className="input-shell" value={form.companyName} onChange={(event) => setForm((current) => ({ ...current, companyName: event.target.value }))} required />
            </div>
            <div>
              <label className="label-shell">Employment Type</label>
              <select className="input-shell" value={form.employmentType} onChange={(event) => setForm((current) => ({ ...current, employmentType: event.target.value }))}>
                {["Full-time", "Part-time", "Contract", "Freelance", "Internship"].map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-shell">Location</label>
              <input className="input-shell" value={form.location} onChange={(event) => setForm((current) => ({ ...current, location: event.target.value }))} />
            </div>
            <div>
              <label className="label-shell">Location Type</label>
              <select className="input-shell" value={form.locationType} onChange={(event) => setForm((current) => ({ ...current, locationType: event.target.value }))}>
                {["Onsite", "Remote", "Hybrid"].map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-3 pt-8">
              <input id="current-role" type="checkbox" checked={form.isCurrent} onChange={(event) => setForm((current) => ({ ...current, isCurrent: event.target.checked }))} className="h-4 w-4 rounded border-slate-300 text-cyan-600" />
              <label htmlFor="current-role" className="text-sm font-medium text-slate-700">I currently work here</label>
            </div>
            <div>
              <label className="label-shell">Start Month</label>
              <input type="number" className="input-shell" value={form.startMonth} onChange={(event) => setForm((current) => ({ ...current, startMonth: event.target.value }))} />
            </div>
            <div>
              <label className="label-shell">Start Year</label>
              <input type="number" className="input-shell" value={form.startYear} onChange={(event) => setForm((current) => ({ ...current, startYear: event.target.value }))} required />
            </div>
            <div>
              <label className="label-shell">End Month</label>
              <input type="number" className="input-shell" disabled={form.isCurrent} value={form.endMonth} onChange={(event) => setForm((current) => ({ ...current, endMonth: event.target.value }))} />
            </div>
            <div>
              <label className="label-shell">End Year</label>
              <input type="number" className="input-shell" disabled={form.isCurrent} value={form.endYear} onChange={(event) => setForm((current) => ({ ...current, endYear: event.target.value }))} />
            </div>
            <div className="sm:col-span-2">
              <label className="label-shell">Description</label>
              <textarea rows={4} className="input-shell resize-none" value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} />
            </div>
            <div className="sm:col-span-2">
              <label className="label-shell">Skills Used</label>
              <input className="input-shell" value={form.skillsText} onChange={(event) => setForm((current) => ({ ...current, skillsText: event.target.value }))} placeholder="React, API integration, Testing" />
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="submit" disabled={saving} className="btn-primary disabled:opacity-70">
              {saving ? "Saving..." : editingId ? "Update Experience" : "Save Experience"}
            </button>
            <button type="button" onClick={reset} className="btn-secondary">Cancel</button>
          </div>
        </form>
      ) : null}

      <div className="mt-5 space-y-4">
        {sortedItems.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
            No work experience added yet.
          </div>
        ) : (
          sortedItems.map((item) => (
            <div key={item._id} className="rounded-[26px] border border-slate-200 bg-white p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-lg font-bold text-slate-950">{item.jobTitle}</h4>
                    <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">{item.employmentType}</span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-slate-600">{item.companyName}{item.location ? `, ${item.location}` : ""}</p>
                  <p className="mt-2 text-sm text-slate-500">
                    {item.startMonth || item.startYear ? `${item.startMonth || ""}/${item.startYear || ""}` : "Start date not set"}
                    {" - "}
                    {item.isCurrent ? "Present" : `${item.endMonth || ""}/${item.endYear || ""}`.trim()}
                  </p>
                  {item.description ? <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-600">{item.description}</p> : null}
                  {item.skills?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.skills.map((skill) => (
                        <span key={skill} className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">{skill}</span>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => { setEditingId(item._id); setAdding(false); setForm(toExperienceForm(item)); }} className="btn-secondary px-4 py-2">
                    Edit
                  </button>
                  <button type="button" onClick={() => onDelete(item._id)} className="rounded-[16px] border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

function EducationManager({ items = [], onSave, onDelete }) {
  const [form, setForm] = useState(EMPTY_EDUCATION);
  const [editingId, setEditingId] = useState("");
  const [adding, setAdding] = useState(false);
  const [saving, setSaving] = useState(false);

  const sortedItems = useMemo(
    () =>
      [...items].sort((left, right) => {
        const leftYear = left.isCurrent ? 9999 : Number(left.endYear || left.startYear || 0);
        const rightYear = right.isCurrent ? 9999 : Number(right.endYear || right.startYear || 0);
        return rightYear - leftYear;
      }),
    [items]
  );

  const reset = () => {
    setForm(EMPTY_EDUCATION);
    setEditingId("");
    setAdding(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await onSave(editingId, form);
      reset();
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="surface-card p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-2xl font-bold text-slate-950">Education</h3>
          <p className="mt-1 text-sm text-slate-500">Add degrees, certifications, or professional training.</p>
        </div>
        <button type="button" onClick={() => { setAdding(true); setEditingId(""); setForm(EMPTY_EDUCATION); }} className="btn-secondary">
          Add Education
        </button>
      </div>

      {(adding || editingId) ? (
        <form onSubmit={handleSubmit} className="rounded-[28px] border border-cyan-100 bg-cyan-50/70 p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-shell">Degree</label>
              <input className="input-shell" value={form.degree} onChange={(event) => setForm((current) => ({ ...current, degree: event.target.value }))} required />
            </div>
            <div>
              <label className="label-shell">Field of Study</label>
              <input className="input-shell" value={form.fieldOfStudy} onChange={(event) => setForm((current) => ({ ...current, fieldOfStudy: event.target.value }))} />
            </div>
            <div className="sm:col-span-2">
              <label className="label-shell">Institution</label>
              <input className="input-shell" value={form.institution} onChange={(event) => setForm((current) => ({ ...current, institution: event.target.value }))} required />
            </div>
            <div>
              <label className="label-shell">Grade / CGPA</label>
              <input className="input-shell" value={form.grade} onChange={(event) => setForm((current) => ({ ...current, grade: event.target.value }))} />
            </div>
            <div className="flex items-center gap-3 pt-8">
              <input id="current-education" type="checkbox" checked={form.isCurrent} onChange={(event) => setForm((current) => ({ ...current, isCurrent: event.target.checked }))} className="h-4 w-4 rounded border-slate-300 text-cyan-600" />
              <label htmlFor="current-education" className="text-sm font-medium text-slate-700">Currently studying here</label>
            </div>
            <div>
              <label className="label-shell">Start Year</label>
              <input type="number" className="input-shell" value={form.startYear} onChange={(event) => setForm((current) => ({ ...current, startYear: event.target.value }))} />
            </div>
            <div>
              <label className="label-shell">End Year</label>
              <input type="number" className="input-shell" disabled={form.isCurrent} value={form.endYear} onChange={(event) => setForm((current) => ({ ...current, endYear: event.target.value }))} />
            </div>
            <div className="sm:col-span-2">
              <label className="label-shell">Description</label>
              <textarea rows={4} className="input-shell resize-none" value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} />
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="submit" disabled={saving} className="btn-primary disabled:opacity-70">
              {saving ? "Saving..." : editingId ? "Update Education" : "Save Education"}
            </button>
            <button type="button" onClick={reset} className="btn-secondary">Cancel</button>
          </div>
        </form>
      ) : null}

      <div className="mt-5 space-y-4">
        {sortedItems.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
            No education added yet.
          </div>
        ) : (
          sortedItems.map((item) => (
            <div key={item._id} className="rounded-[26px] border border-slate-200 bg-white p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h4 className="text-lg font-bold text-slate-950">{item.degree}</h4>
                  <p className="mt-1 text-sm font-medium text-slate-600">
                    {[item.fieldOfStudy, item.institution].filter(Boolean).join(" at ")}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    {[item.startYear, item.isCurrent ? "Present" : item.endYear].filter(Boolean).join(" - ")}
                    {item.grade ? ` | ${item.grade}` : ""}
                  </p>
                  {item.description ? <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-600">{item.description}</p> : null}
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => { setEditingId(item._id); setAdding(false); setForm(toEducationForm(item)); }} className="btn-secondary px-4 py-2">
                    Edit
                  </button>
                  <button type="button" onClick={() => onDelete(item._id)} className="rounded-[16px] border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default function CareersPage() {
  const apiBase = resolvePublicApiBase();
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobsError, setJobsError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [selectedLocationMode, setSelectedLocationMode] = useState("all");
  const [experienceFloor, setExperienceFloor] = useState("");
  const [selectedJobId, setSelectedJobId] = useState("");
  const [selectedJobDetail, setSelectedJobDetail] = useState(null);
  const [jobDetailLoading, setJobDetailLoading] = useState(false);
  const [activePane, setActivePane] = useState("details");
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [applyOpen, setApplyOpen] = useState(false);
  const [flash, setFlash] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const [applicant, setApplicant] = useState(() => {
    try {
      const rawValue = localStorage.getItem(USER_KEY);
      return rawValue ? JSON.parse(rawValue) : null;
    } catch {
      return null;
    }
  });
  const [profile, setProfile] = useState(null);
  const [profileCompletion, setProfileCompletion] = useState(null);
  const [applications, setApplications] = useState([]);
  const [workspaceLoading, setWorkspaceLoading] = useState(false);

  const [basicForm, setBasicForm] = useState(createBasicForm(null));
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [skillLevel, setSkillLevel] = useState("Intermediate");
  const [linksForm, setLinksForm] = useState(createLinksForm(null));
  const [compensationForm, setCompensationForm] = useState(createCompensationForm(null));
  const [profileSaving, setProfileSaving] = useState("");
  const [uploadingAsset, setUploadingAsset] = useState("");

  const announce = (message, tone = "info") => {
    setFlash({ message, tone });
  };

  useEffect(() => {
    if (!flash) return undefined;
    const timeout = window.setTimeout(() => setFlash(null), 4500);
    return () => window.clearTimeout(timeout);
  }, [flash]);

  useEffect(() => {
    document.documentElement.classList.add("page-scrollbar-hidden");
    document.body.classList.add("page-scrollbar-hidden");

    return () => {
      document.documentElement.classList.remove("page-scrollbar-hidden");
      document.body.classList.remove("page-scrollbar-hidden");
    };
  }, []);

  const apiRequest = async (path, { method = "GET", body, token: requestToken = "" } = {}) => {
    const headers = {};
    const isFormData = body instanceof FormData;

    if (requestToken) {
      headers.Authorization = `Bearer ${requestToken}`;
    }

    if (body && !isFormData) {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(`${apiBase}${path}`, {
      method,
      headers,
      body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
    });

    let payload = {};
    try {
      payload = await response.json();
    } catch {
      payload = {};
    }

    if (!response.ok) {
      const error = new Error(extractMessage(payload, "Something went wrong."));
      error.payload = payload;
      throw error;
    }

    return payload;
  };

  const syncProfileState = (nextApplicant, completionData = null) => {
    setProfile(nextApplicant);
    setProfileCompletion(completionData);
    setBasicForm(createBasicForm(nextApplicant));
    setSummary(nextApplicant?.summary || "");
    setSkills(nextApplicant?.skills || []);
    setLinksForm(createLinksForm(nextApplicant));
    setCompensationForm(createCompensationForm(nextApplicant));

    if (nextApplicant) {
      const nextUser = {
        _id: nextApplicant._id,
        firstName: nextApplicant.firstName,
        lastName: nextApplicant.lastName,
        email: nextApplicant.email,
        mobile: nextApplicant.mobile,
        isEmailVerified: nextApplicant.isEmailVerified,
      };
      setApplicant(nextUser);
      localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    }
  };

  const clearSession = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken("");
    setApplicant(null);
    setProfile(null);
    setProfileCompletion(null);
    setApplications([]);
    setActivePane("details");
  };

  const loadApplicantWorkspace = async (tokenValue, lightweightApplicant = null) => {
    try {
      setWorkspaceLoading(true);
      const [profileData, applicationData] = await Promise.all([
        apiRequest("/api/public/applicant/profile", { token: tokenValue }),
        apiRequest("/api/public/applicant/my-applications", { token: tokenValue }),
      ]);

      syncProfileState(profileData.applicant, profileData.completion || null);
      setApplications(applicationData.applications || []);
      if (lightweightApplicant) {
        setApplicant((current) => current || lightweightApplicant);
      }
      return { profileData, applicationData };
    } catch (error) {
      clearSession();
      throw error;
    } finally {
      setWorkspaceLoading(false);
    }
  };

  const handleAuthSuccess = async (nextToken, nextApplicant, message) => {
    localStorage.setItem(TOKEN_KEY, nextToken);
    localStorage.setItem(USER_KEY, JSON.stringify(nextApplicant));
    setToken(nextToken);
    setApplicant(nextApplicant);
    await loadApplicantWorkspace(nextToken, nextApplicant);
    announce(message, "success");
  };

  const refreshApplications = async (tokenValue = token) => {
    if (!tokenValue) return;
    const data = await apiRequest("/api/public/applicant/my-applications", { token: tokenValue });
    setApplications(data.applications || []);
  };

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    const fetchJobs = async () => {
      try {
        setJobsLoading(true);
        setJobsError("");
        const response = await fetch(`${apiBase}/api/public/resource-gateway/jobs?limit=100`, {
          signal: controller.signal,
        });

        let payload = {};
        try {
          payload = await response.json();
        } catch {
          payload = {};
        }

        if (!response.ok) {
          throw new Error(extractMessage(payload, "Unable to load careers right now."));
        }

        if (!active) return;
        const nextJobs = Array.isArray(payload.jobs) ? payload.jobs : [];
        setJobs(nextJobs);
        setSelectedJobId((current) => current || nextJobs[0]?._id || "");
      } catch (error) {
        if (!active || error.name === "AbortError") return;
        setJobsError(error.message || "Unable to load careers right now.");
      } finally {
        if (active) {
          setJobsLoading(false);
        }
      }
    };

    fetchJobs();
    return () => {
      active = false;
      controller.abort();
    };
  }, [apiBase]);

  useEffect(() => {
    if (!token) return;
    loadApplicantWorkspace(token).catch(() => {
      announce("Your session expired. Please sign in again.", "error");
    });
  }, []);

  const profileSkillNames = useMemo(
    () =>
      skills
        .map((skill) => String(skill?.name || "").trim())
        .filter(Boolean),
    [skills]
  );

  const departmentOptions = useMemo(
    () => getUniqueValues(jobs.map((job) => job.roleDetails?.department || "General")),
    [jobs]
  );

  const jobTypeOptions = useMemo(
    () => {
      const derivedTypes = getUniqueValues(jobs.map((job) => job.roleDetails?.employmentType || "Full-time"));
      return derivedTypes.length ? derivedTypes : JOB_TYPES.filter((item) => item !== "Remote");
    },
    [jobs]
  );

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return jobs.filter((job) => {
      const jobDepartment = job.roleDetails?.department || "General";
      const jobType = job.roleDetails?.employmentType || "Full-time";
      const locationMode = getLocationMode(job.requirements?.location);
      const experienceCeiling = Number(job.requirements?.experienceMax || job.requirements?.experienceMin || 0);

      const matchesQuery = !query || [
        job.publicJobTitle,
        job.roleDetails?.title,
        job.roleDetails?.department,
        job.companyId?.name,
        job.client,
        job.publicJobDescription,
        ...getJobSkills(job),
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);

      const matchesDepartment = selectedDepartments.length === 0 || selectedDepartments.includes(jobDepartment);
      const matchesJobType = selectedJobTypes.length === 0 || selectedJobTypes.includes(jobType);
      const matchesLocation = selectedLocationMode === "all" || selectedLocationMode === locationMode;
      const matchesExperience = !experienceFloor || experienceCeiling >= Number(experienceFloor);

      return matchesQuery && matchesDepartment && matchesJobType && matchesLocation && matchesExperience;
    });
  }, [experienceFloor, jobs, search, selectedDepartments, selectedJobTypes, selectedLocationMode]);

  useEffect(() => {
    if (filteredJobs.length === 0) {
      setSelectedJobId("");
      setSelectedJobDetail(null);
      return;
    }

    if (!filteredJobs.some((job) => job._id === selectedJobId)) {
      setSelectedJobId(filteredJobs[0]._id);
    }
  }, [filteredJobs, selectedJobId]);

  useEffect(() => {
    if (!selectedJobId) {
      setSelectedJobDetail(null);
      return;
    }

    let active = true;
    const controller = new AbortController();

    const fetchJobDetail = async () => {
      try {
        setJobDetailLoading(true);
        const response = await fetch(`${apiBase}/api/public/resource-gateway/jobs/${selectedJobId}`, {
          signal: controller.signal,
        });
        const payload = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(extractMessage(payload, "Unable to load full role details."));
        }
        if (!active) return;
        setSelectedJobDetail(payload.job || null);
      } catch (error) {
        if (!active || error.name === "AbortError") return;
        announce(error.message, "error");
      } finally {
        if (active) {
          setJobDetailLoading(false);
        }
      }
    };

    fetchJobDetail();

    return () => {
      active = false;
      controller.abort();
    };
  }, [selectedJobId, apiBase]);

  const selectedJob = selectedJobDetail?._id === selectedJobId
    ? selectedJobDetail
    : filteredJobs.find((job) => job._id === selectedJobId) || null;

  const appliedJobIds = useMemo(
    () => new Set(applications.map((application) => application.hiringRequestId?._id).filter(Boolean)),
    [applications]
  );

  const alreadyApplied = selectedJob?._id ? appliedJobIds.has(selectedJob._id) : false;

  const handleProtectedPane = (pane) => {
    if (!token && pane !== "details") {
      setAuthMode("login");
      setAuthOpen(true);
      return;
    }
    setActivePane(pane);
    if (pane !== "details") {
      setWorkspaceOpen(true);
    }
  };

  const saveProfileResponse = (payload, successMessage) => {
    syncProfileState(payload.applicant, payload.completion || null);
    announce(payload.message || successMessage, "success");
  };

  const handleBasicSave = async () => {
    try {
      setProfileSaving("basic");
      const payload = await apiRequest("/api/public/applicant/profile/basic", {
        method: "PUT",
        token,
        body: {
          ...basicForm,
          preferredLocations: normalizeCommaList(basicForm.preferredLocationsText, 3),
          preferredDepartments: normalizeCommaList(basicForm.preferredDepartmentsText),
        },
      });
      saveProfileResponse(payload, "Basic profile updated.");
    } catch (error) {
      announce(error.message, "error");
    } finally {
      setProfileSaving("");
    }
  };

  const handleSummarySave = async () => {
    try {
      setProfileSaving("summary");
      const payload = await apiRequest("/api/public/applicant/profile/summary", {
        method: "PUT",
        token,
        body: { summary },
      });
      saveProfileResponse(payload, "Summary updated.");
    } catch (error) {
      announce(error.message, "error");
    } finally {
      setProfileSaving("");
    }
  };

  const handleSkillsSave = async () => {
    try {
      setProfileSaving("skills");
      const payload = await apiRequest("/api/public/applicant/profile/skills", {
        method: "PUT",
        token,
        body: { skills },
      });
      saveProfileResponse(payload, "Skills updated.");
    } catch (error) {
      announce(error.message, "error");
    } finally {
      setProfileSaving("");
    }
  };

  const handleLinksSave = async () => {
    try {
      setProfileSaving("links");
      const payload = await apiRequest("/api/public/applicant/profile/links", {
        method: "PUT",
        token,
        body: {
          ...linksForm,
          otherLinks: (linksForm.otherLinks || []).filter((item) => item.label?.trim() && item.url?.trim()),
        },
      });
      saveProfileResponse(payload, "Links updated.");
    } catch (error) {
      announce(error.message, "error");
    } finally {
      setProfileSaving("");
    }
  };

  const handleCompensationSave = async () => {
    try {
      setProfileSaving("compensation");
      const payload = await apiRequest("/api/public/applicant/profile/compensation", {
        method: "PUT",
        token,
        body: compensationForm,
      });
      saveProfileResponse(payload, "Compensation updated.");
    } catch (error) {
      announce(error.message, "error");
    } finally {
      setProfileSaving("");
    }
  };

  const handleExperienceSave = async (experienceId, value) => {
    try {
      const payload = await apiRequest(
        experienceId ? `/api/public/applicant/profile/experience/${experienceId}` : "/api/public/applicant/profile/experience",
        {
          method: experienceId ? "PUT" : "POST",
          token,
          body: value,
        }
      );
      saveProfileResponse(payload, experienceId ? "Experience updated." : "Experience added.");
    } catch (error) {
      announce(error.message, "error");
      throw error;
    }
  };

  const handleExperienceDelete = async (experienceId) => {
    if (!window.confirm("Delete this experience entry?")) return;
    try {
      const payload = await apiRequest(`/api/public/applicant/profile/experience/${experienceId}`, {
        method: "DELETE",
        token,
      });
      saveProfileResponse(payload, "Experience deleted.");
    } catch (error) {
      announce(error.message, "error");
    }
  };

  const handleEducationSave = async (educationId, value) => {
    try {
      const payload = await apiRequest(
        educationId ? `/api/public/applicant/profile/education/${educationId}` : "/api/public/applicant/profile/education",
        {
          method: educationId ? "PUT" : "POST",
          token,
          body: value,
        }
      );
      saveProfileResponse(payload, educationId ? "Education updated." : "Education added.");
    } catch (error) {
      announce(error.message, "error");
      throw error;
    }
  };

  const handleEducationDelete = async (educationId) => {
    if (!window.confirm("Delete this education entry?")) return;
    try {
      const payload = await apiRequest(`/api/public/applicant/profile/education/${educationId}`, {
        method: "DELETE",
        token,
      });
      saveProfileResponse(payload, "Education deleted.");
    } catch (error) {
      announce(error.message, "error");
    }
  };

  const handleUploadAsset = async (path, fieldName, file, successMessage) => {
    if (!file) return;

    try {
      setUploadingAsset(fieldName);
      const payload = new FormData();
      payload.append(fieldName, file);
      const data = await apiRequest(path, {
        method: "POST",
        token,
        body: payload,
      });
      saveProfileResponse(data, successMessage);
    } catch (error) {
      announce(error.message, "error");
    } finally {
      setUploadingAsset("");
    }
  };

  const handleLogout = () => {
    clearSession();
    announce("Signed out successfully.", "success");
  };

  const addSkill = (value, level = "Intermediate") => {
    const normalized = String(value || "").trim();
    if (!normalized) return;
    if (skills.some((skill) => skill.name.toLowerCase() === normalized.toLowerCase())) return;
    setSkills((current) => [...current, { name: normalized, level }]);
    setNewSkill("");
  };

  const scrollToJobs = () => {
    document.getElementById("careers-job-board")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openJobDialog = (jobId) => {
    setSelectedJobId(jobId);
    setApplyOpen(true);
  };

  const toggleFilterValue = (setter, value) => {
    setter((current) => (current.includes(value) ? current.filter((item) => item !== value) : [...current, value]));
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedDepartments([]);
    setSelectedJobTypes([]);
    setSelectedLocationMode("all");
    setExperienceFloor("");
  };

  const mustHaveSkills = selectedJob?.requirements?.mustHaveSkills || {};
  const allMustHaveSkills = [
    ...(mustHaveSkills.technical || []),
    ...(mustHaveSkills.softSkills || []),
  ];
  const remoteRolesCount = jobs.filter((job) => getLocationMode(job.requirements?.location) === "remote").length;
  const matchedRolesCount = jobs.filter((job) => {
    if (profileSkillNames.length === 0) return false;
    const jobSkills = getJobSkills(job).map((skill) => skill.toLowerCase());
    return profileSkillNames.some((skill) => jobSkills.includes(skill.toLowerCase()));
  }).length;
  const activeFilterCount =
    selectedDepartments.length +
    selectedJobTypes.length +
    (selectedLocationMode !== "all" ? 1 : 0) +
    (experienceFloor ? 1 : 0) +
    (search ? 1 : 0);

  return (
    <main className="bg-[linear-gradient(180deg,#f3fbff_0%,#edf5fb_38%,#f8fafc_100%)] pt-24 md:pt-28">
      <section className="px-4 pb-6 md:px-6">
        <div className="container">
          <div className="overflow-hidden rounded-[36px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(247,250,252,0.98))] shadow-[0_30px_90px_rgba(15,23,42,0.12)]">
            <div className="grid xl:grid-cols-[minmax(0,1.15fr)_390px]">
              <div className="bg-[radial-gradient(circle_at_top_left,rgba(103,232,249,0.18),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,255,255,0.94))] p-6 md:p-8">
                <p className="section-kicker">Resource Gateway Careers</p>
                <h1 className="mt-4 max-w-2xl text-[1.55rem] font-black leading-[1.04] text-slate-900 md:text-[2.2rem]">
                  Explore open positions, compare opportunities, and apply with confidence.
                </h1>
                <p className="mt-3 max-w-xl text-[13px] leading-6 text-slate-600">
                  Discover current openings, narrow them with smart filters, and move from job search to application in one streamlined experience.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button type="button" onClick={scrollToJobs} className="btn-primary">
                    Explore Opportunities
                  </button>
                  {token ? (
                    <>
                      <button type="button" onClick={() => handleProtectedPane("applications")} className="btn-secondary">
                        My Applications
                      </button>
                      <button type="button" onClick={() => handleProtectedPane("profile")} className="btn-secondary">
                        My Profile
                      </button>
                    </>
                  ) : (
                    <>
                      <button type="button" onClick={() => { setAuthMode("login"); setAuthOpen(true); }} className="btn-secondary">
                        Applicant Sign In
                      </button>
                      <button type="button" onClick={() => { setAuthMode("register"); setAuthOpen(true); }} className="btn-secondary">
                        Join Now
                      </button>
                    </>
                  )}
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[18px] border border-cyan-100 bg-cyan-50/80 px-4 py-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-700">Live Roles</p>
                    <div className="mt-2 flex items-end gap-2">
                      <span className="text-[2rem] font-black text-slate-900">{jobs.length}</span>
                      <span className="pb-1 text-xs text-slate-500">open now</span>
                    </div>
                  </div>
                  <div className="rounded-[18px] border border-slate-200 bg-white/80 px-4 py-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">Remote Friendly</p>
                    <div className="mt-2 flex items-end gap-2">
                      <span className="text-[2rem] font-black text-slate-900">{remoteRolesCount}</span>
                      <span className="pb-1 text-xs text-slate-500">remote roles</span>
                    </div>
                  </div>
                  <div className="rounded-[18px] border border-slate-200 bg-white/80 px-4 py-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">Departments</p>
                    <div className="mt-2 flex items-end gap-2">
                      <span className="text-[2rem] font-black text-slate-900">{departmentOptions.length}</span>
                      <span className="pb-1 text-xs text-slate-500">teams hiring</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 bg-slate-50/85 p-6 md:p-7 xl:border-l xl:border-t-0">
                <div className="rounded-[24px] border border-white/80 bg-white/90 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Applicant Workspace</p>
                        <h2 className="mt-3 text-[1.45rem] font-black leading-tight text-slate-950">
                          {token ? `Welcome back, ${applicant?.firstName || "Applicant"}` : "Ready to apply?"}
                        </h2>
                        <p className="mt-3 text-[13px] leading-6 text-slate-600">
                          {token
                            ? `${applicant?.email || ""} is connected here. Your applications, resume, and profile stay synced.`
                            : "Create an applicant account once, then reuse your profile and track every application from this page."}
                        </p>
                      </div>
                      {token ? (
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-[14px] border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50"
                        >
                          Sign Out
                        </button>
                      ) : null}
                    </div>

                    {token ? (
                      <div className="grid grid-cols-3 gap-2.5">
                        <div className="rounded-[18px] border border-slate-200 bg-slate-50 px-3 py-3.5 text-center">
                          <div className="flex min-h-[28px] items-start justify-center">
                            <p className="text-[10px] font-semibold tracking-[0.04em] text-slate-500 leading-tight">Applications</p>
                          </div>
                          <p className="mt-2.5 text-[1.75rem] leading-none font-black text-slate-900">{applications.length}</p>
                        </div>
                        <div className="rounded-[18px] border border-slate-200 bg-slate-50 px-3 py-3.5 text-center">
                          <div className="flex min-h-[28px] items-start justify-center">
                            <p className="text-[10px] font-semibold tracking-[0.04em] text-slate-500 leading-tight">Profile</p>
                          </div>
                          <p className="mt-2.5 text-[1.75rem] leading-none font-black text-slate-900">{profileCompletion?.score || 0}%</p>
                        </div>
                        <div className="rounded-[18px] border border-slate-200 bg-slate-50 px-3 py-3.5 text-center">
                          <div className="flex min-h-[28px] items-start justify-center">
                            <p className="text-[10px] font-semibold tracking-[0.04em] text-slate-500 leading-tight">Skill Matches</p>
                          </div>
                          <p className="mt-2.5 text-[1.75rem] leading-none font-black text-slate-900">{matchedRolesCount}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 rounded-[20px] border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-start gap-3">
                          <div className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-500" />
                          <p className="text-[13px] leading-6 text-slate-600">TalentCIO handles account creation and secure sign-in behind the scenes.</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-500" />
                          <p className="text-[13px] leading-6 text-slate-600">Your saved resume and profile details can be reused across future applications.</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-500" />
                          <p className="text-[13px] leading-6 text-slate-600">Application status tracking stays linked to the same applicant account.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-cyan-100 bg-[linear-gradient(90deg,#58c8f4_0%,#35a9db_45%,#2394ca_100%)] px-5 py-5 md:px-8">
              <div className="flex justify-start">
                <div className="w-full max-w-xl">
                  <label className="text-xs font-bold uppercase tracking-[0.22em] text-white/80">Search roles</label>
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="UI/UX Designer, React, remote, marketing..."
                    className="mt-2 w-full rounded-[18px] border border-white/60 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-white/40"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 md:px-6">
        <div className="container">
          {flash ? (
            <div className={`mb-6 rounded-[24px] border px-5 py-4 text-sm font-medium ${
              flash.tone === "error"
                ? "border-red-200 bg-red-50 text-red-700"
                : flash.tone === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-cyan-200 bg-cyan-50 text-cyan-700"
            }`}>
              {flash.message}
            </div>
          ) : null}

          {jobsLoading ? (
            <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
              <div className="h-[32rem] animate-pulse rounded-[30px] bg-white shadow-[var(--shadow-card)]" />
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="h-56 animate-pulse rounded-[28px] bg-white shadow-[var(--shadow-card)]" />
                ))}
              </div>
            </div>
          ) : jobsError ? (
            <div className="rounded-[28px] border border-red-100 bg-red-50 px-6 py-10 text-center text-red-700 shadow-[var(--shadow-card)]">
              {jobsError}
            </div>
          ) : (
            <div id="careers-job-board" className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
              <aside className="space-y-5 xl:sticky xl:top-28 xl:h-fit">
                <div className="rounded-[30px] border border-white/80 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Filter by</p>
                      <h2 className="mt-2 text-2xl font-bold text-slate-900">Find your fit</h2>
                    </div>
                    {activeFilterCount ? (
                      <button type="button" onClick={clearFilters} className="text-sm font-semibold text-cyan-700 hover:underline">
                        Clear
                      </button>
                    ) : null}
                  </div>

                  <div className="mt-6">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Location setup</p>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {[
                        ["all", "All"],
                        ["remote", "Remote"],
                        ["hybrid", "Hybrid"],
                        ["onsite", "Onsite"],
                      ].map(([value, label]) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setSelectedLocationMode(value)}
                          className={`rounded-[16px] border px-3 py-2 text-sm font-semibold transition ${
                            selectedLocationMode === value
                              ? "border-cyan-300 bg-cyan-50 text-cyan-700"
                              : "border-slate-200 bg-slate-50 text-slate-600 hover:border-cyan-200"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Minimum experience</label>
                    <select
                      className="mt-3 input-shell"
                      value={experienceFloor}
                      onChange={(event) => setExperienceFloor(event.target.value)}
                    >
                      <option value="">Any level</option>
                      <option value="1">1+ years</option>
                      <option value="3">3+ years</option>
                      <option value="5">5+ years</option>
                      <option value="8">8+ years</option>
                    </select>
                  </div>

                  <div className="mt-6">
                    <label className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Departments</label>
                    <select
                      className="mt-3 input-shell"
                      value={selectedDepartments[0] || ""}
                      onChange={(event) => setSelectedDepartments(event.target.value ? [event.target.value] : [])}
                    >
                      <option value="">All departments</option>
                      {departmentOptions.map((department) => (
                        <option key={department} value={department}>
                          {department}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-6">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Job type</p>
                    <div className="mt-3 space-y-2">
                      {jobTypeOptions.slice(0, 6).map((jobType) => (
                        <label key={jobType} className="flex items-center justify-between gap-3 rounded-[16px] border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                          <span>{jobType}</span>
                          <input
                            type="checkbox"
                            checked={selectedJobTypes.includes(jobType)}
                            onChange={() => toggleFilterValue(setSelectedJobTypes, jobType)}
                            className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-[30px] border border-cyan-100 bg-[linear-gradient(180deg,rgba(236,253,255,0.95),rgba(240,249,255,0.95))] p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">Applicant access</p>
                  <h3 className="mt-2 text-xl font-bold text-slate-900">
                    {token ? "Your profile is linked" : "Apply faster with an account"}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {token
                      ? `Resume on file: ${profile?.resumeFileName || "not uploaded yet"}. Use the right panel to keep your profile updated.`
                      : "Signing in gives you saved applications, one-click profile reuse, and TalentCIO applicant tracking from the same page."}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        if (token) {
                          handleProtectedPane("profile");
                          return;
                        }
                        setAuthMode("login");
                        setAuthOpen(true);
                      }}
                      className="btn-secondary"
                    >
                      {token ? "Open My Profile" : "Sign In to Apply"}
                    </button>
                    {token ? (
                      <button type="button" onClick={() => handleProtectedPane("applications")} className="btn-secondary">
                        View Applications
                      </button>
                    ) : null}
                  </div>
                </div>
              </aside>

              <div className="space-y-4">
                <div className="flex flex-col gap-3 rounded-[26px] border border-white/80 bg-white px-5 py-4 shadow-[0_16px_40px_rgba(15,23,42,0.06)] md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Active roles</p>
                    <h2 className="mt-1 text-2xl font-bold text-slate-900">
                      Showing {filteredJobs.length} of {jobs.length} opportunities
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeFilterCount ? (
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                        {activeFilterCount} active filter{activeFilterCount === 1 ? "" : "s"}
                      </span>
                    ) : null}
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                      TalentCIO-powered applications
                    </span>
                  </div>
                </div>

                {filteredJobs.length === 0 ? (
                  <div className="rounded-[32px] border border-slate-200 bg-white px-6 py-14 text-center shadow-[var(--shadow-card)]">
                    <h2 className="text-2xl font-bold text-slate-900">No roles match your current filters.</h2>
                    <p className="mt-3 text-slate-500">Try clearing a few filters or broadening the search keywords.</p>
                    <button type="button" onClick={clearFilters} className="btn-secondary mt-6">
                      Clear Filters
                    </button>
                  </div>
                ) : filteredJobs.map((job, index) => {
                  const employmentType = job.roleDetails?.employmentType || "Full-time";
                  const locationLabel = job.requirements?.location || "Flexible";
                  const previewSkills = getJobSkills(job, 4);
                  const profileMatches = profileSkillNames.filter((skill) =>
                    getJobSkills(job).map((item) => item.toLowerCase()).includes(skill.toLowerCase())
                  ).length;
                  const employmentBadgeClass =
                    employmentType.toLowerCase().includes("part")
                      ? "bg-rose-50 text-rose-600"
                      : employmentType.toLowerCase().includes("contract") || employmentType.toLowerCase().includes("freelance")
                        ? "bg-amber-50 text-amber-700"
                        : "bg-emerald-50 text-emerald-700";

                  return (
                    <motion.div
                      key={job._id}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className="w-full rounded-[28px] border border-white/80 bg-white p-6 text-left shadow-[0_16px_40px_rgba(15,23,42,0.08)] transition-all hover:-translate-y-0.5 hover:border-cyan-200"
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div className="min-w-0">
                          <p className="text-xs font-medium tracking-[0.12em] text-slate-400">{formatRelativePosted(job.createdAt)}</p>
                          <h2 className="mt-2 text-2xl font-bold text-slate-900">{job.publicJobTitle || job.roleDetails?.title}</h2>
                          <p className="mt-2 text-sm font-medium text-slate-600">
                            {getJobCompanyLabel(job)} <span className="text-slate-300">|</span> {locationLabel}
                          </p>
                        </div>
                        <span className={`inline-flex rounded-full px-4 py-1.5 text-xs font-bold ${employmentBadgeClass}`}>
                          {employmentType}
                        </span>
                      </div>

                      <p className="mt-4 text-sm leading-7 text-slate-600">
                        {trimText(job.publicJobDescription, 200) || "View the full role details to learn more about this opportunity."}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {previewSkills.length ? (
                          previewSkills.map((skill) => (
                            <span key={skill} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                              {skill}
                            </span>
                          ))
                        ) : (
                          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
                            Skills shared in full role details
                          </span>
                        )}
                      </div>

                      <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-wrap items-center gap-3 text-sm">
                          <button type="button" onClick={() => openJobDialog(job._id)} className="font-semibold text-cyan-700 transition hover:text-cyan-800">
                            {appliedJobIds.has(job._id) ? "View Applied Role" : "Apply Now"}
                          </button>
                          <span className="text-slate-400">{job.hiringDetails?.openPositions || 1} opening{(job.hiringDetails?.openPositions || 1) === 1 ? "" : "s"}</span>
                          {profileMatches ? (
                            <span className="text-emerald-600">{profileMatches} skill match{profileMatches === 1 ? "" : "es"}</span>
                          ) : null}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-semibold leading-none text-slate-700 shadow-sm">
                            {job.roleDetails?.department || "General"}
                          </span>
                          {(job.requirements?.experienceMin || job.requirements?.experienceMax) ? (
                            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-semibold leading-none text-slate-700 shadow-sm">
                              {job.requirements?.experienceMin || 0}-{job.requirements?.experienceMax || job.requirements?.experienceMin || 0} yrs
                            </span>
                          ) : null}
                          <button type="button" onClick={() => openJobDialog(job._id)} className="btn-primary px-4 py-2">
                            {appliedJobIds.has(job._id) ? "Open Details" : "Apply"}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <ModalFrame isOpen={workspaceOpen} onClose={() => setWorkspaceOpen(false)} maxWidth="max-w-6xl">
                <div className="overflow-hidden rounded-[30px] border border-white/80 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.1)]">
                  <div className="border-b border-slate-200 bg-slate-50/80 px-6 py-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <button type="button" onClick={() => handleProtectedPane("applications")} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activePane === "applications" ? "bg-slate-900 text-white" : "bg-white text-slate-600 hover:bg-slate-100"}`}>
                          My Applications
                        </button>
                        <button type="button" onClick={() => handleProtectedPane("profile")} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activePane === "profile" ? "bg-slate-900 text-white" : "bg-white text-slate-600 hover:bg-slate-100"}`}>
                          My Profile
                        </button>
                      </div>
                      <button type="button" onClick={() => setWorkspaceOpen(false)} className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-800">
                        Close
                      </button>
                    </div>
                  </div>

                  {activePane === "details" ? (
                    selectedJob ? (
                      <div className="p-7">
                        <p className="text-xs font-bold uppercase tracking-[0.26em] text-cyan-700">
                          {selectedJob.companyId?.name || selectedJob.client || "Hiring Partner"}
                        </p>
                        <h2 className="mt-3 text-3xl font-black text-slate-900">{selectedJob.publicJobTitle || selectedJob.roleDetails?.title}</h2>

                        <div className="mt-5 flex flex-wrap gap-2">
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                            {selectedJob.roleDetails?.employmentType || "Full-time"}
                          </span>
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                            {selectedJob.roleDetails?.department || "General"}
                          </span>
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                            {selectedJob.requirements?.location || "Flexible"}
                          </span>
                          {(selectedJob.requirements?.experienceMin || selectedJob.requirements?.experienceMax) ? (
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                              {selectedJob.requirements?.experienceMin || 0}-{selectedJob.requirements?.experienceMax || selectedJob.requirements?.experienceMin || 0} yrs
                            </span>
                          ) : null}
                        </div>

                        <div className="mt-6 grid gap-4 rounded-[24px] border border-slate-200 bg-slate-50 p-5 md:grid-cols-2">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Openings</p>
                            <p className="mt-2 text-lg font-bold text-slate-900">{selectedJob.hiringDetails?.openPositions || 1}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Published</p>
                            <p className="mt-2 text-lg font-bold text-slate-900">{formatDate(selectedJob.createdAt)}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Shift</p>
                            <p className="mt-2 text-lg font-bold text-slate-900">{selectedJob.requirements?.shift || "Standard"}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Budget</p>
                            <p className="mt-2 text-lg font-bold text-slate-900">
                              {formatBudgetRange(selectedJob.hiringDetails?.budgetRange)}
                            </p>
                          </div>
                        </div>

                        <div className="mt-6">
                          <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">Role Snapshot</h3>
                          <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
                            {selectedJob.publicJobDescription || selectedJob.jobDescription || "The hiring team has not added a public description for this role yet."}
                          </p>
                        </div>

                        {allMustHaveSkills.length ? (
                          <div className="mt-6">
                            <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">Must-Have Skills</h3>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {allMustHaveSkills.map((skill) => (
                                <span key={skill} className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        ) : null}

                        {selectedJob.requirements?.niceToHaveSkills?.length ? (
                          <div className="mt-6">
                            <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">Nice-to-Have Skills</h3>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {selectedJob.requirements.niceToHaveSkills.map((skill) => (
                                <span key={skill} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        ) : null}

                        {token && profileCompletion?.score < 60 ? (
                          <div className="mt-6 rounded-[24px] border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                            Your profile is {profileCompletion?.score || 0}% complete. Strengthening it will make applications richer for recruiters.
                          </div>
                        ) : null}

                        <div className="mt-8 flex flex-wrap gap-3">
                          <button type="button" onClick={() => setApplyOpen(true)} className="btn-primary">
                            {alreadyApplied ? "View Applied Role" : "Apply on Resource Gateway"}
                          </button>
                          {token ? (
                            <button type="button" onClick={() => handleProtectedPane("applications")} className="btn-secondary">
                              Track My Applications
                            </button>
                          ) : (
                            <button type="button" onClick={() => { setAuthMode("login"); setAuthOpen(true); }} className="btn-secondary">
                              Sign In First
                            </button>
                          )}
                        </div>

                        {jobDetailLoading ? <p className="mt-4 text-sm text-slate-400">Refreshing full job details...</p> : null}
                      </div>
                    ) : (
                      <div className="p-8 text-center text-slate-500">Select a role to see the full details.</div>
                    )
                  ) : null}

                  {activePane === "applications" ? (
                    !token ? (
                      <div className="p-7 text-center">
                        <p className="text-slate-600">Sign in to see the jobs you already applied for.</p>
                      </div>
                    ) : workspaceLoading ? (
                      <div className="p-7 text-slate-500">Loading your applications...</div>
                    ) : (
                      <div className="space-y-4 p-7">
                        <ProfileStrengthCard completion={profileCompletion} onOpenProfile={() => setActivePane("profile")} />
                        {applications.length === 0 ? (
                          <div className="rounded-[26px] border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
                            <h3 className="text-xl font-bold text-slate-900">No applications yet</h3>
                            <p className="mt-2 text-sm leading-7 text-slate-500">
                              Apply to any role from the list on the left and it will start appearing here.
                            </p>
                          </div>
                        ) : (
                          applications.map((application) => {
                            const job = application.hiringRequestId;
                            return (
                              <div key={application._id} className="rounded-[26px] border border-slate-200 bg-white p-5">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                  <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">
                                      {job?.companyId?.name || job?.client || "Hiring Partner"}
                                    </p>
                                    <h3 className="mt-2 text-xl font-bold text-slate-900">
                                      {job?.publicJobTitle || job?.roleDetails?.title || "Position"}
                                    </h3>
                                    <p className="mt-2 text-sm text-slate-500">
                                      Applied {formatDate(application.createdAt)} | {job?.requirements?.location || "Flexible"} | {job?.roleDetails?.employmentType || "Full-time"}
                                    </p>
                                  </div>
                                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                                    application.reviewStatus === "Shortlisted"
                                      ? "bg-sky-50 text-sky-700"
                                      : application.reviewStatus === "Rejected"
                                        ? "bg-red-50 text-red-700"
                                        : application.reviewStatus === "Transferred"
                                          ? "bg-emerald-50 text-emerald-700"
                                          : "bg-amber-50 text-amber-700"
                                  }`}>
                                    {application.reviewStatus}
                                  </span>
                                </div>
                                {job?._id ? (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setWorkspaceOpen(false);
                                      openJobDialog(job._id);
                                    }}
                                    className="mt-4 text-sm font-semibold text-cyan-700 hover:underline"
                                  >
                                    Open full role details
                                  </button>
                                ) : null}
                              </div>
                            );
                          })
                        )}
                      </div>
                    )
                  ) : null}

                  {activePane === "profile" ? (
                    !token ? (
                      <div className="p-7 text-center">
                        <p className="text-slate-600">Sign in to edit your profile.</p>
                      </div>
                    ) : workspaceLoading && !profile ? (
                      <div className="p-7 text-slate-500">Loading your profile...</div>
                    ) : (
                      <div className="space-y-6 p-7">
                        <ProfileStrengthCard completion={profileCompletion} onOpenProfile={() => {}} />

                        <section className="surface-card p-6">
                          <div className="mb-5 flex items-center justify-between gap-3">
                            <div>
                              <h3 className="text-2xl font-bold text-slate-950">Basic Info</h3>
                              <p className="mt-1 text-sm text-slate-500">This information powers your applications automatically.</p>
                            </div>
                            <button type="button" onClick={handleBasicSave} disabled={profileSaving === "basic"} className="btn-primary disabled:opacity-70">
                              {profileSaving === "basic" ? "Saving..." : "Save Basic Info"}
                            </button>
                          </div>

                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <label className="label-shell">First Name</label>
                              <input className="input-shell" value={basicForm.firstName} onChange={(event) => setBasicForm((current) => ({ ...current, firstName: event.target.value }))} />
                            </div>
                            <div>
                              <label className="label-shell">Last Name</label>
                              <input className="input-shell" value={basicForm.lastName} onChange={(event) => setBasicForm((current) => ({ ...current, lastName: event.target.value }))} />
                            </div>
                            <div>
                              <label className="label-shell">Mobile Number</label>
                              <input className="input-shell" value={basicForm.mobile} onChange={(event) => setBasicForm((current) => ({ ...current, mobile: event.target.value.replace(/\D/g, "").slice(0, 10) }))} />
                            </div>
                            <div>
                              <label className="label-shell">Professional Headline</label>
                              <input className="input-shell" value={basicForm.headline} onChange={(event) => setBasicForm((current) => ({ ...current, headline: event.target.value }))} />
                            </div>
                            <div>
                              <label className="label-shell">Current City</label>
                              <input className="input-shell" value={basicForm.currentCity} onChange={(event) => setBasicForm((current) => ({ ...current, currentCity: event.target.value }))} />
                            </div>
                            <div>
                              <label className="label-shell">Current State</label>
                              <input className="input-shell" value={basicForm.currentState} onChange={(event) => setBasicForm((current) => ({ ...current, currentState: event.target.value }))} />
                            </div>
                            <div>
                              <label className="label-shell">Current Country</label>
                              <input className="input-shell" value={basicForm.currentCountry} onChange={(event) => setBasicForm((current) => ({ ...current, currentCountry: event.target.value }))} />
                            </div>
                            <div>
                              <label className="label-shell">Total Experience (years)</label>
                              <input type="number" step="0.1" className="input-shell" value={basicForm.totalExperienceYears} onChange={(event) => setBasicForm((current) => ({ ...current, totalExperienceYears: event.target.value }))} />
                            </div>
                            <div>
                              <label className="label-shell">Job Search Status</label>
                              <select className="input-shell" value={basicForm.jobSearchStatus} onChange={(event) => setBasicForm((current) => ({ ...current, jobSearchStatus: event.target.value }))}>
                                {JOB_SEARCH_STATUSES.map((status) => (
                                  <option key={status} value={status}>{status}</option>
                                ))}
                              </select>
                            </div>
                            <div className="flex items-center gap-3 pt-8">
                              <input id="relocate" type="checkbox" checked={basicForm.willingToRelocate} onChange={(event) => setBasicForm((current) => ({ ...current, willingToRelocate: event.target.checked }))} className="h-4 w-4 rounded border-slate-300 text-cyan-600" />
                              <label htmlFor="relocate" className="text-sm font-medium text-slate-700">Willing to relocate</label>
                            </div>
                            <div className="sm:col-span-2">
                              <label className="label-shell">Preferred Locations</label>
                              <input className="input-shell" value={basicForm.preferredLocationsText} onChange={(event) => setBasicForm((current) => ({ ...current, preferredLocationsText: event.target.value }))} placeholder="Bengaluru, Hyderabad, Remote" />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="label-shell">Preferred Departments</label>
                              <input className="input-shell" value={basicForm.preferredDepartmentsText} onChange={(event) => setBasicForm((current) => ({ ...current, preferredDepartmentsText: event.target.value }))} placeholder="Engineering, Product, QA" />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="label-shell">Preferred Job Types</label>
                              <div className="flex flex-wrap gap-2">
                                {JOB_TYPES.map((jobType) => {
                                  const selected = basicForm.preferredJobTypes.includes(jobType);
                                  return (
                                    <button
                                      key={jobType}
                                      type="button"
                                      onClick={() => setBasicForm((current) => ({
                                        ...current,
                                        preferredJobTypes: selected
                                          ? current.preferredJobTypes.filter((item) => item !== jobType)
                                          : [...current.preferredJobTypes, jobType],
                                      }))}
                                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${selected ? "border-cyan-300 bg-cyan-50 text-cyan-700" : "border-slate-200 bg-white text-slate-600 hover:border-cyan-200 hover:text-cyan-700"}`}
                                    >
                                      {jobType}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </section>

                        <section className="surface-card p-6">
                          <div className="mb-5 flex items-center justify-between gap-3">
                            <div>
                              <h3 className="text-2xl font-bold text-slate-950">Career Summary</h3>
                              <p className="mt-1 text-sm text-slate-500">A short overview makes your applications more persuasive.</p>
                            </div>
                            <button type="button" onClick={handleSummarySave} disabled={profileSaving === "summary"} className="btn-primary disabled:opacity-70">
                              {profileSaving === "summary" ? "Saving..." : "Save Summary"}
                            </button>
                          </div>
                          <textarea rows={6} className="input-shell resize-none" value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Summarize your experience, domain strengths, and what roles you are targeting." />
                        </section>

                        <section className="surface-card p-6">
                          <div className="mb-5 flex items-center justify-between gap-3">
                            <div>
                              <h3 className="text-2xl font-bold text-slate-950">Skills</h3>
                              <p className="mt-1 text-sm text-slate-500">Keep your skill stack current so matching works better.</p>
                            </div>
                            <button type="button" onClick={handleSkillsSave} disabled={profileSaving === "skills"} className="btn-primary disabled:opacity-70">
                              {profileSaving === "skills" ? "Saving..." : "Save Skills"}
                            </button>
                          </div>

                          <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_200px_auto]">
                            <input className="input-shell" value={newSkill} onChange={(event) => setNewSkill(event.target.value)} placeholder="Add a skill" />
                            <select className="input-shell" value={skillLevel} onChange={(event) => setSkillLevel(event.target.value)}>
                              {["Beginner", "Intermediate", "Advanced", "Expert"].map((level) => (
                                <option key={level} value={level}>{level}</option>
                              ))}
                            </select>
                            <button type="button" onClick={() => addSkill(newSkill, skillLevel)} className="btn-secondary">
                              Add Skill
                            </button>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {POPULAR_SKILLS.map((skill) => (
                              <button key={skill} type="button" onClick={() => addSkill(skill)} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-cyan-200 hover:text-cyan-700">
                                {skill}
                              </button>
                            ))}
                          </div>

                          <div className="mt-5 flex flex-wrap gap-3">
                            {skills.length === 0 ? (
                              <p className="text-sm text-slate-500">No skills added yet.</p>
                            ) : (
                              skills.map((skill) => (
                                <div key={skill.name} className="flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-2">
                                  <span className="text-sm font-semibold text-cyan-700">{skill.name}</span>
                                  <select
                                    className="rounded-full border border-cyan-200 bg-white px-2 py-1 text-xs font-semibold text-slate-600"
                                    value={skill.level}
                                    onChange={(event) => setSkills((current) => current.map((item) => item.name === skill.name ? { ...item, level: event.target.value } : item))}
                                  >
                                    {["Beginner", "Intermediate", "Advanced", "Expert"].map((level) => (
                                      <option key={level} value={level}>{level}</option>
                                    ))}
                                  </select>
                                  <button type="button" onClick={() => setSkills((current) => current.filter((item) => item.name !== skill.name))} className="text-xs font-bold text-slate-400 hover:text-red-600">
                                    X
                                  </button>
                                </div>
                              ))
                            )}
                          </div>
                        </section>

                        <ExperienceManager items={profile?.workExperience || []} onSave={handleExperienceSave} onDelete={handleExperienceDelete} />
                        <EducationManager items={profile?.education || []} onSave={handleEducationSave} onDelete={handleEducationDelete} />

                        <section className="surface-card p-6">
                          <div className="mb-5 flex items-center justify-between gap-3">
                            <div>
                              <h3 className="text-2xl font-bold text-slate-950">Links & Compensation</h3>
                              <p className="mt-1 text-sm text-slate-500">Help recruiters understand your availability and public presence.</p>
                            </div>
                          </div>

                          <div className="grid gap-6 lg:grid-cols-2">
                            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                              <h4 className="text-lg font-bold text-slate-900">Compensation</h4>
                              <div className="mt-4 grid gap-4">
                                <div>
                                  <label className="label-shell">Current CTC (LPA)</label>
                                  <input type="number" className="input-shell" value={compensationForm.currentCTC} onChange={(event) => setCompensationForm((current) => ({ ...current, currentCTC: event.target.value }))} />
                                </div>
                                <div>
                                  <label className="label-shell">Expected CTC (LPA)</label>
                                  <input type="number" className="input-shell" value={compensationForm.expectedCTC} onChange={(event) => setCompensationForm((current) => ({ ...current, expectedCTC: event.target.value }))} />
                                </div>
                                <div>
                                  <label className="label-shell">Notice Period (days)</label>
                                  <input type="number" className="input-shell" value={compensationForm.noticePeriod} onChange={(event) => setCompensationForm((current) => ({ ...current, noticePeriod: event.target.value }))} />
                                </div>
                                <button type="button" onClick={handleCompensationSave} disabled={profileSaving === "compensation"} className="btn-primary disabled:opacity-70">
                                  {profileSaving === "compensation" ? "Saving..." : "Save Compensation"}
                                </button>
                              </div>
                            </div>

                            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                              <h4 className="text-lg font-bold text-slate-900">Links</h4>
                              <div className="mt-4 space-y-4">
                                <div>
                                  <label className="label-shell">LinkedIn URL</label>
                                  <input className="input-shell" value={linksForm.linkedinUrl} onChange={(event) => setLinksForm((current) => ({ ...current, linkedinUrl: event.target.value }))} />
                                </div>
                                <div>
                                  <label className="label-shell">GitHub URL</label>
                                  <input className="input-shell" value={linksForm.githubUrl} onChange={(event) => setLinksForm((current) => ({ ...current, githubUrl: event.target.value }))} />
                                </div>
                                <div>
                                  <label className="label-shell">Portfolio URL</label>
                                  <input className="input-shell" value={linksForm.portfolioUrl} onChange={(event) => setLinksForm((current) => ({ ...current, portfolioUrl: event.target.value }))} />
                                </div>

                                <div className="space-y-3">
                                  {linksForm.otherLinks.map((item, index) => (
                                    <div key={`${item.label}-${index}`} className="grid gap-3 sm:grid-cols-[160px_minmax(0,1fr)_auto]">
                                      <input className="input-shell" placeholder="Label" value={item.label} onChange={(event) => setLinksForm((current) => ({ ...current, otherLinks: current.otherLinks.map((entry, entryIndex) => entryIndex === index ? { ...entry, label: event.target.value } : entry) }))} />
                                      <input className="input-shell" placeholder="URL" value={item.url} onChange={(event) => setLinksForm((current) => ({ ...current, otherLinks: current.otherLinks.map((entry, entryIndex) => entryIndex === index ? { ...entry, url: event.target.value } : entry) }))} />
                                      <button type="button" onClick={() => setLinksForm((current) => ({ ...current, otherLinks: current.otherLinks.filter((_, entryIndex) => entryIndex !== index) }))} className="btn-secondary">
                                        Remove
                                      </button>
                                    </div>
                                  ))}
                                  {linksForm.otherLinks.length < 3 ? (
                                    <button type="button" onClick={() => setLinksForm((current) => ({ ...current, otherLinks: [...current.otherLinks, { label: "", url: "" }] }))} className="btn-secondary">
                                      Add Link
                                    </button>
                                  ) : null}
                                </div>

                                <button type="button" onClick={handleLinksSave} disabled={profileSaving === "links"} className="btn-primary disabled:opacity-70">
                                  {profileSaving === "links" ? "Saving..." : "Save Links"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </section>

                        <section className="surface-card p-6">
                          <div className="mb-5 flex items-center justify-between gap-3">
                            <div>
                              <h3 className="text-2xl font-bold text-slate-950">Resume & Photo</h3>
                              <p className="mt-1 text-sm text-slate-500">Your saved resume is reused when you apply from this page.</p>
                            </div>
                          </div>

                          <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
                            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 text-center">
                              <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-cyan-50 text-3xl font-bold text-cyan-700">
                                {profile?.profilePhotoUrl ? (
                                  <img src={profile.profilePhotoUrl} alt={applicant?.firstName || "Applicant"} className="h-full w-full object-cover" />
                                ) : (
                                  <span>{applicant?.firstName?.charAt(0)?.toUpperCase() || "A"}</span>
                                )}
                              </div>
                              <label className="btn-secondary mt-5 cursor-pointer">
                                {uploadingAsset === "photo" ? "Uploading..." : "Upload Photo"}
                                <input type="file" accept="image/*" className="hidden" onChange={(event) => handleUploadAsset("/api/public/applicant/profile/photo", "photo", event.target.files?.[0], "Profile photo updated.")} />
                              </label>
                            </div>

                            <div className="rounded-[28px] border border-slate-200 bg-white p-5">
                              <div className="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Saved Resume</p>
                                  <h4 className="mt-2 text-lg font-bold text-slate-950">{profile?.resumeFileName || "No resume uploaded yet"}</h4>
                                  <p className="mt-2 text-sm text-slate-500">
                                    {profile?.resumeUpdatedAt ? `Updated ${formatDate(profile.resumeUpdatedAt)}` : "Uploading a resume unlocks faster applications."}
                                  </p>
                                </div>
                                {profile?.resumeUrl ? (
                                  <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="btn-secondary">
                                    View Resume
                                  </a>
                                ) : null}
                              </div>

                              <label className="btn-primary mt-5 cursor-pointer">
                                {uploadingAsset === "resume" ? "Uploading..." : "Upload / Replace Resume"}
                                <input type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="hidden" onChange={(event) => handleUploadAsset("/api/public/applicant/profile/resume", "resume", event.target.files?.[0], "Resume uploaded.")} />
                              </label>
                            </div>
                          </div>
                        </section>
                      </div>
                    )
                  ) : null}
                </div>
              </ModalFrame>
            </div>
          )}
        </div>
      </section>

      <AuthDialog
        isOpen={authOpen}
        mode={authMode}
        onModeChange={setAuthMode}
        onClose={() => setAuthOpen(false)}
        apiRequest={apiRequest}
        onAuthSuccess={handleAuthSuccess}
        announce={announce}
      />

      <ApplyDialog
        isOpen={applyOpen}
        job={selectedJob}
        token={token}
        applicant={applicant}
        profile={profile}
        alreadyApplied={alreadyApplied}
        onClose={() => setApplyOpen(false)}
        onRequireAuth={(mode) => {
          setApplyOpen(false);
          setAuthMode(mode);
          setAuthOpen(true);
        }}
        onApplied={refreshApplications}
        onViewApplications={() => {
          setWorkspaceOpen(true);
          setActivePane("applications");
        }}
        apiRequest={apiRequest}
        announce={announce}
      />
    </main>
  );
}
