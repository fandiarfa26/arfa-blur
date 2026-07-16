# Product Brief

## Project Name

**Arfa Blur**

---

# Overview

Arfa Blur adalah aplikasi web berbasis AI yang menggunakan webcam untuk mendeteksi keberadaan wajah secara real-time.

Ketika wajah tidak lagi terdeteksi, tampilan webcam akan otomatis diblur sebagai bentuk perlindungan privasi. Saat wajah kembali terdeteksi, efek blur akan dihapus secara otomatis.

Seluruh proses berjalan langsung di browser (on-device) tanpa mengirim gambar atau video ke server, sehingga menjaga privasi pengguna.

---

# Problem Statement

Saat melakukan meeting online, live streaming, atau merekam video, pengguna terkadang meninggalkan kamera tanpa mematikannya terlebih dahulu. Akibatnya, lingkungan sekitar tetap terlihat oleh orang lain.

Arfa Blur membantu mengurangi risiko tersebut dengan mengaburkan tampilan webcam secara otomatis ketika tidak ada wajah yang terdeteksi.

---

# Goals

- Mendeteksi keberadaan wajah secara real-time.
- Mengaktifkan efek blur ketika wajah tidak terdeteksi.
- Mengembalikan tampilan normal ketika wajah kembali terdeteksi.
- Berjalan sepenuhnya di browser tanpa backend.
- Menjaga privasi pengguna tanpa mengirim data ke internet.

---

# Target Users

- Developer
- Content Creator
- Streamer
- Remote Worker
- Mahasiswa
- Pengguna webcam sehari-hari

---

# Use Cases

### Online Meeting

Pengguna meninggalkan meja kerja tanpa mematikan kamera.

**Hasil:**
Video otomatis blur.

---

### Live Streaming

Streamer berdiri meninggalkan kursi.

**Hasil:**
Kamera otomatis blur sehingga ruangan tidak terlihat jelas.

---

### Recording

Saat proses rekaman berlangsung dan pengguna keluar dari frame.

**Hasil:**
Video menjadi blur sampai pengguna kembali.

---

# User Flow

```text
Open Website
      │
      ▼
Request Camera Permission
      │
      ▼
Camera Active
      │
      ▼
Detect Face
      │
      ├── Face Detected
      │        │
      │        ▼
      │   Blur OFF
      │
      └── No Face Detected
               │
               ▼
           Blur ON
```

---

# MVP Features

## Webcam

- Meminta izin akses kamera.
- Menampilkan preview webcam secara real-time.

---

## Face Detection

- Mendeteksi wajah secara terus-menerus.
- Memastikan minimal satu wajah terlihat di kamera.

---

## Blur Mode

- Blur aktif ketika wajah tidak terdeteksi.
- Blur nonaktif ketika wajah kembali terdeteksi.

---

## Detection Delay

Memberikan jeda sekitar 300–500 ms sebelum blur aktif agar kedipan deteksi sesaat tidak menyebabkan efek berkedip.

---

## Status Indicator

Menampilkan status sederhana.

Contoh:

- 🟢 Face Detected
- 🔴 No Face Detected

---

# Future Features

## Privacy Modes

Selain blur, pengguna dapat memilih:

- Pixelate
- Black Screen
- Custom Image
- Company Logo
- "Be Right Back" Screen

---

## Audio Notification

Memberikan suara ketika wajah menghilang atau kembali.

---

## Camera Settings

- Pilih kamera.
- Pilih resolusi.
- Mirror mode.
- Fullscreen mode.

---

## Statistics

Menampilkan informasi seperti:

- Total face lost.
- Lama kamera aktif.
- Total blur duration.

---

## Multi Face Detection

Pengaturan:

- Minimal 1 wajah
- Minimal 2 wajah
- Semua wajah harus terlihat

---

## Recording Support

Menambahkan kemampuan merekam video dengan efek blur yang diterapkan.

---

## OBS Integration

Menyediakan output yang mudah digunakan sebagai sumber kamera virtual untuk OBS.

---

# Non Functional Requirements

- Berjalan pada browser modern.
- Tidak membutuhkan backend.
- Tidak membutuhkan akun pengguna.
- Tidak mengirim video ke server.
- Performa tetap stabil pada 30 FPS.
- Responsif untuk desktop dan laptop.

---

# Technology Stack

## Frontend

- SvelteKit
- TypeScript

## AI

- MediaPipe Face Landmarker

## Styling

- CSS

## Build Tool

- Vite

---

# Project Structure

```text
src/
├── lib/
│   ├── ai/
│   │   └── faceDetector.ts
│   │
│   ├── components/
│   │   ├── Webcam.svelte
│   │   ├── StatusIndicator.svelte
│   │   └── BlurOverlay.svelte
│   │
│   ├── stores/
│   │   └── face.ts
│   │
│   └── utils/
│       └── camera.ts
│
├── routes/
│   └── +page.svelte
│
├── app.css
└── app.html
```

---

# UI Layout

```text
+--------------------------------------------------+

                Arfa Blur

        🟢 Face Detected

+----------------------------------------------+

             Webcam Preview

+----------------------------------------------+

Status:
Camera : Active
Detection : Running
Privacy : OFF

+--------------------------------------------------+
```

Ketika wajah hilang:

```text
+--------------------------------------------------+

                Arfa Blur

        🔴 No Face Detected

+----------------------------------------------+

          ████████████████████
          █████  BLURRED █████
          ████████████████████

+----------------------------------------------+

Status:
Camera : Active
Detection : Running
Privacy : ON

+--------------------------------------------------+
```

---

# Success Criteria

Aplikasi dianggap berhasil apabila:

- Kamera dapat diakses.
- Deteksi wajah berjalan secara real-time.
- Blur aktif ketika wajah tidak terdeteksi.
- Blur hilang ketika wajah kembali.
- Tidak ada data yang dikirim ke server.
- Berjalan lancar pada browser modern.

---

# Out of Scope (MVP)

Fitur berikut tidak termasuk pada versi pertama:

- Login
- User Account
- Database
- Cloud Processing
- AI Server
- Upload Video
- Video Recording
- Mobile App
- Browser Extension

---

# Roadmap

## Version 1.0

- Webcam
- Face Detection
- Blur Mode
- Detection Delay
- Status Indicator

---

## Version 1.1

- Pixelation
- Camera Selector
- Resolution Selector
- Fullscreen

---

## Version 1.2

- Statistics
- Audio Notification
- Privacy Screen
- Recording Support

---

## Version 2.0

- OBS Integration
- Virtual Camera
- Browser Extension
- Multiple Privacy Modes

---

# Value Proposition

Arfa Blur adalah aplikasi webcam berbasis AI yang secara otomatis melindungi privasi pengguna dengan mengaburkan tampilan kamera ketika tidak ada wajah yang terdeteksi.

Seluruh proses dilakukan langsung di browser tanpa mengirim data ke server, sehingga cepat, ringan, dan menjaga privasi pengguna.

---

# License

MIT License
