# In-Browser Image Classifier

A lightweight, real-time image classification tool built with **ml5.js** (MobileNet) and **p5.js**. It performs **Transfer Learning** entirely in the browser, allowing users to train a custom model using their webcam without backend processing.

**Try it here:** [redlightgreenlightml.netlify.app](https://redlightgreenlightml.netlify.app)

### How to Run
1. Use the Red/Blue buttons to capture ~15 labeled images for each category from your webcam.
2. Click **Train Model** to retrain the feature extractor.
3. Once trained, the app classifies the live video feed and updates the DOM dynamically.

### Tech Stack
* **ml5.js** (Feature extraction & Transfer Learning)
* **p5.js** (DOM manipulation)
* **Vanilla JS/HTML/CSS**
