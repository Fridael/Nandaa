# THE GARDEN WE NEVER MET — NANDA EDITION

Versi personal untuk Nanda.

Konsepnya sengaja tidak membuat foto, tempat, perjalanan, atau pertemuan palsu. Cerita dibangun dari hal-hal yang benar-benar disebutkan: waktu virtual bersama, telepon, menonton film, bermain game, panggilan "Nanda / yali yali aku / kesayangan aku", jarak, serta satu malam ketika Nanda sempat menunggu dan akhirnya tertidur.

## Struktur

- `index.html`
- `style.css`
- `script.js`
- `assets/`

## Personalize

Semua cerita utama ada di bagian atas `script.js`:
- `DAYS`
- `LITTLE_WORDS`
- `ORDINARY_DAYS`
- `FLOATING_WORDS`
- `GARDEN_SURPRISES`

## GitHub Pages

1. Buat repository GitHub.
2. Upload seluruh isi folder project.
3. Settings → Pages.
4. Pilih Deploy from a branch.
5. Pilih branch `main` dan folder `/ (root)`.
6. Save.
7. Buka URL GitHub Pages yang dibuat GitHub.

Tidak membutuhkan npm, Node.js, backend, database, build command, atau server.


## Foto Nanda

Tambahkan 10 foto pribadi ke `assets/photos/` dengan nama:
`nanda-01.jpg` ... `nanda-10.jpg`.

Foto ditampilkan di halaman khusus setelah taman, dengan rasio 1:1 menggunakan `object-fit: cover`.

## Musik YouTube

Video YouTube yang dipakai: **Rizky Febian — Hingga Tua Bersama** (`b5ZQob-mDGM`). YouTube IFrame API dipakai untuk meminta autoplay. Karena browser modern dapat memblokir autoplay bersuara, video dimulai muted lalu pada interaksi pertama halaman mencoba mengaktifkan suara kembali.


## Scene 10 bug fix

The flowers in "Taman Kita" are now restricted to safe outer/lower areas, while the central text is placed above the garden layer. Flower buttons remain tappable without covering the story or navigation.


## Photo files

Add 20 JPG files inside `assets/photos/`:

- `nanda-01.jpg` through `nanda-10.jpg` — Nanda photos, with captions.
- `nanda-11.jpg` through `nanda-20.jpg` — game screenshots, displayed without captions.
