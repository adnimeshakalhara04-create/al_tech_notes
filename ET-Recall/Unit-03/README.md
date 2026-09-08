# ET Unit 03

Production: https://et-unit-03.vercel.app

Current upgrade baseline: `v1.3.0-global-admin`

## Complete Lesson
- `📖 සම්පූර්ණ පාඩම` preserves the approved Unit 03 canonical lesson in original 3.1 → 3.5 order.
- Existing Practice, All Questions, Memory, search, filters, image practice, progress and PWA features are preserved.
- Built-in lesson images are mapped by semantic lesson meaning, not by random/index sequence.

## GitHub-global image admin
Global mapping root: `ET-Recall/Unit-03/v13/`
- map: `v13/live-images.json`
- admin-uploaded media: `v13/live-images/`

The app uses deterministic Unit 03 block/text anchors for image inserts and stable built-in image slots. Admin supports Replace / Remove / Original and image insertion at image-less lesson topics.

Admin writes require a fine-grained GitHub token with `Contents: Read and write` for this repository. The token is never committed or hard-coded and is kept only in browser `sessionStorage` for the current session.

The v1.3.0 full deployable source archive is also stored in the user's Google Drive Unit 03 folder as `et-unit-03-build-v1.3.0.tar.gz` (SHA-256 `1db427790960a70e37c911dff65b410f6459ecc6361c1ac044aaa7a3996c6a66`).

If a browser still has older v1.2 device-local IndexedDB lesson-image edits, v1.3 exposes a `Local → Global` migration action after GitHub Connect so same-device overrides can be carried into the global map.
