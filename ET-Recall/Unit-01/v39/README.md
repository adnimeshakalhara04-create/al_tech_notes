# ET Unit 01 — v39

Production update for the A/L Engineering Technology Unit 01 study app.

## Changes
- Renamed the installed/web app from **ET Recall** to **ET Unit 01**.
- Fixed the image-touch bug where the full 5×6 image atlas could appear.
- Each question now resolves its exact `imageIndex` and shows only that single image.
- Guaranteed fallback creates a 600×450 high-quality canvas crop from the existing atlas.
- The app also attempts the corresponding Google Drive image at high resolution and upgrades automatically when browser access succeeds.
- Added a single-image clear-view overlay on tap.
- Retained PWA installation, standalone/fullscreen support, 300-question data integrity, practice, all-questions, and memory modes.
- Service worker cache updated to `et-unit-01-v39`.

## Production
https://et-recall-unit-01.vercel.app

Build marker: `v39-single-clear-crops`
