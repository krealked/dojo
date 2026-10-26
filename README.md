# Dojo Task — Responsive Landings

## Stack
- **Build Tool:** Vite (Multi-Page Application mode)
- **Markup:** Native HTML5 (Semantic, Accessible)
- **Styling:** Vanilla CSS3 (Mobile-First approach, CSS Custom Properties, Flexbox / CSS Grid)
- **Scripts:** Vanilla JavaScript (ES Modules, Client-side validation)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Preview production build:
   ```bash
   npm run preview
   ```

## Assumptions & Design Deviations
- **Figma Access:** Connected successfully to file `OR8wR7dtXtunLjuFd79NPh` ("Светлый Дом").
- **Extracted Design Tokens:**
  - **Color Palette:**
    - Paper (Background): `#F1EDE2`
    - Ink (Text): `#211B18`
    - Muted (Secondary Text): `#655B54`
    - Line (Borders): `#C7BEB2`
    - Accent / Primary (Buttons): `#302038`
    - Hover State: `#E9E3D6`
    - White: `#FFFFFF`
  - **Typography:**
    - Headings (H1, H2): `Oranienbaum` (Regular, 72px / 48px)
    - Body, Labels, Navigation: `Manrope` (Regular / Medium / Bold, 16px base)
  - **Layout:** Container max-width `1200px`.
- **Landing 1 Form Assumption:** In addition to the footer contact link found in the Figma layout, an interactive application form with client-side live validation (`validator.js`) has been added to the contact/footer section to fulfill the requirement for demonstrative forms without external CRM dependencies.



