import { animate, hover } from 'https://cdn.jsdelivr.net/npm/motion@11.15.0/+esm';

const GOLD = '#d4af37';
const BORDER_REST = 'rgba(255, 255, 255, 0.05)';
const GLOW_REST = '0 0 0px rgba(212, 175, 55, 0)';
const GLOW_HOVER = '0 0 18px rgba(212, 175, 55, 0.45)';
const EASE = [0.25, 0.1, 0.25, 1];

const bound = new WeakSet();

function bindGoldBorderHover(el) {
    if (bound.has(el)) return;
    bound.add(el);

    if (!el.style.borderColor) {
        el.style.borderColor = BORDER_REST;
    }

    hover(el, () => {
        animate(
            el,
            { borderColor: GOLD, boxShadow: GLOW_HOVER },
            { duration: 0.35, easing: EASE }
        );
        return () => {
            animate(
                el,
                { borderColor: BORDER_REST, boxShadow: GLOW_REST },
                { duration: 0.35, easing: EASE }
            );
        };
    });
}

function scan(root = document) {
    root.querySelectorAll('.hover-gold-border').forEach(bindGoldBorderHover);
}

scan();

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
            if (node.nodeType !== 1) return;
            if (node.classList?.contains('hover-gold-border')) {
                bindGoldBorderHover(node);
            }
            scan(node);
        });
    });
});

observer.observe(document.body, { childList: true, subtree: true });
