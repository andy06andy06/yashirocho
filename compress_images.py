import os
import json
from PIL import Image

def compress_images():
    src_dir = "內裝照片"
    dest_large_dir = os.path.join("photos", "large")
    dest_thumb_dir = os.path.join("photos", "thumbs")
    
    # Create output directories
    os.makedirs(dest_large_dir, exist_ok=True)
    os.makedirs(dest_thumb_dir, exist_ok=True)
    
    # Find all image files
    valid_extensions = ('.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG')
    files = [f for f in os.listdir(src_dir) if f.lower().endswith(valid_extensions)]
    files.sort()
    
    print(f"Found {len(files)} photos in '{src_dir}'. Starting compression to WebP...")
    
    photo_manifest = []
    
    for i, filename in enumerate(files):
        src_path = os.path.join(src_dir, filename)
        base_name = os.path.splitext(filename)[0]
        
        large_filename = f"{base_name}.webp"
        thumb_filename = f"{base_name}_thumb.webp"
        
        large_path = os.path.join(dest_large_dir, large_filename)
        thumb_path = os.path.join(dest_thumb_dir, thumb_filename)
        
        try:
            with Image.open(src_path) as img:
                # Get image orientation/EXIF data and correct it if needed
                try:
                    # PIL sometimes doesn't auto-rotate based on EXIF, let's fix it
                    from PIL import ImageOps
                    img = ImageOps.exif_transpose(img)
                except Exception as e:
                    print(f"EXIF rotation error for {filename}: {e}")

                # 1. Compress Large Image (Max width/height 1920)
                img_large = img.copy()
                img_large.thumbnail((1920, 1920), Image.Resampling.LANCZOS)
                img_large.save(large_path, "WEBP", quality=85)
                
                # 2. Compress Thumbnail (Max width/height 600)
                img_thumb = img.copy()
                img_thumb.thumbnail((600, 600), Image.Resampling.LANCZOS)
                img_thumb.save(thumb_path, "WEBP", quality=75)
                
                # Add to manifest
                photo_manifest.append({
                    "id": i + 1,
                    "original": filename,
                    "large": f"photos/large/{large_filename}",
                    "thumb": f"photos/thumbs/{thumb_filename}",
                    # Set default category, title and description
                    "category": "interior" if i % 3 != 0 else ("room" if i % 2 == 0 else "detail"),
                    "title": f"美學空間特寫 {i+1}" if i % 3 == 0 else (f"溫馨客房角 {i+1}" if i % 2 == 0 else f"民宿休閒空間 {i+1}"),
                    "description": "陽光灑落的午後，細細品味生活中的每一處精緻設計。"
                })
                
                print(f"[{i+1}/{len(files)}] Compressed {filename} -> WebP Large ({os.path.getsize(large_path)//1024}KB), Thumb ({os.path.getsize(thumb_path)//1024}KB)")
                
        except Exception as e:
            print(f"Error processing {filename}: {e}")
            
    # Save manifest as JSON
    manifest_path = "photos_manifest.json"
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(photo_manifest, f, ensure_ascii=False, indent=2)
        
    print(f"\nSuccessfully processed {len(photo_manifest)} photos!")
    print(f"Manifest written to {manifest_path}")

if __name__ == "__main__":
    compress_images()
