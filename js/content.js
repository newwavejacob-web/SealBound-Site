/**
 * SEALBOUND - Content Configuration
 *
 * This file makes it easy to update site content without touching HTML.
 * Edit the values below and the site will update automatically.
 *
 * USAGE:
 * 1. Edit the content in this file
 * 2. Refresh the browser to see changes
 *
 * For new characters or media items, follow the existing object structure.
 */

const SEALBOUND_CONTENT = {
    // ========================================
    // SITE META
    // ========================================
    meta: {
        title: "Sealbound",
        tagline: "Restore the world through connection, not sacrifice",
        description: "A 2D narrative RPG where ancient Seals respond to genuine emotion. Form bonds, explore dungeons, recover your memories."
    },

    // ========================================
    // CHARACTERS
    // Add new characters here following this structure
    // ========================================
    characters: [
        {
            id: "kaela",
            name: "Kaela",
            epithet: "The Soft Cadence",
            role: "Support · Buffer · Healer",
            weapon: "Violin",
            favorite: "Iced Sweet Tea",
            portrait: null, // Add image path when available: "assets/characters/kaela.png"
            description: [
                "Keeper of the Archive Hall, Kaela restores old village documents with the same quiet care she brings to everything. Warm and thoughtful, she's polite to everyone but doesn't seek connection—preferring solitude to crowds.",
                "Yet in one-on-one conversation, her sharp wit emerges. There's more beneath the surface. A dream she's never shared. A design for something that could change the village forever."
            ],
            combatStyle: "Kaela empowers allies through protective melodies and tempo control. Her presence alone bolsters the party, while her ultimate can turn the tide of any battle.",
            abilities: ["Buffs", "Healing", "Cleanse", "Turn Manipulation"],
            featured: true
        },
        // ADD NEW CHARACTERS HERE:
        // {
        //     id: "character-id",
        //     name: "Character Name",
        //     epithet: "The Title",
        //     role: "Role · Tags",
        //     weapon: "Weapon",
        //     favorite: "Favorite item",
        //     portrait: "assets/characters/name.png",
        //     description: ["Paragraph 1", "Paragraph 2"],
        //     combatStyle: "Combat description",
        //     abilities: ["Ability 1", "Ability 2"],
        //     featured: false
        // }
    ],

    // ========================================
    // SEALS (Dungeons)
    // ========================================
    seals: [
        { id: 1, name: "Hollow Glade", environment: "Overgrown ruins, vines" },
        { id: 2, name: "Stillwater Hollow", environment: "Foggy wetlands" },
        { id: 3, name: "Embercoil Depths", environment: "Cracked earth, fire veins" },
        { id: 4, name: "Whispering Spire", environment: "Wind-swept towers" },
        { id: 5, name: "Shardfall", environment: "Crystal fissures" },
        { id: 6, name: "Blackroot Sanctum", environment: "Burned forest" },
        { id: 7, name: "Heartroot Nexus", environment: "Dreamlike, ancient tree" }
    ],

    // ========================================
    // MEDIA ITEMS
    // Add images, videos, etc. here
    // ========================================
    media: [
        // {
        //     type: "image",
        //     src: "assets/media/concept-art-1.jpg",
        //     alt: "Hearthwyn Village concept art",
        //     featured: true
        // },
        // {
        //     type: "video",
        //     src: "https://youtube.com/embed/...",
        //     alt: "Gameplay trailer"
        // }
    ],

    // ========================================
    // DEV BLOG POSTS
    // Add blog updates here (newest first)
    // ========================================
    devlog: [
        // {
        //     date: "2025-02-15",
        //     title: "First Look: Combat System",
        //     excerpt: "Today we're excited to share...",
        //     link: "/blog/combat-preview"
        // }
    ],

    // ========================================
    // SOCIAL LINKS
    // Update with actual URLs when ready
    // ========================================
    social: {
        twitter: "#",
        discord: "#",
        youtube: "#",
        steam: "#" // Wishlist page when available
    },

    // ========================================
    // QUOTES & TAGLINES
    // Rotating quotes for various sections
    // ========================================
    quotes: [
        "You don't save the world by force—you restore it through connection.",
        "The Seals don't want sacrifice—they want love, memory, and truth.",
        "The world was never carried by one pair of hands.",
        "You weren't made just to protect the world. You were made to live in it."
    ]
};

/**
 * Dynamic Content Loader
 * Call this function to update content from the config above
 */
function loadDynamicContent() {
    // Update featured character if images are added
    updateCharacterPortraits();

    // Update media gallery if images are added
    updateMediaGallery();
}

function updateCharacterPortraits() {
    SEALBOUND_CONTENT.characters.forEach(char => {
        if (char.portrait) {
            const portraitPlaceholder = document.querySelector(
                `.character-card[data-character="${char.id}"] .portrait-placeholder`
            );
            if (portraitPlaceholder) {
                portraitPlaceholder.innerHTML = `<img src="${char.portrait}" alt="${char.name}" loading="lazy">`;
            }
        }
    });
}

function updateMediaGallery() {
    const mediaGrid = document.querySelector('.media-grid');
    if (!mediaGrid || SEALBOUND_CONTENT.media.length === 0) return;

    SEALBOUND_CONTENT.media.forEach((item, index) => {
        const placeholder = mediaGrid.children[index];
        if (placeholder && item.src) {
            if (item.type === 'image') {
                placeholder.innerHTML = `<img src="${item.src}" alt="${item.alt}" loading="lazy" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">`;
                placeholder.style.border = 'none';
            }
        }
    });
}

// Auto-load on DOM ready
document.addEventListener('DOMContentLoaded', loadDynamicContent);

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SEALBOUND_CONTENT;
}
