const normalizeUrl = (value) => String(value || '').trim().replace(/\/+$/, '');

export const resolvePublicApiBase = () => {
  const configured = normalizeUrl(import.meta.env.VITE_PUBLIC_API_URL);

  if (configured) {
    return configured;
  }

  if (typeof window !== 'undefined' && /^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname)) {
    return 'http://localhost:2000';
  }

  return 'https://api.talentcio.in';
};
