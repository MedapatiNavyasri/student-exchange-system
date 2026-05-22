document.addEventListener('DOMContentLoaded', () => {

    /* 1. Register GSAP ScrollTrigger */
    gsap.registerPlugin(ScrollTrigger);

    /* 2. Header Glassmorphism Scroll Effect */
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* 3. Hero Section Advanced Scroll Animation */
    // Fade out hero text as you scroll down
    gsap.to('.hero-content', {
        y: 100,
        opacity: 0,
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom 20%',
            scrub: true
        }
    });

    // Animate the Mockup window: starts scaled down and rotated, flattens precisely on scroll
    gsap.fromTo('.mockup-window', 
        { 
            rotateX: 10, 
            scale: 0.9, 
            y: 50 
        }, 
        {
            rotateX: 0,
            scale: 1,
            y: -50,
            boxShadow: '0 40px 100px -20px rgba(0,0,0,0.25), 0 0 0 10px rgba(255,255,255,0.6)',
            scrollTrigger: {
                trigger: '.mockup-section',
                start: 'top 80%',
                end: 'top 20%',
                scrub: 1 // smooth scrubbing effect
            }
        }
    );

    /* 4. Elements Fade/Slide-Up replacement with GSAP batching */
    // We override our old simple CSS logic with a powerful staggered GSAP batch
    gsap.utils.toArray('.slide-up-trigger').forEach((elem) => {
        gsap.fromTo(elem, 
            { y: 50, opacity: 0 }, 
            {
                y: 0, 
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: elem,
                    start: 'top 85%',
                    toggleActions: 'play none none none' // Play once
                }
            }
        );
    });

    /* 5. Huge Numeric Walkthrough Scroll Scrubbing */
    // Pin the numbers and have the lines fill up or fade dynamically
    gsap.utils.toArray('.walkthrough-step').forEach((step, index) => {
        gsap.fromTo(step.querySelector('.huge-number'), 
            { opacity: 0.2, x: -50 },
            { 
                opacity: 1, 
                x: 0,
                scrollTrigger: {
                    trigger: step,
                    start: 'top center',
                    end: 'bottom center',
                    scrub: true
                }
            }
        );
        
        gsap.fromTo(step.querySelector('.step-visual'),
            { scale: 0.8, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                scrollTrigger: {
                    trigger: step,
                    start: 'top 70%',
                    end: 'center center',
                    scrub: 1
                }
            }
        );
    });

    /* 6. Social Proof / Stats Bar Scaling */
    gsap.fromTo('.stats-container',
        { width: "90%", opacity: 0 },
        { 
            width: "100%", 
            opacity: 1, 
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.stats-bar',
                start: 'top 90%',
                end: 'center center',
                scrub: 1
            }
        }
    );

    /* 7. Advanced Parallax (Mouse movement) */
    const parallaxContainers = document.querySelectorAll('.mockup-img');
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        parallaxContainers.forEach(container => {
            const rect = container.getBoundingClientRect();
            if(rect.top < window.innerHeight && rect.bottom > 0) {
                const moveX = mouseX * 30; 
                const moveY = mouseY * 30;
                const children = container.querySelectorAll('.floating-alert, .map-ui');
                children.forEach(child => {
                    gsap.to(child, {
                        x: moveX,
                        y: moveY,
                        duration: 1,
                        ease: 'power2.out'
                    });
                });
            }
        });
    });

    /* 8. Seamless Accordion Logic */
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

    /* 9. Realistic Photo Hands — Nokia-style GSAP Timeline */
    if (document.querySelector('.nokia-anim-wrap')) {

        // Set initial states
        gsap.set('.hand-give',         { x: '-110%' });
        gsap.set('.hand-receive',       { x:  '110%' });
        gsap.set('.nokia-center-glow',  { width: 0, height: 0, opacity: 0 });
        gsap.set('.nk-dot',            { opacity: 0, scale: 0 });
        gsap.set('.nokia-bg-pulse',    { opacity: 0 });
        gsap.set('#nokia-caption',     { opacity: 0, y: 10 });

        const nokiaTl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });

        // Phase 1 — Real hands slide in (Nokia purposeful sweep)
        nokiaTl
            .to('.hand-give',    { x: '0%', duration: 2.4, ease: 'power3.out' }, 0)
            .to('.hand-receive', { x: '0%', duration: 2.4, ease: 'power3.out' }, 0)

        // Phase 2 — Warm golden glow blooms at center (the Nokia magic moment)
            .to('.nokia-center-glow', {
                width: 220, height: 220,
                opacity: 0.9,
                duration: 1.2, ease: 'power2.out'
            }, 2.0)
            .to('.nokia-bg-pulse', { opacity: 1, duration: 0.9 }, 2.0)

        // Phase 3 — Sparkles pop outward
            .to('.nk-dot', {
                opacity: 1, scale: 1.4,
                stagger: 0.08, duration: 0.45, ease: 'back.out(3)'
            }, 2.3)
            .to('.nk-dot', {
                y: -20, opacity: 0,
                stagger: 0.08, duration: 0.7, ease: 'power2.in'
            }, 2.75)

        // Phase 4 — Caption text rises into view
            .to('#nokia-caption', { opacity: 1, y: 0, duration: 1.1, ease: 'power2.out' }, 2.2)

        // Phase 5 — Hold (let the emotion breathe)
            .to({}, { duration: 2.2 })

        // Phase 6 — Hands retract, glow dissolves
            .to('.hand-give',    { x: '-110%', duration: 1.5, ease: 'power3.in' }, '+=0')
            .to('.hand-receive', { x:  '110%', duration: 1.5, ease: 'power3.in' }, '<')
            .to('.nokia-center-glow', { width: 0, height: 0, opacity: 0, duration: 0.9 }, '<')
            .to('.nokia-bg-pulse',    { opacity: 0, duration: 0.7 }, '<')
            .to('#nokia-caption',     { opacity: 0, y: 10, duration: 0.7 }, '<');
    }
});

/* 10. Journey Tab Switcher Logic */
function activateTab(tabIndex) {
    const panes = document.querySelectorAll('.visual-pane');
    panes.forEach(pane => pane.classList.remove('active'));
    
    const tabs = document.querySelectorAll('.tab-item');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    document.getElementById(`pane-${tabIndex}`).classList.add('active');
    tabs[tabIndex - 1].classList.add('active');
}
