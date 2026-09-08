import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Precise SVG definitions for the DentiSure brand mark & logo variations

// Common SVG Gradients and Filters
const SVG_DEFS = `
<defs>
  <!-- Tooth Gradient: Deep Navy to Vibrant Cyan-Teal -->
  <linearGradient id="toothGradient" x1="0%" y1="100%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#072238" />
    <stop offset="40%" stop-color="#0A365C" />
    <stop offset="70%" stop-color="#00808F" />
    <stop offset="100%" stop-color="#00A7B5" />
  </linearGradient>

  <!-- Growth Bars & Swoop Arrow Gradient -->
  <linearGradient id="chartGradient" x1="0%" y1="100%" x2="40%" y2="0%">
    <stop offset="0%" stop-color="#007788" />
    <stop offset="100%" stop-color="#00A7B5" />
  </linearGradient>

  <!-- Soft ground shadow under tooth roots -->
  <radialGradient id="groundShadow" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#072238" stop-opacity="0.25" />
    <stop offset="50%" stop-color="#0A365C" stop-opacity="0.08" />
    <stop offset="100%" stop-color="#0A365C" stop-opacity="0" />
  </radialGradient>
</defs>
`;

/**
 * Generates the Tooth Symbol with 3-bar growth chart & upward arrow.
 * ViewBox coordinate space: 0 0 140 140
 */
function getToothSymbolSvg(includeShadow = true) {
  return `
    ${includeShadow ? `
      <!-- Ground Shadow underneath tooth roots -->
      <ellipse cx="66" cy="126" rx="42" ry="6.5" fill="url(#groundShadow)" />
    ` : ''}

    <g id="tooth-mark">
      <!-- Outer Tooth Contour Outline -->
      <path 
        d="M 38 24 
           C 22 28, 14 44, 15 62 
           C 16 78, 22 92, 28 108 
           C 31 116, 36 122, 42 120 
           C 48 118, 51 106, 53 96 
           C 54 88, 57 82, 65 82 
           C 73 82, 76 88, 77 96 
           C 79 106, 82 118, 88 120 
           C 94 122, 99 116, 102 108 
           C 108 92, 114 78, 115 62 
           C 116 44, 108 28, 92 24 
           C 82 21, 74 25, 65 25 
           C 56 25, 48 21, 38 24 Z"
        fill="none" 
        stroke="url(#toothGradient)" 
        stroke-width="7.5" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />

      <!-- Dynamic Rising Swoop Arc (starting from left root curve) -->
      <path 
        d="M 27 86 
           C 35 94, 46 95, 56 86 
           C 68 75, 78 58, 88 42" 
        fill="none" 
        stroke="url(#chartGradient)" 
        stroke-width="4.2" 
        stroke-linecap="round" 
      />

      <!-- 3 Growth Histogram Bars (as in the client original design) -->
      <!-- Bar 1 (Shortest) -->
      <rect x="44" y="73" width="7.5" height="17" rx="1.5" fill="url(#chartGradient)" />
      <!-- Bar 2 (Medium) -->
      <rect x="55" y="61" width="7.5" height="29" rx="1.5" fill="url(#chartGradient)" />
      <!-- Bar 3 (Tallest) -->
      <rect x="66" y="49" width="7.5" height="41" rx="1.5" fill="url(#chartGradient)" />

      <!-- Upward Growth Arrow pointing towards top-right crown -->
      <path 
        d="M 86 44 
           C 90 38, 93 33, 96 27" 
        fill="none" 
        stroke="url(#chartGradient)" 
        stroke-width="4.8" 
        stroke-linecap="round" 
      />
      <!-- Arrowhead -->
      <polygon 
        points="97,22 86,28 94,34" 
        fill="#00A7B5" 
      />
    </g>
  `;
}

/**
 * Generates the full horizontal logo (Tooth + Divider + Text)
 * Width: 620, Height: 150
 */
