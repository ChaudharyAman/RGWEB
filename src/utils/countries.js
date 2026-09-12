// Complete global list of all countries with dial codes, digit lengths, format examples, and flag emojis
export const COUNTRIES = [
  // Popular / Frequently selected at top
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

  // All countries in alphabetical order
  { code: 'AF', name: 'Afghanistan', dialCode: '+93', flag: '🇦🇫', minDigits: 9, maxDigits: 9, format: '70 123 4567' },
  { code: 'AL', name: 'Albania', dialCode: '+355', flag: '🇦🇱', minDigits: 9, maxDigits: 9, format: '69 123 4567' },
  { code: 'DZ', name: 'Algeria', dialCode: '+213', flag: '🇩🇿', minDigits: 9, maxDigits: 9, format: '551 23 45 67' },
  { code: 'AS', name: 'American Samoa', dialCode: '+1684', flag: '🇦🇸', minDigits: 7, maxDigits: 7, format: '733 1234' },
  { code: 'AD', name: 'Andorra', dialCode: '+376', flag: '🇦🇩', minDigits: 6, maxDigits: 6, format: '312 345' },
  { code: 'AO', name: 'Angola', dialCode: '+244', flag: '🇦🇴', minDigits: 9, maxDigits: 9, format: '923 123 456' },
  { code: 'AI', name: 'Anguilla', dialCode: '+1264', flag: '🇦🇮', minDigits: 7, maxDigits: 7, format: '235 1234' },
  { code: 'AG', name: 'Antigua and Barbuda', dialCode: '+1268', flag: '🇦🇬', minDigits: 7, maxDigits: 7, format: '464 1234' },
  { code: 'AR', name: 'Argentina', dialCode: '+54', flag: '🇦🇷', minDigits: 10, maxDigits: 10, format: '9 11 1234 5678' },
  { code: 'AM', name: 'Armenia', dialCode: '+374', flag: '🇦🇲', minDigits: 8, maxDigits: 8, format: '77 123456' },
  { code: 'AW', name: 'Aruba', dialCode: '+297', flag: '🇦🇼', minDigits: 7, maxDigits: 7, format: '560 1234' },
  { code: 'AT', name: 'Austria', dialCode: '+43', flag: '🇦🇹', minDigits: 10, maxDigits: 11, format: '664 1234567' },
  { code: 'AZ', name: 'Azerbaijan', dialCode: '+994', flag: '🇦🇿', minDigits: 9, maxDigits: 9, format: '50 123 45 67' },
  { code: 'BS', name: 'Bahamas', dialCode: '+1242', flag: '🇧🇸', minDigits: 7, maxDigits: 7, format: '359 1234' },
  { code: 'BH', name: 'Bahrain', dialCode: '+973', flag: '🇧🇭', minDigits: 8, maxDigits: 8, format: '3612 3456' },
  { code: 'BD', name: 'Bangladesh', dialCode: '+880', flag: '🇧🇩', minDigits: 10, maxDigits: 10, format: '1712 345678' },
  { code: 'BB', name: 'Barbados', dialCode: '+1246', flag: '🇧🇧', minDigits: 7, maxDigits: 7, format: '230 1234' },
  { code: 'BY', name: 'Belarus', dialCode: '+375', flag: '🇧🇾', minDigits: 9, maxDigits: 9, format: '29 123 4567' },
  { code: 'BE', name: 'Belgium', dialCode: '+32', flag: '🇧🇪', minDigits: 9, maxDigits: 9, format: '470 12 34 56' },
  { code: 'BZ', name: 'Belize', dialCode: '+501', flag: '🇧🇿', minDigits: 7, maxDigits: 7, format: '622 1234' },
  { code: 'BJ', name: 'Benin', dialCode: '+229', flag: '🇧🇯', minDigits: 8, maxDigits: 8, format: '97 12 34 56' },
  { code: 'BM', name: 'Bermuda', dialCode: '+1441', flag: '🇧🇲', minDigits: 7, maxDigits: 7, format: '505 1234' },
  { code: 'BT', name: 'Bhutan', dialCode: '+975', flag: '🇧🇹', minDigits: 8, maxDigits: 8, format: '17 12 34 56' },
  { code: 'BO', name: 'Bolivia', dialCode: '+591', flag: '🇧🇴', minDigits: 8, maxDigits: 8, format: '71234567' },
  { code: 'BA', name: 'Bosnia and Herzegovina', dialCode: '+387', flag: '🇧🇦', minDigits: 8, maxDigits: 9, format: '61 123 456' },
  { code: 'BW', name: 'Botswana', dialCode: '+267', flag: '🇧🇼', minDigits: 8, maxDigits: 8, format: '71 123 456' },
  { code: 'BR', name: 'Brazil', dialCode: '+55', flag: '🇧🇷', minDigits: 10, maxDigits: 11, format: '11 98765 4321' },
  { code: 'IO', name: 'British Indian Ocean Territory', dialCode: '+246', flag: '🇮🇴', minDigits: 7, maxDigits: 7, format: '370 1234' },
  { code: 'VG', name: 'British Virgin Islands', dialCode: '+1284', flag: '🇻🇬', minDigits: 7, maxDigits: 7, format: '499 1234' },
  { code: 'BN', name: 'Brunei', dialCode: '+673', flag: '🇧🇳', minDigits: 7, maxDigits: 7, format: '712 3456' },
  { code: 'BG', name: 'Bulgaria', dialCode: '+359', flag: '🇧🇬', minDigits: 8, maxDigits: 9, format: '88 123 4567' },
  { code: 'BF', name: 'Burkina Faso', dialCode: '+226', flag: '🇧🇫', minDigits: 8, maxDigits: 8, format: '70 12 34 56' },
  { code: 'BI', name: 'Burundi', dialCode: '+257', flag: '🇧🇮', minDigits: 8, maxDigits: 8, format: '79 12 34 56' },
  { code: 'KH', name: 'Cambodia', dialCode: '+855', flag: '🇰🇭', minDigits: 8, maxDigits: 9, format: '12 345 678' },
  { code: 'CM', name: 'Cameroon', dialCode: '+237', flag: '🇨🇲', minDigits: 9, maxDigits: 9, format: '6 71 23 45 67' },
  { code: 'CV', name: 'Cape Verde', dialCode: '+238', flag: '🇨🇻', minDigits: 7, maxDigits: 7, format: '991 1234' },
  { code: 'KY', name: 'Cayman Islands', dialCode: '+1345', flag: '🇰🇾', minDigits: 7, maxDigits: 7, format: '925 1234' },
  { code: 'CF', name: 'Central African Republic', dialCode: '+236', flag: '🇨🇫', minDigits: 8, maxDigits: 8, format: '75 12 34 56' },
  { code: 'TD', name: 'Chad', dialCode: '+235', flag: '🇹🇩', minDigits: 8, maxDigits: 8, format: '66 12 34 56' },
  { code: 'CL', name: 'Chile', dialCode: '+56', flag: '🇨🇱', minDigits: 9, maxDigits: 9, format: '9 1234 5678' },
  { code: 'CN', name: 'China', dialCode: '+86', flag: '🇨🇳', minDigits: 11, maxDigits: 11, format: '138 1234 5678' },
  { code: 'CO', name: 'Colombia', dialCode: '+57', flag: '🇨🇴', minDigits: 10, maxDigits: 10, format: '300 123 4567' },
  { code: 'KM', name: 'Comoros', dialCode: '+269', flag: '🇰🇲', minDigits: 7, maxDigits: 7, format: '321 2345' },
  { code: 'CG', name: 'Congo', dialCode: '+242', flag: '🇨🇬', minDigits: 9, maxDigits: 9, format: '06 123 4567' },
  { code: 'CD', name: 'Congo (DRC)', dialCode: '+243', flag: '🇨🇩', minDigits: 9, maxDigits: 9, format: '81 123 4567' },
  { code: 'CK', name: 'Cook Islands', dialCode: '+682', flag: '🇨🇰', minDigits: 5, maxDigits: 5, format: '51 234' },
  { code: 'CR', name: 'Costa Rica', dialCode: '+506', flag: '🇨🇷', minDigits: 8, maxDigits: 8, format: '8312 3456' },
  { code: 'CI', name: "Cote d'Ivoire", dialCode: '+225', flag: '🇨🇮', minDigits: 10, maxDigits: 10, format: '07 12 34 56 78' },
  { code: 'HR', name: 'Croatia', dialCode: '+385', flag: '🇭🇷', minDigits: 8, maxDigits: 9, format: '91 123 4567' },
  { code: 'CU', name: 'Cuba', dialCode: '+53', flag: '🇨🇺', minDigits: 8, maxDigits: 8, format: '5 1234567' },
  { code: 'CW', name: 'Curacao', dialCode: '+599', flag: '🇨🇼', minDigits: 7, maxDigits: 8, format: '9 512 3456' },
  { code: 'CY', name: 'Cyprus', dialCode: '+357', flag: '🇨🇾', minDigits: 8, maxDigits: 8, format: '99 123456' },
  { code: 'CZ', name: 'Czech Republic', dialCode: '+420', flag: '🇨🇿', minDigits: 9, maxDigits: 9, format: '601 123 456' },
  { code: 'DK', name: 'Denmark', dialCode: '+45', flag: '🇩🇰', minDigits: 8, maxDigits: 8, format: '20 12 34 56' },
  { code: 'DJ', name: 'Djibouti', dialCode: '+253', flag: '🇩🇯', minDigits: 8, maxDigits: 8, format: '77 12 34 56' },
  { code: 'DM', name: 'Dominica', dialCode: '+1767', flag: '🇩🇲', minDigits: 7, maxDigits: 7, format: '225 1234' },
  { code: 'DO', name: 'Dominican Republic', dialCode: '+1809', flag: '🇩🇴', minDigits: 7, maxDigits: 7, format: '221 1234' },
  { code: 'EC', name: 'Ecuador', dialCode: '+593', flag: '🇪🇨', minDigits: 9, maxDigits: 9, format: '9 9123 4567' },
  { code: 'EG', name: 'Egypt', dialCode: '+20', flag: '🇪🇬', minDigits: 10, maxDigits: 10, format: '10 1234 5678' },
  { code: 'SV', name: 'El Salvador', dialCode: '+503', flag: '🇸🇻', minDigits: 8, maxDigits: 8, format: '7012 3456' },
  { code: 'GQ', name: 'Equatorial Guinea', dialCode: '+240', flag: '🇬🇶', minDigits: 9, maxDigits: 9, format: '222 123 456' },
  { code: 'ER', name: 'Eritrea', dialCode: '+291', flag: '🇪🇷', minDigits: 7, maxDigits: 7, format: '7 123456' },
  { code: 'EE', name: 'Estonia', dialCode: '+372', flag: '🇪🇪', minDigits: 7, maxDigits: 8, format: '5123 4567' },
  { code: 'SZ', name: 'Eswatini', dialCode: '+268', flag: '🇸🇿', minDigits: 8, maxDigits: 8, format: '7612 3456' },
  { code: 'ET', name: 'Ethiopia', dialCode: '+251', flag: '🇪🇹', minDigits: 9, maxDigits: 9, format: '91 123 4567' },
  { code: 'FK', name: 'Falkland Islands', dialCode: '+500', flag: '🇫🇰', minDigits: 5, maxDigits: 5, format: '51234' },
  { code: 'FO', name: 'Faroe Islands', dialCode: '+298', flag: '🇫🇴', minDigits: 6, maxDigits: 6, format: '211234' },
  { code: 'FJ', name: 'Fiji', dialCode: '+679', flag: '🇫🇯', minDigits: 7, maxDigits: 7, format: '701 2345' },
  { code: 'FI', name: 'Finland', dialCode: '+358', flag: '🇫🇮', minDigits: 9, maxDigits: 10, format: '40 123 4567' },
  { code: 'GF', name: 'French Guiana', dialCode: '+594', flag: '🇬🇫', minDigits: 9, maxDigits: 9, format: '694 12 34 56' },
  { code: 'PF', name: 'French Polynesia', dialCode: '+689', flag: '🇵🇫', minDigits: 8, maxDigits: 8, format: '87 12 34 56' },
  { code: 'GA', name: 'Gabon', dialCode: '+241', flag: '🇬🇦', minDigits: 8, maxDigits: 8, format: '06 12 34 56' },
  { code: 'GM', name: 'Gambia', dialCode: '+220', flag: '🇬🇲', minDigits: 7, maxDigits: 7, format: '912 3456' },
  { code: 'GE', name: 'Georgia', dialCode: '+995', flag: '🇬🇪', minDigits: 9, maxDigits: 9, format: '599 12 34 56' },
  { code: 'GH', name: 'Ghana', dialCode: '+233', flag: '🇬🇭', minDigits: 9, maxDigits: 9, format: '24 123 4567' },
  { code: 'GI', name: 'Gibraltar', dialCode: '+350', flag: '🇬🇮', minDigits: 8, maxDigits: 8, format: '57123456' },
  { code: 'GR', name: 'Greece', dialCode: '+30', flag: '🇬🇷', minDigits: 10, maxDigits: 10, format: '691 234 5678' },
  { code: 'GL', name: 'Greenland', dialCode: '+299', flag: '🇬🇱', minDigits: 6, maxDigits: 6, format: '21 23 45' },
  { code: 'GD', name: 'Grenada', dialCode: '+1473', flag: '🇬🇩', minDigits: 7, maxDigits: 7, format: '403 1234' },
  { code: 'GP', name: 'Guadeloupe', dialCode: '+590', flag: '🇬🇵', minDigits: 9, maxDigits: 9, format: '690 12 34 56' },
  { code: 'GU', name: 'Guam', dialCode: '+1671', flag: '🇬🇺', minDigits: 7, maxDigits: 7, format: '727 1234' },
  { code: 'GT', name: 'Guatemala', dialCode: '+502', flag: '🇬🇹', minDigits: 8, maxDigits: 8, format: '5123 4567' },
  { code: 'GG', name: 'Guernsey', dialCode: '+44', flag: '🇬🇬', minDigits: 10, maxDigits: 10, format: '7781 123456' },
  { code: 'GN', name: 'Guinea', dialCode: '+224', flag: '🇬🇳', minDigits: 9, maxDigits: 9, format: '601 12 34 56' },
  { code: 'GW', name: 'Guinea-Bissau', dialCode: '+245', flag: '🇬🇼', minDigits: 7, maxDigits: 9, format: '955 123 456' },
  { code: 'GY', name: 'Guyana', dialCode: '+592', flag: '🇬🇾', minDigits: 7, maxDigits: 7, format: '612 3456' },
  { code: 'HT', name: 'Haiti', dialCode: '+509', flag: '🇭🇹', minDigits: 8, maxDigits: 8, format: '3412 3456' },
  { code: 'HN', name: 'Honduras', dialCode: '+504', flag: '🇭🇳', minDigits: 8, maxDigits: 8, format: '9123 4567' },
  { code: 'HK', name: 'Hong Kong', dialCode: '+852', flag: '🇭🇰', minDigits: 8, maxDigits: 8, format: '9123 4567' },
  { code: 'HU', name: 'Hungary', dialCode: '+36', flag: '🇭🇺', minDigits: 9, maxDigits: 9, format: '20 123 4567' },
  { code: 'IS', name: 'Iceland', dialCode: '+354', flag: '🇮🇸', minDigits: 7, maxDigits: 7, format: '612 3456' },
  { code: 'ID', name: 'Indonesia', dialCode: '+62', flag: '🇮🇩', minDigits: 9, maxDigits: 12, format: '812 3456 7890' },
  { code: 'IR', name: 'Iran', dialCode: '+98', flag: '🇮🇷', minDigits: 10, maxDigits: 10, format: '912 345 6789' },
  { code: 'IQ', name: 'Iraq', dialCode: '+964', flag: '🇮🇶', minDigits: 10, maxDigits: 10, format: '790 123 4567' },
  { code: 'IE', name: 'Ireland', dialCode: '+353', flag: '🇮🇪', minDigits: 9, maxDigits: 9, format: '85 123 4567' },
  { code: 'IM', name: 'Isle of Man', dialCode: '+44', flag: '🇮🇲', minDigits: 10, maxDigits: 10, format: '7624 123456' },
  { code: 'IL', name: 'Israel', dialCode: '+972', flag: '🇮🇱', minDigits: 9, maxDigits: 9, format: '50 123 4567' },
  { code: 'IT', name: 'Italy', dialCode: '+39', flag: '🇮🇹', minDigits: 9, maxDigits: 10, format: '312 345 6789' },
  { code: 'JM', name: 'Jamaica', dialCode: '+1876', flag: '🇯🇲', minDigits: 7, maxDigits: 7, format: '812 3456' },
  { code: 'JP', name: 'Japan', dialCode: '+81', flag: '🇯🇵', minDigits: 10, maxDigits: 10, format: '90 1234 5678' },
  { code: 'JE', name: 'Jersey', dialCode: '+44', flag: '🇯🇪', minDigits: 10, maxDigits: 10, format: '7797 123456' },
  { code: 'JO', name: 'Jordan', dialCode: '+962', flag: '🇯🇴', minDigits: 9, maxDigits: 9, format: '7 9012 3456' },
  { code: 'KZ', name: 'Kazakhstan', dialCode: '+7', flag: '🇰🇿', minDigits: 10, maxDigits: 10, format: '701 123 4567' },
  { code: 'KE', name: 'Kenya', dialCode: '+254', flag: '🇰🇪', minDigits: 9, maxDigits: 9, format: '712 345678' },
  { code: 'KI', name: 'Kiribati', dialCode: '+686', flag: '🇰🇮', minDigits: 8, maxDigits: 8, format: '7201 2345' },
  { code: 'XK', name: 'Kosovo', dialCode: '+383', flag: '🇽🇰', minDigits: 8, maxDigits: 8, format: '44 123 456' },
  { code: 'KW', name: 'Kuwait', dialCode: '+965', flag: '🇰🇼', minDigits: 8, maxDigits: 8, format: '5123 4567' },
  { code: 'KG', name: 'Kyrgyzstan', dialCode: '+996', flag: '🇰🇬', minDigits: 9, maxDigits: 9, format: '700 123 456' },
  { code: 'LA', name: 'Laos', dialCode: '+856', flag: '🇱🇦', minDigits: 9, maxDigits: 10, format: '20 23 456 789' },
  { code: 'LV', name: 'Latvia', dialCode: '+371', flag: '🇱🇻', minDigits: 8, maxDigits: 8, format: '21 234 567' },
  { code: 'LB', name: 'Lebanon', dialCode: '+961', flag: '🇱🇧', minDigits: 7, maxDigits: 8, format: '70 123 456' },
  { code: 'LS', name: 'Lesotho', dialCode: '+266', flag: '🇱🇸', minDigits: 8, maxDigits: 8, format: '5012 3456' },
  { code: 'LR', name: 'Liberia', dialCode: '+231', flag: '🇱🇷', minDigits: 7, maxDigits: 8, format: '77 123 456' },
  { code: 'LY', name: 'Libya', dialCode: '+218', flag: '🇱🇾', minDigits: 9, maxDigits: 9, format: '91 123 4567' },
  { code: 'LI', name: 'Liechtenstein', dialCode: '+423', flag: '🇱🇮', minDigits: 7, maxDigits: 9, format: '660 12 34' },
  { code: 'LT', name: 'Lithuania', dialCode: '+370', flag: '🇱🇹', minDigits: 8, maxDigits: 8, format: '612 34567' },
  { code: 'LU', name: 'Luxembourg', dialCode: '+352', flag: '🇱🇺', minDigits: 9, maxDigits: 9, format: '621 123 456' },
  { code: 'MO', name: 'Macao', dialCode: '+853', flag: '🇲🇴', minDigits: 8, maxDigits: 8, format: '6612 3456' },
  { code: 'MG', name: 'Madagascar', dialCode: '+261', flag: '🇲🇬', minDigits: 9, maxDigits: 9, format: '32 12 345 67' },
  { code: 'MW', name: 'Malawi', dialCode: '+265', flag: '🇲🇼', minDigits: 9, maxDigits: 9, format: '99 123 4567' },
  { code: 'MY', name: 'Malaysia', dialCode: '+60', flag: '🇲🇾', minDigits: 9, maxDigits: 10, format: '12 345 6789' },
  { code: 'MV', name: 'Maldives', dialCode: '+960', flag: '🇲🇻', minDigits: 7, maxDigits: 7, format: '771 2345' },
  { code: 'ML', name: 'Mali', dialCode: '+223', flag: '🇲🇱', minDigits: 8, maxDigits: 8, format: '65 12 34 56' },
  { code: 'MT', name: 'Malta', dialCode: '+356', flag: '🇲🇹', minDigits: 8, maxDigits: 8, format: '9912 3456' },
  { code: 'MH', name: 'Marshall Islands', dialCode: '+692', flag: '🇲🇭', minDigits: 7, maxDigits: 7, format: '235 1234' },
  { code: 'MQ', name: 'Martinique', dialCode: '+596', flag: '🇲🇶', minDigits: 9, maxDigits: 9, format: '696 12 34 56' },
  { code: 'MR', name: 'Mauritania', dialCode: '+222', flag: '🇲🇷', minDigits: 8, maxDigits: 8, format: '22 12 34 56' },
  { code: 'MU', name: 'Mauritius', dialCode: '+230', flag: '🇲🇺', minDigits: 8, maxDigits: 8, format: '5251 2345' },
  { code: 'YT', name: 'Mayotte', dialCode: '+262', flag: '🇾🇹', minDigits: 9, maxDigits: 9, format: '639 12 34 56' },
  { code: 'MX', name: 'Mexico', dialCode: '+52', flag: '🇲🇽', minDigits: 10, maxDigits: 10, format: '55 1234 5678' },
  { code: 'FM', name: 'Micronesia', dialCode: '+691', flag: '🇫🇲', minDigits: 7, maxDigits: 7, format: '920 1234' },
  { code: 'MD', name: 'Moldova', dialCode: '+373', flag: '🇲🇩', minDigits: 8, maxDigits: 8, format: '621 12 345' },
  { code: 'MC', name: 'Monaco', dialCode: '+377', flag: '🇲🇨', minDigits: 8, maxDigits: 9, format: '6 12 34 56 78' },
  { code: 'MN', name: 'Mongolia', dialCode: '+976', flag: '🇲🇳', minDigits: 8, maxDigits: 8, format: '8812 3456' },
  { code: 'ME', name: 'Montenegro', dialCode: '+382', flag: '🇲🇪', minDigits: 8, maxDigits: 8, format: '67 123 456' },
  { code: 'MS', name: 'Montserrat', dialCode: '+1664', flag: '🇲🇸', minDigits: 7, maxDigits: 7, format: '492 1234' },
  { code: 'MA', name: 'Morocco', dialCode: '+212', flag: '🇲🇦', minDigits: 9, maxDigits: 9, format: '661 12 34 56' },
  { code: 'MZ', name: 'Mozambique', dialCode: '+258', flag: '🇲🇿', minDigits: 9, maxDigits: 9, format: '82 123 4567' },
  { code: 'MM', name: 'Myanmar', dialCode: '+95', flag: '🇲🇲', minDigits: 8, maxDigits: 10, format: '9 251 234 567' },
  { code: 'NA', name: 'Namibia', dialCode: '+264', flag: '🇳🇦', minDigits: 9, maxDigits: 9, format: '81 123 4567' },
  { code: 'NR', name: 'Nauru', dialCode: '+674', flag: '🇳🇷', minDigits: 7, maxDigits: 7, format: '555 1234' },
  { code: 'NP', name: 'Nepal', dialCode: '+977', flag: '🇳🇵', minDigits: 10, maxDigits: 10, format: '984 1234567' },
  { code: 'NL', name: 'Netherlands', dialCode: '+31', flag: '🇳🇱', minDigits: 9, maxDigits: 9, format: '6 12345678' },
  { code: 'NC', name: 'New Caledonia', dialCode: '+687', flag: '🇳🇨', minDigits: 6, maxDigits: 6, format: '75 12 34' },
  { code: 'NZ', name: 'New Zealand', dialCode: '+64', flag: '🇳🇿', minDigits: 8, maxDigits: 10, format: '21 123 4567' },
  { code: 'NI', name: 'Nicaragua', dialCode: '+505', flag: '🇳🇮', minDigits: 8, maxDigits: 8, format: '8123 4567' },
  { code: 'NE', name: 'Niger', dialCode: '+227', flag: '🇳🇪', minDigits: 8, maxDigits: 8, format: '96 12 34 56' },
  { code: 'NG', name: 'Nigeria', dialCode: '+234', flag: '🇳🇬', minDigits: 10, maxDigits: 10, format: '803 123 4567' },
  { code: 'NU', name: 'Niue', dialCode: '+683', flag: '🇳🇺', minDigits: 4, maxDigits: 4, format: '4123' },
  { code: 'NF', name: 'Norfolk Island', dialCode: '+672', flag: '🇳🇫', minDigits: 6, maxDigits: 6, format: '322 123' },
  { code: 'KP', name: 'North Korea', dialCode: '+850', flag: '🇰🇵', minDigits: 8, maxDigits: 10, format: '191 234 5678' },
  { code: 'MK', name: 'North Macedonia', dialCode: '+389', flag: '🇲🇰', minDigits: 8, maxDigits: 8, format: '72 123 456' },
  { code: 'MP', name: 'Northern Mariana Islands', dialCode: '+1670', flag: '🇲🇵', minDigits: 7, maxDigits: 7, format: '234 1234' },
  { code: 'NO', name: 'Norway', dialCode: '+47', flag: '🇳🇴', minDigits: 8, maxDigits: 8, format: '412 34 567' },
  { code: 'OM', name: 'Oman', dialCode: '+968', flag: '🇴🇲', minDigits: 8, maxDigits: 8, format: '9123 4567' },
  { code: 'PK', name: 'Pakistan', dialCode: '+92', flag: '🇵🇰', minDigits: 10, maxDigits: 10, format: '300 1234567' },
  { code: 'PW', name: 'Palau', dialCode: '+680', flag: '🇵🇼', minDigits: 7, maxDigits: 7, format: '775 1234' },
  { code: 'PS', name: 'Palestine', dialCode: '+970', flag: '🇵🇸', minDigits: 9, maxDigits: 9, format: '59 123 4567' },
  { code: 'PA', name: 'Panama', dialCode: '+507', flag: '🇵🇦', minDigits: 8, maxDigits: 8, format: '6123 4567' },
  { code: 'PG', name: 'Papua New Guinea', dialCode: '+675', flag: '🇵🇬', minDigits: 8, maxDigits: 8, format: '7012 3456' },
  { code: 'PY', name: 'Paraguay', dialCode: '+595', flag: '🇵🇾', minDigits: 9, maxDigits: 9, format: '981 123456' },
  { code: 'PE', name: 'Peru', dialCode: '+51', flag: '🇵🇪', minDigits: 9, maxDigits: 9, format: '912 345 678' },
  { code: 'PH', name: 'Philippines', dialCode: '+63', flag: '🇵🇭', minDigits: 10, maxDigits: 10, format: '917 123 4567' },
  { code: 'PL', name: 'Poland', dialCode: '+48', flag: '🇵🇱', minDigits: 9, maxDigits: 9, format: '512 345 678' },
  { code: 'PT', name: 'Portugal', dialCode: '+351', flag: '🇵🇹', minDigits: 9, maxDigits: 9, format: '912 345 678' },
  { code: 'PR', name: 'Puerto Rico', dialCode: '+1787', flag: '🇵🇷', minDigits: 7, maxDigits: 7, format: '201 1234' },
  { code: 'QA', name: 'Qatar', dialCode: '+974', flag: '🇶🇦', minDigits: 8, maxDigits: 8, format: '3312 3456' },
  { code: 'RE', name: 'Reunion', dialCode: '+262', flag: '🇷🇪', minDigits: 9, maxDigits: 9, format: '692 12 34 56' },
  { code: 'RO', name: 'Romania', dialCode: '+40', flag: '🇷🇴', minDigits: 9, maxDigits: 9, format: '712 345 678' },
  { code: 'RU', name: 'Russia', dialCode: '+7', flag: '🇷🇺', minDigits: 10, maxDigits: 10, format: '912 345 6789' },
  { code: 'RW', name: 'Rwanda', dialCode: '+250', flag: '🇷🇼', minDigits: 9, maxDigits: 9, format: '788 123 456' },
  { code: 'BL', name: 'Saint Barthelemy', dialCode: '+590', flag: '🇧🇱', minDigits: 9, maxDigits: 9, format: '690 12 34 56' },
  { code: 'SH', name: 'Saint Helena', dialCode: '+290', flag: '🇸🇭', minDigits: 4, maxDigits: 4, format: '5123' },
  { code: 'KN', name: 'Saint Kitts and Nevis', dialCode: '+1869', flag: '🇰🇳', minDigits: 7, maxDigits: 7, format: '465 1234' },
  { code: 'LC', name: 'Saint Lucia', dialCode: '+1758', flag: '🇱🇨', minDigits: 7, maxDigits: 7, format: '452 1234' },
  { code: 'MF', name: 'Saint Martin', dialCode: '+590', flag: '🇲🇫', minDigits: 9, maxDigits: 9, format: '690 12 34 56' },
  { code: 'PM', name: 'Saint Pierre and Miquelon', dialCode: '+508', flag: '🇵🇲', minDigits: 6, maxDigits: 6, format: '55 12 34' },
  { code: 'VC', name: 'Saint Vincent and the Grenadines', dialCode: '+1784', flag: '🇻🇨', minDigits: 7, maxDigits: 7, format: '456 1234' },
  { code: 'WS', name: 'Samoa', dialCode: '+685', flag: '🇼🇸', minDigits: 5, maxDigits: 7, format: '72 12345' },
  { code: 'SM', name: 'San Marino', dialCode: '+378', flag: '🇸🇲', minDigits: 8, maxDigits: 10, format: '66 123456' },
  { code: 'ST', name: 'Sao Tome and Principe', dialCode: '+239', flag: '🇸🇹', minDigits: 7, maxDigits: 7, format: '991 2345' },
  { code: 'SN', name: 'Senegal', dialCode: '+221', flag: '🇸🇳', minDigits: 9, maxDigits: 9, format: '77 123 45 67' },
  { code: 'RS', name: 'Serbia', dialCode: '+381', flag: '🇷🇸', minDigits: 8, maxDigits: 9, format: '60 123 4567' },
  { code: 'SC', name: 'Seychelles', dialCode: '+248', flag: '🇸🇨', minDigits: 7, maxDigits: 7, format: '2 51 23 45' },
  { code: 'SL', name: 'Sierra Leone', dialCode: '+232', flag: '🇸🇱', minDigits: 8, maxDigits: 8, format: '76 123456' },
  { code: 'SX', name: 'Sint Maarten', dialCode: '+1721', flag: '🇸🇽', minDigits: 7, maxDigits: 7, format: '520 1234' },
  { code: 'SK', name: 'Slovakia', dialCode: '+421', flag: '🇸🇰', minDigits: 9, maxDigits: 9, format: '912 345 678' },
  { code: 'SI', name: 'Slovenia', dialCode: '+386', flag: '🇸🇮', minDigits: 8, maxDigits: 8, format: '31 123 456' },
  { code: 'SB', name: 'Solomon Islands', dialCode: '+677', flag: '🇸🇧', minDigits: 7, maxDigits: 7, format: '742 1234' },
  { code: 'SO', name: 'Somalia', dialCode: '+252', flag: '🇸🇴', minDigits: 8, maxDigits: 9, format: '61 123 4567' },
  { code: 'ZA', name: 'South Africa', dialCode: '+27', flag: '🇿🇦', minDigits: 9, maxDigits: 9, format: '71 234 5678' },
  { code: 'KR', name: 'South Korea', dialCode: '+82', flag: '🇰🇷', minDigits: 9, maxDigits: 10, format: '10 1234 5678' },
  { code: 'SS', name: 'South Sudan', dialCode: '+211', flag: '🇸🇸', minDigits: 9, maxDigits: 9, format: '977 123 456' },
  { code: 'ES', name: 'Spain', dialCode: '+34', flag: '🇪🇸', minDigits: 9, maxDigits: 9, format: '612 345 678' },
  { code: 'LK', name: 'Sri Lanka', dialCode: '+94', flag: '🇱🇰', minDigits: 9, maxDigits: 9, format: '71 234 5678' },
  { code: 'SD', name: 'Sudan', dialCode: '+249', flag: '🇸🇩', minDigits: 9, maxDigits: 9, format: '91 123 4567' },
  { code: 'SR', name: 'Suriname', dialCode: '+597', flag: '🇸🇷', minDigits: 7, maxDigits: 7, format: '812 3456' },
  { code: 'SJ', name: 'Svalbard and Jan Mayen', dialCode: '+47', flag: '🇸🇯', minDigits: 8, maxDigits: 8, format: '79 12 34 56' },
  { code: 'SE', name: 'Sweden', dialCode: '+46', flag: '🇸🇪', minDigits: 9, maxDigits: 9, format: '70 123 45 67' },
  { code: 'CH', name: 'Switzerland', dialCode: '+41', flag: '🇨🇭', minDigits: 9, maxDigits: 9, format: '78 123 45 67' },
  { code: 'SY', name: 'Syria', dialCode: '+963', flag: '🇸🇾', minDigits: 9, maxDigits: 9, format: '944 123 456' },
  { code: 'TW', name: 'Taiwan', dialCode: '+886', flag: '🇹🇼', minDigits: 9, maxDigits: 9, format: '912 345 678' },
  { code: 'TJ', name: 'Tajikistan', dialCode: '+992', flag: '🇹🇯', minDigits: 9, maxDigits: 9, format: '91 123 4567' },
  { code: 'TZ', name: 'Tanzania', dialCode: '+255', flag: '🇹🇿', minDigits: 9, maxDigits: 9, format: '712 345 678' },
  { code: 'TH', name: 'Thailand', dialCode: '+66', flag: '🇹🇭', minDigits: 9, maxDigits: 9, format: '81 234 5678' },
  { code: 'TL', name: 'Timor-Leste', dialCode: '+670', flag: '🇹🇱', minDigits: 8, maxDigits: 8, format: '7712 3456' },
  { code: 'TG', name: 'Togo', dialCode: '+228', flag: '🇹🇬', minDigits: 8, maxDigits: 8, format: '90 12 34 56' },
  { code: 'TK', name: 'Tokelau', dialCode: '+690', flag: '🇹🇰', minDigits: 4, maxDigits: 5, format: '5123' },
  { code: 'TO', name: 'Tonga', dialCode: '+676', flag: '🇹🇴', minDigits: 5, maxDigits: 7, format: '771 2345' },
  { code: 'TT', name: 'Trinidad and Tobago', dialCode: '+1868', flag: '🇹🇹', minDigits: 7, maxDigits: 7, format: '620 1234' },
  { code: 'TN', name: 'Tunisia', dialCode: '+216', flag: '🇹🇳', minDigits: 8, maxDigits: 8, format: '98 123 456' },
  { code: 'TR', name: 'Turkey', dialCode: '+90', flag: '🇹🇷', minDigits: 10, maxDigits: 10, format: '532 123 4567' },
  { code: 'TM', name: 'Turkmenistan', dialCode: '+993', flag: '🇹🇲', minDigits: 8, maxDigits: 8, format: '65 123456' },
  { code: 'TC', name: 'Turks and Caicos Islands', dialCode: '+1649', flag: '🇹🇨', minDigits: 7, maxDigits: 7, format: '231 1234' },
  { code: 'TV', name: 'Tuvalu', dialCode: '+688', flag: '🇹🇻', minDigits: 5, maxDigits: 6, format: '90 1234' },
  { code: 'UG', name: 'Uganda', dialCode: '+256', flag: '🇺🇬', minDigits: 9, maxDigits: 9, format: '701 234 567' },
  { code: 'UA', name: 'Ukraine', dialCode: '+380', flag: '🇺🇦', minDigits: 9, maxDigits: 9, format: '50 123 4567' },
  { code: 'UY', name: 'Uruguay', dialCode: '+598', flag: '🇺🇾', minDigits: 8, maxDigits: 8, format: '99 123 456' },
  { code: 'UZ', name: 'Uzbekistan', dialCode: '+998', flag: '🇺🇿', minDigits: 9, maxDigits: 9, format: '90 123 45 67' },
  { code: 'VU', name: 'Vanuatu', dialCode: '+678', flag: '🇻🇺', minDigits: 5, maxDigits: 7, format: '771 2345' },
  { code: 'VA', name: 'Vatican City', dialCode: '+39', flag: '🇻🇦', minDigits: 10, maxDigits: 10, format: '06 698 12345' },
  { code: 'VE', name: 'Venezuela', dialCode: '+58', flag: '🇻🇪', minDigits: 10, maxDigits: 10, format: '412 123 4567' },
  { code: 'VN', name: 'Vietnam', dialCode: '+84', flag: '🇻🇳', minDigits: 9, maxDigits: 10, format: '91 234 5678' },
  { code: 'VI', name: 'Virgin Islands (US)', dialCode: '+1340', flag: '🇻🇮', minDigits: 7, maxDigits: 7, format: '690 1234' },
  { code: 'WF', name: 'Wallis and Futuna', dialCode: '+681', flag: '🇼🇫', minDigits: 6, maxDigits: 6, format: '72 12 34' },
  { code: 'YE', name: 'Yemen', dialCode: '+967', flag: '🇾🇪', minDigits: 9, maxDigits: 9, format: '771 234 567' },
  { code: 'ZM', name: 'Zambia', dialCode: '+260', flag: '🇿🇲', minDigits: 9, maxDigits: 9, format: '97 123 4567' },
  { code: 'ZW', name: 'Zimbabwe', dialCode: '+263', flag: '🇿🇼', minDigits: 9, maxDigits: 9, format: '77 123 4567' }
];

