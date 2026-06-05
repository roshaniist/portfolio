from PIL import Image, ImageOps, ImageEnhance, ImageFilter
from pathlib import Path

def main():
    root = Path(__file__).resolve().parents[1]
    src = root / "src" / "assets" / "roshan-profile.jpg"
    out = root / "src" / "assets" / "roshan-profile-edited.jpg"

    if not src.exists():
        print(f"Source image not found: {src}")
        return

    img = Image.open(src).convert("RGB")

    # Auto-contrast
    img = ImageOps.autocontrast(img, cutoff=0)

    # Center square crop
    w, h = img.size
    s = min(w, h)
    left = (w - s) // 2
    top = (h - s) // 2
    img = img.crop((left, top, left + s, top + s))

    # Resize to a standard profile size
    target = (1024, 1024)
    img = img.resize(target, Image.LANCZOS)

    # Gentle color / contrast / sharpness adjustments
    img = ImageEnhance.Color(img).enhance(1.05)
    img = ImageEnhance.Brightness(img).enhance(1.02)
    img = ImageEnhance.Contrast(img).enhance(1.05)
    img = ImageEnhance.Sharpness(img).enhance(1.25)

    img.save(out, quality=92)
    print(f"Saved edited image to: {out}")

if __name__ == '__main__':
    main()
