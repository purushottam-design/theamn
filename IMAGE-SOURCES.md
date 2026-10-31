# Original reference photo URLs

The site currently loads these original public photos directly from the reference website. These URLs are not embedded as media files in the ZIP. The external host must remain available.

| Image | Source URL |
|---|---|
| Moon portrait | https://theamanlife1.netlify.app/assets/images/aman-moon-1.webp |
| Motorcycle portrait | https://theamanlife1.netlify.app/assets/images/aman-bike.webp |
| London portrait | https://theamanlife1.netlify.app/assets/images/aman-london.webp |
| Red cinematic portrait | https://theamanlife1.netlify.app/assets/images/aman-red.webp |
| Waterfront sunset portrait | https://theamanlife1.netlify.app/assets/images/aman-sunset.webp |
| Space-inspired portrait | https://theamanlife1.netlify.app/assets/images/aman-moon-2.webp |

For a fully self-hosted website, obtain the original image files with permission and place them in `assets/images/`, then change the image base constant in `assets/js/site.js` from the Netlify URL to `./assets/images/`.
