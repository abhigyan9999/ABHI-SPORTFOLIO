from PIL import Image, ImageDraw, ImageFont

# Create a 256x256 image with black background
img = Image.new('RGB', (256, 256), color='black')
d = ImageDraw.Draw(img)

# We will draw a bold white 'A' in the center.
# We might not have a guaranteed font path, so we can try Arial or just draw it manually if needed,
# but we can try to use default arial.ttf
try:
    font = ImageFont.truetype('arialbd.ttf', 180) # bold Arial
except:
    try:
        font = ImageFont.truetype('segoeuib.ttf', 180) # Windows segoe bold
    except:
        font = ImageFont.load_default()

# Get text bounding box to center it
text = "A"
left, top, right, bottom = d.textbbox((0, 0), text, font=font)
text_width = right - left
text_height = bottom - top

# Calculate center
x = (256 - text_width) / 2
y = (256 - text_height) / 2 - 20 # adjust visually

d.text((x, y), text, fill='white', font=font)

# Save
img.save('assets/images/logo/favicon-v2.png')
print('Favicon generated.')
