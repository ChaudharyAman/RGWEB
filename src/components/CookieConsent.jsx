import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Small delay so it slides in after page load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    } else if (consent === 'granted') {
      grantConsent();
    }
  }, []);

  const grantConsent = () => {
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted'
      });
    }
  };

  const dismiss = (callback) => {
    setAnimateOut(true);
    setTimeout(() => {
      setVisible(false);
      callback?.();
    }, 400);
  };

  const handleAccept = () => {
    dismiss(() => {
      localStorage.setItem('cookie-consent', 'granted');
      grantConsent();
    });
  };

  const handleDecline = () => {
    dismiss(() => {
      localStorage.setItem('cookie-consent', 'denied');
    });
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        left: 'auto',
        zIndex: 9999,
        maxWidth: '420px',
        width: 'calc(100% - 48px)',
        animation: animateOut
          ? 'consentSlideOut 0.4s ease-in forwards'
          : 'consentSlideIn 0.6s ease-out forwards',
      }}
    >
      {/* Inline keyframes */}
      <style>{`
        @keyframes consentSlideIn {
          from { opacity: 0; transform: translateY(30px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes consentSlideOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to   { opacity: 0; transform: translateY(30px) scale(0.96); }
        }
      `}</style>

      <div
        style={{
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '20px',
          border: '1px solid rgba(31, 182, 193, 0.15)',
          boxShadow: '0 20px 60px rgba(15, 23, 42, 0.12), 0 0 40px rgba(31, 182, 193, 0.08)',
          padding: '24px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Decorative gradient strip at top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #1FB6C1, #1E6FA8, #2D2F8F, #7A3FA1)',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          {/* Cookie icon */}
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(31,182,193,0.12), rgba(30,111,168,0.12))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1FB6C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
              <path d="M8.5 8.5v.01" />
              <path d="M16 15.5v.01" />
              <path d="M12 12v.01" />
              <path d="M11 17v.01" />
              <path d="M7 14v.01" />
            </svg>
          </div>

          <div>
            <h4
              style={{
                margin: '0 0 6px 0',
                fontSize: '16px',
                fontWeight: 700,
                color: '#0F172A',
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
            >
              We value your privacy
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13.5px',
                lineHeight: '1.6',
                color: '#475569',
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
            >
              We use cookies and Google Analytics to understand how visitors interact with our website. Your data helps us improve our services.
            </p>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '10px',
            marginTop: '20px',
          }}
        >
          <button
            onClick={handleAccept}
            style={{
              flex: 1,
              padding: '11px 20px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #1FB6C1, #1E6FA8, #2D2F8F)',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: 'Inter, system-ui, sans-serif',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(30, 111, 168, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 6px 20px rgba(30, 111, 168, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(30, 111, 168, 0.3)';
            }}
          >
            Accept All
          </button>
          <button
            onClick={handleDecline}
            style={{
              flex: 1,
              padding: '11px 20px',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              background: 'transparent',
              color: '#475569',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: 'Inter, system-ui, sans-serif',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#F1F5F9';
              e.target.style.borderColor = '#CBD5E1';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.borderColor = '#E2E8F0';
            }}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
