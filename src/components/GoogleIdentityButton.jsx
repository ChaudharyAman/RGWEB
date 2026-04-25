import { useEffect, useRef, useState } from "react";

const FALLBACK_GOOGLE_CLIENT_ID =
  "485252065297-kuf4ijabspu0manp3jvkdvlmsjjqa5th.apps.googleusercontent.com";

const GOOGLE_CLIENT_ID = String(
  import.meta.env.VITE_GOOGLE_CLIENT_ID || FALLBACK_GOOGLE_CLIENT_ID
).trim();

let googleScriptPromise = null;

const loadGoogleScript = () => {
  if (window.google?.accounts?.id) {
    return Promise.resolve(window.google);
  }

  if (googleScriptPromise) {
    return googleScriptPromise;
  }

  googleScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector('script[data-google-identity="true"]');

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(window.google), { once: true });
      existingScript.addEventListener("error", () => reject(new Error("Google sign-in is unavailable.")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.dataset.googleIdentity = "true";
    script.onload = () => resolve(window.google);
    script.onerror = () => reject(new Error("Google sign-in is unavailable."));
    document.head.appendChild(script);
  });

  return googleScriptPromise;
};

export default function GoogleIdentityButton({
  onCredential,
  text = "continue_with",
  disabled = false,
  className = "",
  width = 320,
}) {
  const containerRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || !containerRef.current) {
      return undefined;
    }

    let active = true;

    loadGoogleScript()
      .then((google) => {
        if (!active || !containerRef.current || !google?.accounts?.id) {
          return;
        }

        setError("");
        containerRef.current.innerHTML = "";

        google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: ({ credential }) => {
            if (credential) {
              onCredential?.(credential);
            }
          },
          ux_mode: "popup",
          auto_select: false,
        });

        google.accounts.id.renderButton(containerRef.current, {
          type: "standard",
          theme: "outline",
          size: "large",
          shape: "pill",
          text,
          width: Math.max(Math.min(containerRef.current.offsetWidth || width, width), 240),
        });
      })
      .catch((loadError) => {
        if (active) {
          setError(loadError.message || "Google sign-in is unavailable.");
        }
      });

    return () => {
      active = false;
    };
  }, [onCredential, text]);

  if (!GOOGLE_CLIENT_ID) {
    return null;
  }

  return (
    <div className={`${disabled ? "pointer-events-none opacity-60" : ""} ${className}`.trim()}>
      <div ref={containerRef} className="min-h-[44px] w-full" />
      {error ? <p className="mt-2 text-xs text-slate-500">{error}</p> : null}
    </div>
  );
}
