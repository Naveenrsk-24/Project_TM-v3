export const menuItems = [
    {
        title: 'Services',
        hasDropdown: true,
        items: [
            { name: 'Wedding Photography', icon: '💑', desc: 'Capture your special day', link: "/weddings" },
            { name: 'Pre-Wedding Shoots', icon: '💕', desc: 'Romantic outdoor sessions', link: "/pre-wedding" },
            { name: 'Candid Photography', icon: '📸', desc: 'Natural & authentic moments', link: "/candid" },
            { name: 'Cinematic Videos', icon: '🎬', desc: 'Movie-style storytelling', link: "/cinematic" },
            { name: 'Drone Coverage', icon: '🚁', desc: 'Aerial perspectives', link: "/drone" },
            { name: 'Album Design', icon: '📖', desc: 'Premium coffee table books', link: "/albums" }
        ]
    },
    {
        title: 'Portfolio',
        hasDropdown: true,
        link: '/portfolio',
        items: [
            { name: 'Wedding Gallery', icon: '💒', desc: 'Our finest work', link: "/portfolio/weddings" },
            { name: 'Pre-Wedding', icon: '🌅', desc: 'Romantic captures', link: "/portfolio/pre-wedding" },
            { name: 'Candid Moments', icon: '✨', desc: 'Real emotions', link: "/portfolio/candid" },
            { name: 'Video Showcase', icon: '🎥', desc: 'Watch our films', link: "/portfolio/videos" }
        ]
    },
    { title: 'About Us', link: '/aboutus' },
    { title: 'Blog', link: '/blogs' }
];