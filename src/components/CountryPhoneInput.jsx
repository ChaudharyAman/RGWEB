import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  COUNTRIES,
  DEFAULT_COUNTRY,
  parsePhoneNumber,
  formatPhoneNumber,
  validatePhoneNumber
} from '../utils/countries';

export default function CountryPhoneInput({
  value = '',
  onChange,
  onBlur,
  error,
  disabled = false,
  required = false,
  id = 'phone',
  name = 'phone',
  className = '',
  defaultCountryCode = 'IN'
}) {
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const parsed = useMemo(() => {
    return parsePhoneNumber(value, defaultCountryCode);
  }, [value, defaultCountryCode]);

  const [selectedCountry, setSelectedCountry] = useState(parsed.country);
  const [nationalNumber, setNationalNumber] = useState(parsed.nationalNumber);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setSelectedCountry(parsed.country);
    setNationalNumber(parsed.nationalNumber);
  }, [parsed]);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return COUNTRIES;
    const q = searchQuery.trim().toLowerCase();
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dialCode.includes(q) ||
        c.code.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearchQuery('');

    const slicedDigits = nationalNumber.slice(0, country.maxDigits);
    setNationalNumber(slicedDigits);

    const fullPhone = formatPhoneNumber(country, slicedDigits);
    const err = validatePhoneNumber(country, slicedDigits, required);
    onChange?.(fullPhone, {
      country,
      nationalNumber: slicedDigits,
      isValid: !err,
      error: err
    });
  };

  const handleNumberChange = (event) => {
    const rawDigits = event.target.value.replace(/\D/g, '');
    const sliced = rawDigits.slice(0, selectedCountry.maxDigits);
    setNationalNumber(sliced);

    const fullPhone = formatPhoneNumber(selectedCountry, sliced);
    const err = validatePhoneNumber(selectedCountry, sliced, required);
    onChange?.(fullPhone, {
      country: selectedCountry,
      nationalNumber: sliced,
      isValid: !err,
      error: err
    });
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div
        className={`flex rounded-xl border bg-white shadow-sm transition-all focus-within:ring-2 ${
          error
            ? 'border-red-300 focus-within:border-red-400 focus-within:ring-red-100'
            : 'border-slate-300 focus-within:border-cyan-500 focus-within:ring-cyan-100'
        } ${disabled ? 'bg-slate-50 opacity-70 cursor-not-allowed' : ''}`}
      >
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-1.5 px-3 py-2.5 border-r border-slate-200 bg-slate-50 hover:bg-slate-100 rounded-l-xl text-slate-700 text-sm font-semibold transition shrink-0 select-none focus:outline-none"
          title={`Selected: ${selectedCountry.name} (${selectedCountry.dialCode})`}
        >
          <span className="text-lg leading-none" role="img" aria-label={selectedCountry.name}>
            {selectedCountry.flag}
          </span>
          <span className="text-xs font-bold tracking-tight text-slate-800">
            {selectedCountry.dialCode}
          </span>
          <svg
            className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <input
          type="tel"
          id={id}
          name={name}
          disabled={disabled}
          required={required}
          value={nationalNumber}
          onChange={handleNumberChange}
          onBlur={onBlur}
          placeholder={`e.g. ${selectedCountry.format}`}
          maxLength={selectedCountry.maxDigits}
          className="flex-1 w-full bg-transparent px-3.5 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none rounded-r-xl"
        />
      </div>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1.5 z-50 w-72 max-w-[90vw] rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden animate-in fade-in duration-150">
          <div className="p-2.5 border-b border-slate-100 bg-slate-50">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country or code..."
                className="w-full pl-8 pr-3 py-1.5 text-xs font-medium border border-slate-200 rounded-lg bg-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none text-slate-800 placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto divide-y divide-slate-50">
            {filteredCountries.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-500 font-medium">
                No matching countries found
              </div>
            ) : (
              filteredCountries.map((country) => {
                const isSelected = country.code === selectedCountry.code;
                return (
                  <button
                    key={`${country.code}-${country.dialCode}`}
                    type="button"
                    onClick={() => handleCountrySelect(country)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs transition-colors ${
                      isSelected
                        ? 'bg-cyan-50 font-bold text-cyan-800'
                        : 'hover:bg-slate-50 text-slate-700 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-base shrink-0 leading-none">{country.flag}</span>
                      <span className="truncate">{country.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      <span className="text-[11px] font-semibold text-slate-500">
                        {country.dialCode}
                      </span>
                      {isSelected && (
                        <svg className="w-3.5 h-3.5 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
