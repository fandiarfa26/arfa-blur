import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

const DETECTION_DELAY_MS = 400;

export interface BoundingBox {
	x: number;
	y: number;
	width: number;
	height: number;
}

export interface DetectionResult {
	hasFace: boolean;
	boundingBoxes: BoundingBox[];
}

export interface FaceDetector {
	detect(video: HTMLVideoElement): DetectionResult;
	destroy(): void;
}

let faceLandmarker: FaceLandmarker | null = null;

export async function createFaceDetector(): Promise<FaceDetector> {
	if (!faceLandmarker) {
		const vision = await FilesetResolver.forVisionTasks(
			'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
		);
		faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
			baseOptions: {
				modelAssetPath:
					'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
				delegate: 'GPU'
			},
			runningMode: 'VIDEO',
			numFaces: 10
		});
	}

	let lastFaceLostAt = 0;
	let currentlyHasFace = false;

	function computeBoundingBox(landmarks: { x: number; y: number }[]): BoundingBox {
		let minX = Infinity,
			minY = Infinity,
			maxX = -Infinity,
			maxY = -Infinity;
		for (const lm of landmarks) {
			if (lm.x < minX) minX = lm.x;
			if (lm.y < minY) minY = lm.y;
			if (lm.x > maxX) maxX = lm.x;
			if (lm.y > maxY) maxY = lm.y;
		}
		const padding = 0.1;
		const w = maxX - minX;
		const h = maxY - minY;
		const padX = w * padding;
		const padY = h * padding;
		return {
			x: minX - padX,
			y: minY - padY,
			width: w + padX * 2,
			height: h + padY * 2
		};
	}

	return {
		detect(video: HTMLVideoElement): DetectionResult {
			if (video.readyState < 2) return { hasFace: currentlyHasFace, boundingBoxes: [] };

			const result = faceLandmarker!.detectForVideo(video, performance.now());
			const faceDetected = result.faceLandmarks.length > 0;

			if (faceDetected) {
				currentlyHasFace = true;
				lastFaceLostAt = 0;
			} else {
				if (lastFaceLostAt === 0) {
					lastFaceLostAt = performance.now();
				}
				if (performance.now() - lastFaceLostAt >= DETECTION_DELAY_MS) {
					currentlyHasFace = false;
				}
			}

			const boundingBoxes = currentlyHasFace
				? result.faceLandmarks.map(computeBoundingBox)
				: [];

			return { hasFace: currentlyHasFace, boundingBoxes };
		},
		destroy(): void {
			if (faceLandmarker) {
				faceLandmarker.close();
				faceLandmarker = null;
			}
		}
	};
}
