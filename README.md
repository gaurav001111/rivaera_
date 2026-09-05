# RIVAERA 3D Website

A premium single-page 3D/interactive front-end website for RIVAERA.

## Run it

1. Open this folder in VS Code.
2. Install the **Live Server** extension, or use any local web server.
3. Right-click `index.html` → **Open with Live Server**.

Opening the HTML directly may still work for most features, but a local server is recommended.

## Add your real Instagram content

Instagram content is not automatically scraped. This avoids relying on unstable/blocked scraping.

Put your permitted content here:

- `assets/images/post1.jpg`
- `assets/images/post2.jpg`
- `assets/images/post3.jpg`
- `assets/images/post4.jpg`

For reels:

- `assets/reels/reel1.mp4`
- `assets/reels/reel2.mp4`
- `assets/reels/reel3.mp4`

Then update the `content` object at the top of `script.js`.

You can also replace `assets/images/hero.jpg`.

## Important

Use photos/videos that you own or have permission to publish. The site links back to the RIVAERA Instagram profile.

## Main files

- `index.html` — page structure
- `style.css` — design/responsive layout
- `script.js` — gallery, reels, cursor, 3D tilt and Three.js
- `assets/` — your real media
