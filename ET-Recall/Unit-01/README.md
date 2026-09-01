# ET Recall • Unit 01

Production: https://et-recall-unit-01.vercel.app

This source snapshot restores the Unit 01 dataset to **Q001–Q300** and adds lesson-image practice based on the images in the Google Drive `Unit 01` folder.

## What changed

- Fixed the broken Q258 JavaScript string that caused Q256–Q271 to fail to load (284/300 bug).
- Added integrity checking for 300 unique question IDs.
- Added Drive-image mappings to relevant Unit 01 questions.
- Replaced Q291–Q300 with 10 image-based revision questions grounded in the Unit 01 lesson images.
- Added `Image Questions` practice mode.
- Added image display to the question list, memory-answer list, and practice modal.

## Runtime data

The compact production shell loads the existing Q001–Q239 and Q272–Q300 data services, the corrected Q240–Q271 service, and the Drive-image atlas/image mapping services hosted on Vercel.

Build marker: `v37-drive-images-300-final`
