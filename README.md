# Sealbound - Official Website

The official landing page for **Sealbound**, a 2D narrative RPG where you restore the world through connection, not sacrifice.

## Quick Start

1. Open `index.html` in a browser, or
2. Use a local server for best results:

```bash
# Python 3
python -m http.server 8000

# Node.js (if http-server is installed)
npx http-server

# Then visit http://localhost:8000
```

## Project Structure

```
seal-site/
├── index.html              # Main landing page
├── css/
│   └── styles.css          # All styling (CSS custom properties for theming)
├── js/
│   ├── main.js             # Interactions, animations, form handling
│   └── content.js          # Easy content updates (characters, media, etc.)
├── assets/                  # Create this folder for images
│   ├── characters/         # Character portraits
│   ├── media/              # Screenshots, concept art
│   └── icons/              # Favicon, social icons
└── README.md
```

## Updating Content

### Easy Method: content.js

Edit `js/content.js` for most content updates. This file contains all dynamic content in an easy-to-edit format.

### Adding a New Character

1. Open `js/content.js`
2. Find the `characters` array
3. Add a new character object:

```javascript
{
    id: "riven",
    name: "Riven",
    epithet: "The Broken Chord",
    role: "DPS · Debuffer",
    weapon: "Lyre",
    favorite: "Bitter Coffee",
    portrait: "assets/characters/riven.png",
    description: [
        "First paragraph about Riven...",
        "Second paragraph..."
    ],
    combatStyle: "Riven weakens enemies with discordant melodies...",
    abilities: ["Debuffs", "DOT", "Armor Break"],
    featured: false
}
```

4. To feature the character on the main page, update `index.html` by duplicating the character card structure

### Adding Images to the Gallery

1. Place images in `assets/media/`
2. Edit `js/content.js`, find the `media` array:

```javascript
media: [
    {
        type: "image",
        src: "assets/media/hearthwyn-concept.jpg",
        alt: "Hearthwyn Village at dusk",
        featured: true
    },
    {
        type: "image",
        src: "assets/media/seal-glade.jpg",
        alt: "The Hollow Glade Seal"
    }
]
```

### Updating Social Links

In `js/content.js`:

```javascript
social: {
    twitter: "https://twitter.com/sealbound",
    discord: "https://discord.gg/yourserver",
    youtube: "https://youtube.com/@sealbound",
    steam: "https://store.steampowered.com/app/yourappid"
}
```

Then update the footer links in `index.html` with actual URLs.

### Adding Dev Blog Posts

For simple dev updates, add to `content.js`:

```javascript
devlog: [
    {
        date: "2025-02-15",
        title: "Combat System Preview",
        excerpt: "Today we're revealing how bonds affect battle...",
        link: "/blog/combat-preview"
    }
]
```

For a full blog, consider integrating with:
- **Markdown files** + a static site generator (11ty, Astro)
- **Headless CMS** (Sanity, Contentful, Strapi)
- **Simple JSON** approach with fetch()

## Customization

### Colors (css/styles.css)

All colors use CSS custom properties. Edit the `:root` section:

```css
:root {
    --color-primary: #9d6bff;        /* Main purple */
    --color-primary-light: #b794ff;  /* Lighter purple */
    --color-secondary: #6bb3ff;      /* Blue accent */
    --color-accent: #ff6b9d;         /* Pink/red accent */
    --color-bg-dark: #0a0a12;        /* Darkest background */
    --color-bg-medium: #12121f;      /* Medium background */
    --color-bg-light: #1a1a2e;       /* Lightest background */
}
```

### Typography

The site uses:
- **Cinzel** for headings (fantasy, elegant)
- **Raleway** for body text (clean, readable)

To change fonts, update the Google Fonts link in `index.html` and the variables in CSS:

```css
:root {
    --font-display: 'Cinzel', serif;
    --font-body: 'Raleway', sans-serif;
}
```

### Adding New Sections

1. Add HTML structure to `index.html` following existing patterns
2. Add styles to `css/styles.css`
3. For scroll animations, the section will automatically fade in

## Newsletter Integration

The newsletter form in `js/main.js` simulates a submission. To connect to a real service:

### Mailchimp

```javascript
// In initNewsletter(), replace simulateApiCall with:
async function submitToMailchimp(email) {
    const response = await fetch('YOUR_MAILCHIMP_FORM_ACTION', {
        method: 'POST',
        mode: 'no-cors',
        body: new FormData(form)
    });
    return response;
}
```

### Buttondown

```javascript
const response = await fetch('https://api.buttondown.email/v1/subscribers', {
    method: 'POST',
    headers: {
        'Authorization': `Token YOUR_API_KEY`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
});
```

### ConvertKit, Beehiiv, etc.

Follow their API documentation and update the `simulateApiCall` function.

## Performance Tips

1. **Images**: Use WebP format, compress with tools like Squoosh
2. **Lazy loading**: Already implemented for images below the fold
3. **Fonts**: Consider self-hosting fonts for faster loading
4. **Minification**: For production, minify CSS/JS with tools like:
   ```bash
   npx terser js/main.js -o js/main.min.js
   npx clean-css-cli css/styles.css -o css/styles.min.css
   ```

## Deployment

### GitHub Pages

1. Push to GitHub
2. Go to Settings → Pages
3. Select "Deploy from a branch"
4. Choose `main` branch

### Netlify / Vercel

1. Connect your GitHub repo
2. Deploy settings:
   - Build command: (none needed)
   - Publish directory: `.` or `/`

### Custom Domain

Add a `CNAME` file with your domain, or configure through your hosting provider.

## Browser Support

- Chrome, Edge, Firefox, Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome for Android)
- Graceful degradation for older browsers
- Respects `prefers-reduced-motion` for accessibility

## Adding Assets Checklist

When you have assets ready:

- [ ] **Favicon**: Add to root as `favicon.ico` or use `<link rel="icon">`
- [ ] **OG Image**: Add `<meta property="og:image" content="...">` for social sharing
- [ ] **Character Portraits**: Add to `assets/characters/`, update `content.js`
- [ ] **Concept Art**: Add to `assets/media/`, update `content.js`
- [ ] **Logo**: Replace text logo in nav with image if desired

## Future Enhancements

Ideas for expanding the site:

- **Parallax backgrounds** with actual concept art
- **Character page** with detailed bios and full ability lists
- **Interactive Seal map** showing the seven dungeons
- **Dev blog** with markdown-based posts
- **Press kit** page for media/streamers
- **Localization** support for multiple languages
- **Steam widget** integration when available

---

*"You weren't made just to protect the world. You were made to live in it."*