function getFullLogoSvg(isTransparent = true) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 150" width="620" height="150">
    ${SVG_DEFS}
    ${!isTransparent ? `<rect width="620" height="150" fill="#FFFFFF" />` : ''}
    
    <!-- Left: Tooth Symbol (scaled and translated) -->
    <g transform="translate(10, 5) scale(0.95)">
      ${getToothSymbolSvg(true)}
    </g>

    <!-- Center: Elegant Vertical Divider Line -->
    <line x1="150" y1="26" x2="150" y2="124" stroke="#0B2540" stroke-width="2" stroke-opacity="0.85" stroke-linecap="round" />

    <!-- Right: Brand Logotype -->
    <g transform="translate(170, 0)">
      <!-- Line 1: Dentisure with Leaf dot on the 'i' -->
      <g transform="translate(0, 68)">
        <!-- "Dent" in deep navy -->
        <text x="0" y="0" font-family="system-ui, -apple-system, 'Manrope', 'Segoe UI', sans-serif" font-size="53" font-weight="800" fill="#0A2540" letter-spacing="-0.02em">Dent</text>
        
        <!-- 'i' stem in navy -->
        <rect x="120" y="-36" width="9" height="36" rx="1.5" fill="#0A2540" />
        
        <!-- Stylized Leaf/Petal dot of the 'i' in vibrant teal -->
        <path d="M 124 -43 C 120 -51, 127 -57, 135 -55 C 136 -47, 130 -41, 124 -43 Z" fill="#00A7B5" />
        
        <!-- "sure" in vibrant ocean teal -->
        <text x="136" y="0" font-family="system-ui, -apple-system, 'Manrope', 'Segoe UI', sans-serif" font-size="53" font-weight="700" fill="#00A7B5" letter-spacing="-0.02em">sure</text>
      </g>

      <!-- Line 2: Horizontal rules + SOLUTIONS -->
      <g transform="translate(0, 95)">
        <!-- Left line (Teal, matching original design) -->
        <line x1="2" y1="-5" x2="68" y2="-5" stroke="#00A7B5" stroke-width="2" />
        <!-- SOLUTIONS -->
        <text x="78" y="0" font-family="system-ui, -apple-system, 'Manrope', 'Segoe UI', sans-serif" font-size="16" font-weight="800" fill="#0A2540" letter-spacing="0.36em">SOLUTIONS</text>
        <!-- Right line (Navy, matching original design) -->
        <line x1="268" y1="-5" x2="336" y2="-5" stroke="#0A2540" stroke-width="2" />
      </g>

      <!-- Line 3: Tagline: "Your Certainty in Dental Revenue" -->
      <g transform="translate(18, 122)">
        <text x="0" y="0" font-family="system-ui, -apple-system, 'Manrope', 'Segoe UI', sans-serif" font-size="14.5" font-weight="600" fill="#0A2540" letter-spacing="0.08em">Your Certainty in <tspan fill="#00A7B5" font-weight="700">Dental Revenue</tspan></text>
      </g>
    </g>
  </svg>`;
}

/**
 * Generates Favicon SVG (Square, White background matching client DentiSure_Favicon_White_Background.png)
 * Dimensions: 512x512
 */
function getFaviconWhiteSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    ${SVG_DEFS}
    <!-- Solid Crisp Pure White Background Card -->
    <rect width="512" height="512" fill="#FFFFFF" />
    
    <!-- Tooth Logo Centered (with 3 bars and arrow) -->
    <g transform="translate(56, 52) scale(2.9)">
      ${getToothSymbolSvg(true)}
    </g>

    <!-- Vertical Line separator segment on the right edge (as in client crop) -->
    <line x1="472" y1="120" x2="472" y2="392" stroke="#0B2540" stroke-width="6" stroke-opacity="0.9" stroke-linecap="round" />
  </svg>`;
}

/**
 * Generates Favicon SVG (Square, Transparent background)
 * Dimensions: 512x512
 */
function getFaviconTransparentSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    ${SVG_DEFS}
    <!-- Tooth Logo Centered (Transparent) -->
    <g transform="translate(56, 52) scale(2.9)">
      ${getToothSymbolSvg(false)}
    </g>
  </svg>`;
}

/**
 * Generates the All-In-One Client Brand Asset Sheet
 * Showing all 5 variations side by side, exactly as in the client's uploaded image!
 * Width: 1200, Height: 440
 */
function getBrandAssetSheetSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 440" width="1200" height="440">
    ${SVG_DEFS}
    <rect width="1200" height="440" fill="#F8FAFC" />

    <!-- Top Row: Full Logos -->
    <!-- 1. Top Left: LOGO (PNG - WHITE BACKGROUND) -->
    <g transform="translate(20, 20)">
      <rect width="560" height="150" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" />
      <g transform="translate(0, 0) scale(0.9)">
        <!-- Scaled logo -->
        ${getFullLogoSvg(false)}
      </g>
      <!-- Badge -->
      <g transform="translate(160, 160)">
        <rect width="240" height="26" rx="6" fill="#0056B3" />
        <text x="120" y="17" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.05em">LOGO (PNG - WHITE BACKGROUND)</text>
      </g>
    </g>

    <!-- 2. Top Right: LOGO (PNG - TRANSPARENT BACKGROUND) -->
    <g transform="translate(620, 20)">
      <rect width="560" height="150" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" />
      <!-- Checkerboard subtle pattern behind transparent logo -->
      <g transform="translate(0, 0) scale(0.9)">
        ${getFullLogoSvg(true)}
      </g>
      <!-- Badge -->
      <g transform="translate(150, 160)">
        <rect width="260" height="26" rx="6" fill="#0056B3" />
        <text x="130" y="17" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.05em">LOGO (PNG - TRANSPARENT BACKGROUND)</text>
      </g>
    </g>

    <!-- Bottom Row: Favicons -->
    <!-- 3. Bottom Left: FAVICON (PNG - WHITE BACKGROUND) -->
    <g transform="translate(160, 220)">
      <rect x="40" y="10" width="130" height="130" rx="12" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" />
      <g transform="translate(52, 20) scale(0.75)">
        ${getToothSymbolSvg(true)}
      </g>
      <!-- Badge -->
      <g transform="translate(0, 155)">
        <rect width="210" height="26" rx="6" fill="#0056B3" />
        <text x="105" y="17" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.05em">FAVICON (PNG - WHITE BACKGROUND)</text>
      </g>
    </g>

    <!-- 4. Bottom Middle: FAVICON (PNG - TRANSPARENT BACKGROUND) -->
    <g transform="translate(480, 220)">
      <rect x="40" y="10" width="130" height="130" rx="12" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" stroke-dasharray="4,4" />
      <g transform="translate(52, 20) scale(0.75)">
        ${getToothSymbolSvg(false)}
      </g>
      <!-- Badge -->
      <g transform="translate(-15, 155)">
        <rect width="240" height="26" rx="6" fill="#0056B3" />
        <text x="120" y="17" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.05em">FAVICON (PNG - TRANSPARENT BACKGROUND)</text>
      </g>
    </g>

    <!-- 5. Bottom Right: FAVICON (ICO STYLE - 512x512 PNG) -->
    <g transform="translate(820, 220)">
      <rect x="40" y="10" width="130" height="130" rx="12" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" />
      <g transform="translate(52, 20) scale(0.75)">
        ${getToothSymbolSvg(true)}
      </g>
      <!-- Badge -->
      <g transform="translate(0, 155)">
        <rect width="210" height="26" rx="6" fill="#0056B3" />
        <text x="105" y="17" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.05em">FAVICON (ICO STYLE - 512x512 PNG)</text>
      </g>
    </g>
  </svg>`;
}

async function run() {
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  console.log('Generating brand SVG assets...');
  const logoWhiteSvg = getFullLogoSvg(false);
  const logoTransparentSvg = getFullLogoSvg(true);
  const faviconWhiteSvg = getFaviconWhiteSvg();
  const faviconTransparentSvg = getFaviconTransparentSvg();
  const brandSheetSvg = getBrandAssetSheetSvg();

  // Write SVGs
  fs.writeFileSync(path.join(publicDir, 'logo-white.svg'), logoWhiteSvg);
  fs.writeFileSync(path.join(publicDir, 'logo-transparent.svg'), logoTransparentSvg);
  fs.writeFileSync(path.join(publicDir, 'favicon-white.svg'), faviconWhiteSvg);
  fs.writeFileSync(path.join(publicDir, 'favicon-transparent.svg'), faviconTransparentSvg);
  fs.writeFileSync(path.join(publicDir, 'brand-asset-sheet.svg'), brandSheetSvg);

  console.log('Rendering high-resolution PNGs via Sharp...');
  
  // 1. Logo Transparent PNG (1240 x 300 for 2x retina)
  await sharp(Buffer.from(logoTransparentSvg))
    .resize(1240, 300)
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'logo-transparent.png'));

  // 2. Logo White Background PNG (1240 x 300 for 2x retina)
  await sharp(Buffer.from(logoWhiteSvg))
    .resize(1240, 300)
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'logo-white.png'));

  // 3. Favicon White Background (512x512) - Both naming conventions
  await sharp(Buffer.from(faviconWhiteSvg))
    .resize(512, 512)
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'DentiSure_Favicon_White_Background.png'));

  await sharp(Buffer.from(faviconWhiteSvg))
    .resize(512, 512)
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'favicon-white.png'));

  await sharp(Buffer.from(faviconWhiteSvg))
    .resize(512, 512)
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'favicon-512.png'));

  // 4. Standard Favicon (32x32 and 192x192)
  await sharp(Buffer.from(faviconWhiteSvg))
    .resize(192, 192)
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'favicon-192.png'));

  await sharp(Buffer.from(faviconWhiteSvg))
    .resize(32, 32)
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'favicon.png'));

  await sharp(Buffer.from(faviconWhiteSvg))
    .resize(32, 32)
    .toFile(path.join(publicDir, 'favicon.ico'));

  // Apple touch icon
  await sharp(Buffer.from(faviconWhiteSvg))
    .resize(180, 180)
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  // Favicon transparent PNG (512x512)
  await sharp(Buffer.from(faviconTransparentSvg))
    .resize(512, 512)
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'favicon-transparent.png'));

  // All-in-one brand sheet PNG (2400 x 880 for high-DPI display)
  await sharp(Buffer.from(brandSheetSvg))
    .resize(2400, 880)
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'brand-asset-sheet.png'));

  console.log('All brand logo & favicon assets successfully generated in /public!');
}

run().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
