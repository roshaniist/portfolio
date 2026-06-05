const sharp = require('sharp');
const path = require('path');

async function main() {
  const root = path.resolve(__dirname, '..');
  const src = path.join(root, 'src', 'assets', 'roshan-profile.jpg');
  const out = path.join(root, 'src', 'assets', 'roshan-profile-edited.jpg');

  try {
    const img = sharp(src);
    const meta = await img.metadata();
    const w = meta.width;
    const h = meta.height;
    const s = Math.min(w, h);
    const left = Math.floor((w - s) / 2);
    const top = Math.floor((h - s) / 2);

    await img
      .extract({ left, top, width: s, height: s })
      .resize(1024, 1024, { fit: 'cover' })
      .normalize() // auto contrast
      .modulate({ brightness: 1.02, saturation: 1.05 })
      .sharpen()
      .jpeg({ quality: 92 })
      .toFile(out);

    console.log('Saved edited image to:', out);
  } catch (err) {
    console.error('Error processing image:', err.message);
    process.exitCode = 1;
  }
}

main();
