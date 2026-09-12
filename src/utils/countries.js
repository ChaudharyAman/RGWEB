// Comprehensive list of countries with dial codes, digit lengths, and flags
export const COUNTRIES = [
  { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳', minDigits: 10, maxDigits: 10, format: '98765 43210' },
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸', minDigits: 10, maxDigits: 10, format: '202 555 0123' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧', minDigits: 10, maxDigits: 10, format: '7911 123456' },
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪', minDigits: 9, maxDigits: 9, format: '50 123 4567' },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦', minDigits: 10, maxDigits: 10, format: '416 555 0123' },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺', minDigits: 9, maxDigits: 9, format: '412 345 678' },
  { code: 'SG', name: 'Singapore', dialCode: '+65', flag: '🇸🇬', minDigits: 8, maxDigits: 8, format: '8123 4567' },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦', minDigits: 9, maxDigits: 9, format: '50 123 4567' },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪', minDigits: 10, maxDigits: 11, format: '151 23456789' },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷', minDigits: 9, maxDigits: 9, format: '6 12 34 56 78' },
  { code: 'QA', name: 'Qatar', dialCode: '+974', flag: '🇶🇦', minDigits: 8, maxDigits: 8, format: '3312 3456' },
  { code: 'KW', name: 'Kuwait', dialCode: '+965', flag: '🇰🇼', minDigits: 8, maxDigits: 8, format: '5123 4567' },
  { code: 'OM', name: 'Oman', dialCode: '+968', flag: '🇴🇲', minDigits: 8, maxDigits: 8, format: '9123 4567' },
  { code: 'BH', name: 'Bahrain', dialCode: '+973', flag: '🇧🇭', minDigits: 8, maxDigits: 8, format: '3612 3456' },
  { code: 'MY', name: 'Malaysia', dialCode: '+60', flag: '🇲🇾', minDigits: 9, maxDigits: 10, format: '12 345 6789' },
  { code: 'PH', name: 'Philippines', dialCode: '+63', flag: '🇵🇭', minDigits: 10, maxDigits: 10, format: '917 123 4567' },
  { code: 'PK', name: 'Pakistan', dialCode: '+92', flag: '🇵🇰', minDigits: 10, maxDigits: 10, format: '300 1234567' },
  { code: 'BD', name: 'Bangladesh', dialCode: '+880', flag: '🇧🇩', minDigits: 10, maxDigits: 10, format: '1712 345678' },
  { code: 'LK', name: 'Sri Lanka', dialCode: '+94', flag: '🇱🇰', minDigits: 9, maxDigits: 9, format: '71 234 5678' },
  { code: 'NP', name: 'Nepal', dialCode: '+977', flag: '🇳🇵', minDigits: 10, maxDigits: 10, format: '984 1234567' },
  { code: 'ZA', name: 'South Africa', dialCode: '+27', flag: '🇿🇦', minDigits: 9, maxDigits: 9, format: '71 234 5678' },
  { code: 'NG', name: 'Nigeria', dialCode: '+234', flag: '🇳🇬', minDigits: 10, maxDigits: 10, format: '803 123 4567' },
  { code: 'KE', name: 'Kenya', dialCode: '+254', flag: '🇰🇪', minDigits: 9, maxDigits: 9, format: '712 345678' },
  { code: 'EG', name: 'Egypt', dialCode: '+20', flag: '🇪🇬', minDigits: 10, maxDigits: 10, format: '10 1234 5678' },
  { code: 'JP', name: 'Japan', dialCode: '+81', flag: '🇯🇵', minDigits: 10, maxDigits: 10, format: '90 1234 5678' },
  { code: 'KR', name: 'South Korea', dialCode: '+82', flag: '🇰🇷', minDigits: 9, maxDigits: 10, format: '10 1234 5678' },
  { code: 'CN', name: 'China', dialCode: '+86', flag: '🇨🇳', minDigits: 11, maxDigits: 11, format: '138 1234 5678' },
  { code: 'ID', name: 'Indonesia', dialCode: '+62', flag: '🇮🇩', minDigits: 9, maxDigits: 12, format: '812 3456 7890' },
  { code: 'NZ', name: 'New Zealand', dialCode: '+64', flag: '🇳🇿', minDigits: 8, maxDigits: 10, format: '21 123 4567' },
  { code: 'IE', name: 'Ireland', dialCode: '+353', flag: '🇮🇪', minDigits: 9, maxDigits: 9, format: '85 123 4567' },
  { code: 'NL', name: 'Netherlands', dialCode: '+31', flag: '🇳🇱', minDigits: 9, maxDigits: 9, format: '6 12345678' },
  { code: 'SE', name: 'Sweden', dialCode: '+46', flag: '🇸🇪', minDigits: 9, maxDigits: 9, format: '70 123 45 67' },
  { code: 'CH', name: 'Switzerland', dialCode: '+41', flag: '🇨🇭', minDigits: 9, maxDigits: 9, format: '78 123 45 67' },
  { code: 'ES', name: 'Spain', dialCode: '+34', flag: '🇪🇸', minDigits: 9, maxDigits: 9, format: '612 345 678' },
  { code: 'IT', name: 'Italy', dialCode: '+39', flag: '🇮🇹', minDigits: 9, maxDigits: 10, format: '312 345 6789' },
  { code: 'BR', name: 'Brazil', dialCode: '+55', flag: '🇧🇷', minDigits: 10, maxDigits: 11, format: '11 98765 4321' },
  { code: 'MX', name: 'Mexico', dialCode: '+52', flag: '🇲🇽', minDigits: 10, maxDigits: 10, format: '55 1234 5678' },
  { code: 'PL', name: 'Poland', dialCode: '+48', flag: '🇵🇱', minDigits: 9, maxDigits: 9, format: '512 345 678' },
  { code: 'NO', name: 'Norway', dialCode: '+47', flag: '🇳🇴', minDigits: 8, maxDigits: 8, format: '412 34 567' },
  { code: 'DK', name: 'Denmark', dialCode: '+45', flag: '🇩🇰', minDigits: 8, maxDigits: 8, format: '20 12 34 56' }
];