export const DEFAULT_COUNTRY = COUNTRIES[0]; // India (+91)

/**
 * Finds country by ISO 2-letter code
 */
export function findCountryByCode(code) {
  if (!code) return DEFAULT_COUNTRY;
  const upper = String(code).trim().toUpperCase();
  return COUNTRIES.find((c) => c.code === upper) || DEFAULT_COUNTRY;
}

/**
 * Finds country by calling/dial code (e.g., '+91' or '91')
 */
export function findCountryByDialCode(dialCode) {
  if (!dialCode) return DEFAULT_COUNTRY;
  const formatted = dialCode.startsWith('+') ? dialCode : `+${dialCode}`;
  return COUNTRIES.find((c) => c.dialCode === formatted) || DEFAULT_COUNTRY;
}

/**
 * Parses any incoming phone string (e.g., "+91 9876543210", "+12025550123", "9876543210")
 * into country code and national number.
 */
export function parsePhoneNumber(phoneString, defaultCountryCode = 'IN') {
  if (!phoneString || typeof phoneString !== 'string') {
    return {
      country: findCountryByCode(defaultCountryCode),
      nationalNumber: ''
    };
  }

  const trimmed = phoneString.trim();

  // If string starts with '+', search matching dial code (sorted by longest dial code first to avoid prefix clashes)
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

  // Pure digits without '+'
  const digits = trimmed.replace(/\D/g, '');
  const defaultCountry = findCountryByCode(defaultCountryCode);

  return {
    country: defaultCountry,
    nationalNumber: digits
  };
}

/**
 * Formats full international phone string: "+<dialCode> <nationalNumber>"
 */
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

  // Exact length check (e.g., India: exactly 10 digits allowed, starting from any number)
  if (activeCountry.minDigits === activeCountry.maxDigits) {
    if (cleanDigits.length !== activeCountry.minDigits) {
      return `Enter a valid ${activeCountry.minDigits}-digit ${activeCountry.name} phone number.`;
    }
  } else {
    // Length range check (e.g., Germany: 10-11 digits)
    if (cleanDigits.length < activeCountry.minDigits || cleanDigits.length > activeCountry.maxDigits) {
      return `Enter a valid ${activeCountry.minDigits}-${activeCountry.maxDigits} digit ${activeCountry.name} phone number.`;
    }
  }

  return null;
}
