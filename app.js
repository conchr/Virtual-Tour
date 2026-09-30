/* ============================================================
   VIRTUAL TOUR — APP SCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

    // --------------------------------------------------------
    // Video playback rate
    // --------------------------------------------------------
    const video = document.getElementById('background-video');
    if (video) {
        video.playbackRate = 0.7;
    }

    // --------------------------------------------------------
    // Highlight areas per collection
    // --------------------------------------------------------
    const areas1 = [
        { title: 'Χάρτης Καλλιθέας',        coords: [419, 514, 663, 818],      shape: 'rect', pageId: 'kallithea-map-page' },
        { title: 'Μακέτες Εισόδου - Πυλών', coords: [900, 542, 1218, 846],     shape: 'rect', pageId: 'gates-page' },
        { title: 'Η Αγορά του Κάστρου',      coords: [1430, 560, 1730, 797],    shape: 'rect', pageId: 'agora-page' },
        { title: 'Ευρήματα 1',               coords: [1850, 624, 2038, 836],    shape: 'rect', pageId: 'evrimata1-page' },
        { title: 'Το Κτήριο 10',             coords: [2653, 624, 2985, 967],    shape: 'rect', pageId: 'ktirio10-page' },
        { title: 'Κεραμικά Ευρήματα',        coords: [3370, 613, 3603, 864],    shape: 'rect', pageId: 'keramika-page' }
    ];

    const areas2 = [
        { title: 'Φορητή Εστία',         coords: [94, 561, 511, 865],       shape: 'rect', pageId: 'portable-hearth-page' },
        { title: 'Ευρήματα Κτήριο 10',   coords: [660, 412, 1645, 865],     shape: 'rect', pageId: 'building10-finds-page' },
        { title: 'Μπανιέρα Κτήριο 10',   coords: [3289, 649, 3762, 1211],   shape: 'rect', pageId: 'building10-bathtub-page' }
    ];

    const areas3 = [
        { title: 'Βάση Λουτήρα', coords: [84, 515, 369, 851],         shape: 'rect', pageId: 'collection3-title1-page' },
        { title: 'Χύτρα',         coords: [1038, 340, 1275, 505],      shape: 'rect', pageId: 'collection3-title2-page' },
        { title: 'Ευρήματα 2',    coords: [1418, 188, 1856, 411],      shape: 'rect', pageId: 'collection3-title3-page' }
    ];

    const areas4 = [
        { title: 'Αργαλειός',         coords: [129, 80, 698, 1012],       shape: 'rect', pageId: 'loom-page' },
        { title: 'Βαρίδια Αργαλειού',  coords: [1034, 500, 1705, 790],     shape: 'rect', pageId: 'loom-weights-page' },
        { title: 'Αγροτικά Εργαλεία',  coords: [2045, 493, 2610, 896],     shape: 'rect', pageId: 'farm-tools-page' },
        { title: 'Κυψέλη, Μυλόπετρα',  coords: [2716, 793, 3250, 1093],    shape: 'rect', pageId: 'hive-millstone-page' }
    ];

    const areas5 = [
        { title: 'Καλλιτεχνικά Ευρήματα', coords: [63, 310, 586, 701],       shape: 'rect', pageId: 'artistic-finds-page' },
        { title: 'Πυξίδα',                 coords: [1639, 404, 1835, 547],    shape: 'rect', pageId: 'compass-page' },
        { title: 'Μαρμάρινοι Κυβόλιθοι',   coords: [726, 804, 1178, 906],     shape: 'rect', pageId: 'collection5-title3-page' }
    ];

    const areas6 = [
        { title: 'Νομίσματα', coords: [124, 401, 576, 624],      shape: 'rect', pageId: 'coins-page' },
        { title: 'Όπλα',      coords: [1018, 377, 1677, 522],    shape: 'rect', pageId: 'weapons-page' }
    ];

    // --------------------------------------------------------
    // Show page helper
    // --------------------------------------------------------
    function showPage(page) {
        document.querySelectorAll('.container').forEach(p => p.style.display = 'none');
        if (page) {
            page.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // --------------------------------------------------------
    // Cache DOM references
    // --------------------------------------------------------
    const mainPage       = document.getElementById('main-page');
    const collectionPage = {
        '1': document.getElementById('collection1-page'),
        '2': document.getElementById('collection2-page'),
        '3': document.getElementById('collection3-page'),
        '4': document.getElementById('collection4-page'),
        '5': document.getElementById('collection5-page'),
        '6': document.getElementById('collection6-page')
    };
    window.areaMap = {
        '1': areas1,
        '2': areas2,
        '3': areas3,
        '4': areas4,
        '5': areas5,
        '6': areas6
    };

    // --------------------------------------------------------
    // Collection items click
    // --------------------------------------------------------
    document.querySelectorAll('.collection-item').forEach(item => {
        item.addEventListener('click', function () {
            const id = this.getAttribute('data-collection');
            const page = collectionPage[id];
            if (!page) return;

            showPage(page);

            // Create hotspots after page becomes visible
            // Create hotspots after page becomes visible
            setTimeout(() => {
                // Collection 1 δεν έχει suffix στο HTML
                const suffix = id === '1' ? '' : '-' + id;
                const container = document.getElementById('image-container' + suffix);
                const img = document.getElementById('main-image' + suffix);
                if (container && img) {
                    createHighlightsAndLabels(container, img, areaMap[id]);
                }
            }, 200);
        });
    });

    // --------------------------------------------------------
    // Team button
    // --------------------------------------------------------
    const teamBox = document.querySelector('.team-box');
    if (teamBox) {
        teamBox.addEventListener('click', () => {
            showPage(document.getElementById('archaeological-team1-page'));
        });
    }

    // Team next buttons
    const nextTeam2 = document.querySelector('.next-to-team2');
    if (nextTeam2) {
        nextTeam2.addEventListener('click', e => {
            e.preventDefault();
            showPage(document.getElementById('archaeological-team2-page'));
        });
    }
    const nextTeam3 = document.querySelector('.next-to-team3');
    if (nextTeam3) {
        nextTeam3.addEventListener('click', e => {
            e.preventDefault();
            showPage(document.getElementById('archaeological-team3-page'));
        });
    }

    // --------------------------------------------------------
    // Back to collection buttons
    // --------------------------------------------------------
    ['1', '2', '3', '4', '5', '6'].forEach(id => {
        document.querySelectorAll('.back-to-collection' + id).forEach(btn => {
            btn.addEventListener('click', e => {
                e.preventDefault();
                showPage(collectionPage[id]);
            });
        });
    });

    // --------------------------------------------------------
    // Back to main page buttons
    // --------------------------------------------------------
    document.querySelectorAll('.main-page-button').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            showPage(mainPage);
        });
    });

    // --------------------------------------------------------
    // Gallery fullscreen toggle
    // --------------------------------------------------------
    document.querySelectorAll('.gallery-image').forEach(img => {
        img.addEventListener('click', function () {
            this.classList.toggle('fullscreen');
        });
    });

    // Escape key closes fullscreen
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.gallery-image.fullscreen').forEach(img => {
                img.classList.remove('fullscreen');
            });
        }
    });
});

// ============================================================
// CREATE HIGHLIGHTS AND LABELS
// ============================================================
function createHighlightsAndLabels(container, image, areas) {

    console.log('[hotspots] Called with:', {
        containerId: container.id,
        imgId: image.id,
        areasCount: areas ? areas.length : 0,
        imgComplete: image.complete,
        imgNatural: image.naturalWidth + 'x' + image.naturalHeight,
        containerSize: container.clientWidth + 'x' + container.clientHeight
    });

    // Remove existing overlay if any
    const existing = container.querySelector('.highlight-overlay');
    if (existing) existing.remove();

    const build = function () {
        const imgWidth = image.naturalWidth;
        const imgHeight = image.naturalHeight;
        if (!imgWidth || !imgHeight) return;

        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        const scaleX = containerWidth / imgWidth;
        const scaleY = containerHeight / imgHeight;

        // Create overlay wrapper
        const overlay = document.createElement('div');
        overlay.className = 'highlight-overlay';
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.pointerEvents = 'none';
        container.style.position = 'relative';
        container.appendChild(overlay);

        areas.forEach(area => {
            const highlight = document.createElement('div');
            highlight.className = 'highlight-area';
            highlight.setAttribute('data-title', area.title);
            highlight.style.pointerEvents = 'auto';

            highlight.addEventListener('click', function () {
                const targetPage = document.getElementById(area.pageId);
                if (targetPage) {
                    document.querySelectorAll('.container').forEach(p => p.style.display = 'none');
                    targetPage.style.display = 'block';
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });

            let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

            if (area.shape === 'rect') {
                const x = area.coords[0] * scaleX;
                const y = area.coords[1] * scaleY;
                const width = (area.coords[2] - area.coords[0]) * scaleX;
                const height = (area.coords[3] - area.coords[1]) * scaleY;

                highlight.style.left = x + 'px';
                highlight.style.top = y + 'px';
                highlight.style.width = width + 'px';
                highlight.style.height = height + 'px';

                minX = x;
                maxX = x + width;
                minY = y;
                maxY = y + height;
            }

            const label = document.createElement('div');
            label.className = 'area-label';
            label.textContent = area.title;

            const centerX = (minX + maxX) / 2;
            const bottomY = maxY + 15;

            label.style.left = centerX + 'px';
            label.style.top = bottomY + 'px';

            overlay.appendChild(highlight);
            overlay.appendChild(label);
        });
    };

    if (image.complete) {
        build();
    } else {
        image.addEventListener('load', build, { once: true });
    }
}

/* ============================================================
   RECREATE HOTSPOTS ON RESIZE
   ============================================================ */
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Βρες ποια collection page είναι ορατή αυτή τη στιγμή
        const visiblePage = Array.from(document.querySelectorAll('.container'))
            .find(p => p.style.display === 'block' && p.id.startsWith('collection') && p.id !== 'collection1-page' || p.id === 'collection1-page' && p.style.display === 'block');

        if (!visiblePage) return;

        const id = visiblePage.id.replace('collection', '').replace('-page', '');
        const suffix = id === '1' ? '' : '-' + id;
        const container = document.getElementById('image-container' + suffix);
        const img = document.getElementById('main-image' + suffix);

        if (container && img && window.areaMap && window.areaMap[id]) {
            createHighlightsAndLabels(container, img, window.areaMap[id]);
        }
    }, 250);
});