<script lang="ts">
	import StatusIndicator from '$lib/components/StatusIndicator.svelte';
	import Webcam from '$lib/components/Webcam.svelte';
</script>

<svelte:head>
	<title>Camera Blur</title>
</svelte:head>

<main>
	<StatusIndicator />
	<Webcam />
</main>

<style>
	main {
		max-width: 1024px;
		margin: 0 auto;
		padding: 40px 24px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
	}

	h1 {
		font-size: 28px;
		font-weight: 700;
		color: #eee;
		margin: 0;
	}
</style>
