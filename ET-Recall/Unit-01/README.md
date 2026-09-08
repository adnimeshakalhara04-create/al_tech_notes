# ET Unit 01

Production: https://et-recall-unit-01.vercel.app

Current production build: `v44-inline-github-admin`

## Current Unit 01 app
- 300 recall questions (Q001–Q300).
- Practice, All Questions and Memory tabs.
- Image Practice with clear single-image Drive mapping and atlas fallback.
- Fourth tab: `📖 සම්පූර්ණ පාඩම`.
- Complete Unit 01 lesson in the original section order from 1.1 through 1.5.
- Source wording, sequence, bullet lists and lesson tables preserved.
- Relevant original Unit 01 Google Drive images placed beside matching lesson topics.
- Premium spacious reading layout with wider content shell, larger spacing, responsive tables, image galleries and mobile-friendly scrollable navigation.
- ET Unit 01 PWA name/icon, install support and Full Screen preserved.

## v44 inline global image admin
Inside the Complete Lesson view, pressing `⚙️ Admin` toggles inline controls directly on each lesson image:
- `🗑️ Image අයින් කරන්න`
- `📁 අලුත් Image දාන්න`
- `↩ Original`

Image changes are globally persisted in GitHub rather than only the local browser. Uploaded images are committed under `ET-Recall/Unit-01/v44/live-images/`, and `v44/live-images.json` stores the active per-slot mapping. Every device reads the public live map on page load.

Admin writes require a fine-grained GitHub token scoped to this repository with `Contents: Read and write`. The token is never hard-coded or committed and is kept only in browser `sessionStorage` for the active session.

## Source snapshots
- `ET-Recall/Unit-01/v42/` — complete lesson content/UI baseline.
- `ET-Recall/Unit-01/v44/` — current production wrapper, global image map and inline admin runtime.

Key v44 files:
- `v44/index.html`
- `v44/inline-admin-global.js`
- `v44/live-images.json`
- `v44/manifest.webmanifest`
- `v44/sw.js`

## Lesson source
The complete lesson content is grounded in the connected Google Drive Unit 01 lesson document and the Unit 01 lesson-image folders. Image order/mapping follows the Unit 01 app mapping rather than arbitrary placement.
