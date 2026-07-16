<script lang="ts">
	import { faceDetected, cameraActive, detectionRunning, privacyMode } from '$lib/stores/face';
</script>

<div class="status-bar">
	<div class="indicator" class:detected={$faceDetected}>
		<span class="dot"></span>
		{$faceDetected ? 'Face Detected' : 'No Face Detected'}
	</div>
	<div class="meta">
		<span>Camera: {$cameraActive ? 'Active' : 'Inactive'}</span>
		<span>Detection: {$detectionRunning ? 'Running' : 'Stopped'}</span>
		<span>Privacy: {$privacyMode ? 'ON' : 'OFF'}</span>
	</div>
</div>

<style>
	.status-bar {
		width: 100%;
		max-width: 960px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 0;
	}

	.indicator {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 14px;
		color: #e74c3c;
		font-weight: 500;
	}

	.indicator.detected {
		color: #2ecc71;
	}

	.dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: #e74c3c;
	}

	.indicator.detected .dot {
		background: #2ecc71;
	}

	.meta {
		display: flex;
		gap: 16px;
		font-size: 12px;
		color: #888;
	}
</style>
