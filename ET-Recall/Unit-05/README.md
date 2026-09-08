# ET Recall — Unit 05

Production: https://et-unit-05.vercel.app

## Canonical Complete Lesson
`📖 සම්පූර්ණ පාඩම` keeps the existing 36 canonical Unit 05 lesson blocks in their original order. The canonical title/section/title/eyebrow/HTML payload hash is `ac7fdaf3332de5483885b47c75e000289abb1dc2a3a3c3d66b66c829f8e70668`; the premium/global upgrade changes image mapping, semantic anchors, UI and Admin behavior, not canonical lesson text.

## Preserved study engine
- 300 questions (`q001` → `q300`)
- Practice / All Questions / Memory / Image Practice
- search, filters, progress/saved-state behavior
- formula/calculation trainer
- fullscreen/install/PWA behavior

## Unit 01-style premium/global architecture
- dark/navy/black + orange accent
- spacious responsive reading shell
- horizontally scrollable main tabs on narrow screens
- semantically audited Complete Lesson image mapping; no random index mapping
- stable semantic anchors such as `u05-chain-drive`, `u05-belt-drive`, `u05-idler-gear`, `u05-compound-gear-q03`, `u05-bevel-gears`, `u05-final-drive`, plus deterministic content hashes
- floating inline `⚙️ Admin` editor

## GitHub-global image Admin
Mapping: `ET-Recall/Unit-05/live-images.json`
Uploads: `ET-Recall/Unit-05/live-images/`

Priority:
1. GitHub global override/insert
2. semantically verified original Unit 05 image mapping
3. no image rather than an unrelated image

Admin supports Replace / Remove / Restore Original / Edit Caption and `➕ Image මෙතැන දාන්න` on text-only topic anchors. Browser uploads are resized to a maximum dimension of 1800 px and converted to WebP at about 0.88 quality where supported.

GitHub credentials are never hard-coded or committed. The app follows the Unit 01 GitHub Connect pattern and keeps the fine-grained token only in browser `sessionStorage` for the current session.

Legacy browser-local `et-u5-lesson-admin-v1` / IndexedDB data is not deleted by the upgrade. It is not treated as the global source of truth.

## Drive production source
Versioned full source archive: `ET Unit 05 - Premium Global v4.zip`
Drive file ID: `14WuLWDR2jx6dXadsEOkM-ICWEnKFLfWY`
SHA-256: `51ba3d5b4be667e21131dd9914f091af49164ebf1e68cf3dd5b26ee69a2c0b24`
