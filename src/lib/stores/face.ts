import { writable } from 'svelte/store';

export const faceDetected = writable(false);
export const cameraActive = writable(false);
export const detectionRunning = writable(false);
export const privacyMode = writable(false);
