export async function requestCamera(): Promise<MediaStream> {
	return navigator.mediaDevices.getUserMedia({
		video: {
			width: { ideal: 1280 },
			height: { ideal: 720 },
			facingMode: 'user'
		},
		audio: false
	});
}

export function stopCamera(stream: MediaStream): void {
	for (const track of stream.getTracks()) {
		track.stop();
	}
}