export const DEFAULT_COUNTRY = COUNTRIES.find((c) => c.code === 'IN') || COUNTRIES[0];

export function findCountryByCode(code) {
  if (!code) return DEFAULT_COUNTRY;
  const upper = String(code).trim().toUpperCase();
  return COUNTRIES.find((c) => c.code === upper) || DEFAULT_COUNTRY;
}

export function findCountryByDialCode(dialCode) {
  if (!dialCode) return DEFAULT_COUNTRY;
  const formatted = dialCode.startsWith('+') ? dialCode : `+${dialCode}`;
  return COUNTRIES.find((c) => c.dialCode === formatted) || DEFAULT_COUNTRY;
}

export function parsePhoneNumber(phoneString, defaultCountryCode = 'IN') {
  if (!phoneString || typeof phoneString !== 'string') {
    return {
      country: findCountryByCode(defaultCountryCode),
      nationalNumber: ''
    };
  }

  const trimmed = phoneString.trim();

  if (trimmed.startsWith('+')) {
    const sortedCountries = [...COUNTRIES].sort((a, b) => b.dialCode.length - a.dialCode.length);
    for (const country of sortedCountries) {
      if (trimmed.startsWith(country.dialCode)) {
        const remaining = trimmed.slice(country.dialCode.length).replace(/\D/g, '');
        return {
          country,
          nationalNumber: remaining
        };
      }
    }
  }

  const digits = trimmed.replace(/\D/g, '');
  const defaultCountry = findCountryByCode(defaultCountryCode);

  return {
    country: defaultCountry,
    nationalNumber: digits
  };
}

export function formatPhoneNumber(country, nationalNumber) {
  const cleanDigits = String(nationalNumber || '').replace(/\D/g, '');
  if (!cleanDigits) return '';
  const dial = country?.dialCode || DEFAULT_COUNTRY.dialCode;
  return `${dial} ${cleanDigits}`;
}

/**
 * Validates national number against country-specific rules.
 * Validates the correct number of digits allowed for the selected country,
 * without restricting what digit the number must start with.
 * Returns null if valid, or an error string if invalid.
 */
export function validatePhoneNumber(country, nationalNumber, isRequired = true) {
  const cleanDigits = String(nationalNumber || '').replace(/\D/g, '');

  if (!cleanDigits) {
    return isRequired ? 'Phone number is required.' : null;
  }

  const activeCountry = country || DEFAULT_COUNTRY;

  if (activeCountry.minDigits === activeCountry.maxDigits) {
    if (cleanDigits.length !== activeCountry.minDigits) {
      return `Enter a valid ${activeCountry.minDigits}-digit ${activeCountry.name} phone number.`;
    }
  } else {
    if (cleanDigits.length < activeCountry.minDigits || cleanDigits.length > activeCountry.maxDigits) {
      return `Enter a valid ${activeCountry.minDigits}-${activeCountry.maxDigits} digit ${activeCountry.name} phone number.`;
    }
  }

  return null;
}
