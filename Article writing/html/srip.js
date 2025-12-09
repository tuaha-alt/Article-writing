// Magical fairytale cursor trail - only in hero section
document.addEventListener('mousemove', function(e) {
    // trail only inside hero
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    const heroRect = heroSection.getBoundingClientRect();
    const isInHero = e.clientX >= heroRect.left && e.clientX <= heroRect.right && e.clientY >= heroRect.top && e.clientY <= heroRect.bottom;
    if (!isInHero) return;

    const colors = [
        'rgba(255,182,193,0.9)',
        'rgba(186,225,255,0.95)',
        'rgba(204,255,229,0.9)',
        'rgba(255,204,255,0.9)'
    ];

    const selectedColor = colors[Math.floor(Math.random() * colors.length)];

    // main fairytale sparkle (longer-lived)
    const mainDur = 1600; // ms
    const sparkle = document.createElement('div');
    sparkle.className = 'trail-particle fairytale';
    sparkle.style.left = (e.pageX - 6) + 'px';
    sparkle.style.top = (e.pageY - 6) + 'px';
    sparkle.style.background = selectedColor;
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = 1000;
    sparkle.style.animation = `trailFade ${mainDur}ms ease-out forwards`;
    document.body.appendChild(sparkle);
    setTimeout(() => { try { sparkle.remove(); } catch (e) {} }, mainDur + 60);

    // Create a couple of smaller mini sparkles to build a longer tail
    const miniCount = 2;
    for (let i = 0; i < miniCount; i++) {
        const mini = document.createElement('div');
        mini.className = 'mini-sparkle';
        const angle = (Math.PI * 2 * i) / Math.max(1, miniCount);
        const distance = 6 + i * 4;
        mini.style.left = (e.pageX + Math.cos(angle) * distance - 3) + 'px';
        mini.style.top = (e.pageY + Math.sin(angle) * distance - 3) + 'px';
        mini.style.background = selectedColor;
        mini.style.boxShadow = `0 0 8px 2px ${selectedColor}`;
        mini.style.pointerEvents = 'none';
        mini.style.zIndex = 999;
        const miniDur = 900 + i * 120;
        mini.style.animation = `miniSparkle ${miniDur}ms ease-out forwards`;
        document.body.appendChild(mini);
        setTimeout(() => { try { mini.remove(); } catch (e) {} }, miniDur + 40);
    }
});

