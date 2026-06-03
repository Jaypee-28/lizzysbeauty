const fs = require('fs');

// 1. Fix src/app/admin/page.tsx
let adminPage = fs.readFileSync('c:\\Users\\CHITECH\\Documents\\Beauty-booking-system\\src\\app\\admin\\page.tsx', 'utf8');
adminPage = adminPage.replace(/\{stat.extra && \(/g, '{(\'extra\' in stat && stat.extra) && (');
fs.writeFileSync('c:\\Users\\CHITECH\\Documents\\Beauty-booking-system\\src\\app\\admin\\page.tsx', adminPage, 'utf8');

// 2. Fix src/app/layout.tsx
let layoutPage = fs.readFileSync('c:\\Users\\CHITECH\\Documents\\Beauty-booking-system\\src\\app\\layout.tsx', 'utf8');
layoutPage = layoutPage.replace(/import \{ Navbar \} from "@\/components\/shop\/navbar";\n/g, '');
layoutPage = layoutPage.replace(/import \{ Footer \} from "@\/components\/shop\/footer";\n/g, '');
layoutPage = layoutPage.replace(/<Navbar \/>\n/g, '');
layoutPage = layoutPage.replace(/<Footer \/>\n/g, '');
fs.writeFileSync('c:\\Users\\CHITECH\\Documents\\Beauty-booking-system\\src\\app\\layout.tsx', layoutPage, 'utf8');

// 3. Fix src/lib/utils.ts
let utils = fs.readFileSync('c:\\Users\\CHITECH\\Documents\\Beauty-booking-system\\src\\lib\\utils.ts', 'utf8');
// remove duplicate USD: "$"
const lines = utils.split('\n');
const seen = new Set();
const newLines = lines.filter(line => {
  if (line.includes('USD: "$",') || line.includes('USD: "$"')) {
    if (seen.has('USD')) return false;
    seen.add('USD');
  }
  return true;
});
fs.writeFileSync('c:\\Users\\CHITECH\\Documents\\Beauty-booking-system\\src\\lib\\utils.ts', newLines.join('\n'), 'utf8');

