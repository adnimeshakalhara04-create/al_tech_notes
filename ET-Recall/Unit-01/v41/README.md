# ET Unit 01 v41

Build: `v41-clear-single-images`

This build fixes the image white-box problem seen in v40.

## Root cause fixed
v40 replaced the old atlas URL with a single Google Drive image but the base renderer still applied the atlas CSS (`background-size: 500% 600%` + atlas position) to that single image. That showed only a tiny corner of the real image, often appearing as a blank white box.

## v41 behavior
- Keeps the existing Unit 01 question-to-image mapping.
- Uses the exact mapped public Google Drive image at `w1600` quality.
- Renders a single image with `background-size: contain` and centered positioning.
- Keeps the old atlas crop as a second-layer fallback, so an image does not become an empty white box if Drive fails to load.
- No image touch zoom/popup.
- Works through the same renderer for Practice, All Questions, Memory, and Image Practice.
- Keeps 300 questions, ET Unit 01 PWA name/icon, install support and Full Screen.
- Service worker version bumped to `et-unit-01-v41` and old caches are removed on activation.

Production: https://et-recall-unit-01.vercel.app

Vercel deployment: `dpl_FGA4WFvu9jHyrxQFaTqs4n4978tf`
