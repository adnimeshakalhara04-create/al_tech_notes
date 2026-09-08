# ET Unit 01 v43 — Complete Lesson Image Admin

Build: `v43-image-admin`

## Added
- Floating `⚙️ Admin` control for the Complete Lesson.
- Replace any existing lesson image from a phone/PC file picker.
- Hide/show incorrect built-in images and restore the original at any time.
- `📍 Pick exact place` mode: tap the exact lesson heading/paragraph/list item, then choose a local image to insert directly after that point.
- Edit captions for inserted images and replace/remove them later.
- Uploaded local images are optimized and stored in IndexedDB so they survive refreshes and PWA reopen on the same browser/device.
- Premium mobile-friendly admin sheet and image-slot previews.

## Important storage behavior
This v43 static build stores admin uploads locally in the current browser/device. They do not automatically publish to every student's device. A shared/global admin requires a server-side storage/database layer (for example Firebase Storage + Firestore or Vercel Blob + a protected API).

## Preserved
- Complete Unit 01 lesson, 1.1–1.5.
- 300 recall questions.
- Practice, All Questions, Memory and Image Practice.
- PWA / Full Screen support.
