document.addEventListener('DOMContentLoaded', () => {

    /* 1. Header scroll effect */
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* 2. Seamless Accordion Logic */
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isActive = header.classList.contains('active');
            
            accordionHeaders.forEach(h => {
                h.classList.remove('active');
                h.nextElementSibling.style.maxHeight = null;
            });

            if (!isActive) {
                header.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    /* 3. Intersection Observer for Slide-Up Animations */
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -50px 0px', threshold: 0 });

    const triggerElements = document.querySelectorAll('.slide-up-trigger');
    triggerElements.forEach(el => animationObserver.observe(el));
});

/* 4. Journey Tab Switcher Logic */
function activateTab(tabIndex) {
    // Hide all panels
    const panes = document.querySelectorAll('.visual-pane');
    panes.forEach(pane => pane.classList.remove('active'));
    
    // De-activate all tabs
    const tabs = document.querySelectorAll('.tab-item');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Activate clicked
    document.getElementById(`pane-${tabIndex}`).classList.add('active');
    tabs[tabIndex - 1].classList.add('active');
}
