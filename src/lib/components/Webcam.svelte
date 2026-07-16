<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	import { requestCamera, stopCamera } from '$lib/utils/camera';
	import { createFaceDetector } from '$lib/ai/faceDetector';
	import { faceDetected, cameraActive, detectionRunning, privacyMode } from '$lib/stores/face';
	import type { FaceDetector, BoundingBox } from '$lib/ai/faceDetector';

	let videoEl: HTMLVideoElement;
	let canvasEl: HTMLCanvasElement;
	let stream: MediaStream | null = null;
	let detector: FaceDetector | null = null;
	let animFrameId: number | null = null;

	function drawBoxes(boxes: BoundingBox[]) {
		const ctx = canvasEl?.getContext('2d');
		if (!ctx || !canvasEl) return;
		ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

		ctx.font = '16px monospace';
		ctx.fillStyle = '#00ff88';
		ctx.strokeStyle = '#00ff88';
		ctx.lineWidth = 3;

		boxes.forEach((box, i) => {
			const x = box.x * canvasEl.width;
			const y = box.y * canvasEl.height;
			const w = box.width * canvasEl.width;
			const h = box.height * canvasEl.height;

			ctx.strokeRect(x, y, w, h);

			const label = `Face ${i + 1}`;
			const textWidth = ctx.measureText(label).width;
			const labelX = x + (w - textWidth) / 2;
			const labelY = y - 6;

			ctx.fillStyle = '#000';
			ctx.fillRect(labelX - 2, labelY - 14, textWidth + 4, 18);
			ctx.fillStyle = '#00ff88';
			ctx.fillText(label, labelX, labelY);
		});
	}

	function resizeCanvas() {
		if (!videoEl || !canvasEl) return;
		canvasEl.width = videoEl.videoWidth;
		canvasEl.height = videoEl.videoHeight;
	}

	async function start() {
		try {
			stream = await requestCamera();
			videoEl.srcObject = stream;
			await videoEl.play();
			cameraActive.set(true);

			resizeCanvas();

			detector = await createFaceDetector();
			detectionRunning.set(true);

			function loop() {
				if (!detector || !videoEl) return;
				const { hasFace, boundingBoxes } = detector.detect(videoEl);
				faceDetected.set(hasFace);
				privacyMode.set(!hasFace);
				drawBoxes(boundingBoxes);
				animFrameId = requestAnimationFrame(loop);
			}
			loop();
		} catch (err) {
			console.error('Camera error:', err);
		}
	}

	function stop() {
		if (animFrameId !== null) cancelAnimationFrame(animFrameId);
		detector?.destroy();
		if (stream) stopCamera(stream);
		cameraActive.set(false);
		detectionRunning.set(false);
		faceDetected.set(false);
		privacyMode.set(false);
	}

	onMount(start);
	onDestroy(stop);
</script>

<svelte:window on:resize={resizeCanvas} />

<div class="webcam-container">
	<video bind:this={videoEl} playsinline muted onloadedmetadata={resizeCanvas}></video>
	<canvas bind:this={canvasEl} class="face-canvas"></canvas>
	{#if $privacyMode}
		<div class="blur-overlay" transition:fade={{ duration: 100 }}></div>
	{/if}
</div>

<style>
	.webcam-container {
		position: relative;
		width: 100%;
		max-width: 960px;
		margin: 0 auto;
		border-radius: 12px;
		overflow: hidden;
		background: #111;
		aspect-ratio: 16 / 9;
	}

	video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.face-canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.blur-overlay {
		position: absolute;
		inset: 0;
		backdrop-filter: blur(24px);
		-webkit-backdrop-filter: blur(24px);
	}
</style>
