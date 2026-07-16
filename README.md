# Arfa Blur

AI-powered webcam privacy app that automatically blurs your camera when no face is detected. Runs entirely in the browser — no data leaves your device.

## Features

- **Real-time face detection** using MediaPipe Face Landmarker
- **Auto blur** when no face is detected, unblur when face returns
- **Multi-face detection** — detects up to 10 faces with labeled bounding boxes
- **Fade transitions** for smooth blur/unblur effect
- **Detection delay** to prevent flickering on brief detection loss
- **100% on-device** — no server, no data upload

## Tech Stack

- [SvelteKit](https://kit.svelte.dev/)
- [MediaPipe Face Landmarker](https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker)
- TypeScript
- Vite

## Getting Started

```bash
# install dependencies
pnpm install

# start dev server
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser and allow camera access when prompted.

## Build

```bash
pnpm build
```

## How It Works

1. Camera stream is displayed in a `<video>` element
2. MediaPipe Face Landmarker detects faces on each frame
3. If face is detected → blur OFF, bounding boxes drawn on canvas
4. If no face detected (for 400ms+) → blur ON with fade transition
5. All processing happens in-browser using WebGL/GPU acceleration

## License

MIT
