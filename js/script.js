document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('header nav ul li a');
    const sections = document.querySelectorAll('section');

    // 1. Apertura/Chiusura del menu mobile al click sul pulsante hamburger
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            // Cambia l'icona da barre a 'X' per chiudere e viceversa
            const icon = menuToggle.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 2. Chiusura automatica del menu mobile e gestione click sui link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 3. Gestione automatica dello stato attivo durante lo scorrimento (ScrollSpy)
    window.addEventListener('scroll', () => {
        let scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});

// 4. Effetto Spotlight (Riflettore del mouse sulle card dei progetti)
const grid = document.getElementById('projects-grid');
const cards = document.querySelectorAll('.project-card');

if (grid) {
    grid.addEventListener('mousemove', e => {
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// 5. Effetto Digitazione (Typing Effect) Dinamico nella Hero
const words = [
    "Frontend Developer",
    "Creazione Interfacce Web Reattive",
    "Sviluppo Componenti Moderni",
    "Ottimizzazione User Experience",
    "IT Trainer & Programming Instructor"
];
let i = 0;

function typingEffect() {
    let word = words[i].split("");
    const typedTextElem = document.getElementById('typed-text');
    
    var loopTyping = function() {
        if (word.length > 0) {
            typedTextElem.innerHTML += word.shift();
            setTimeout(loopTyping, 80);
        } else {
            setTimeout(deletingEffect, 2000);
        }
    };
    loopTyping();
}

function deletingEffect() {
    const typedTextElem = document.getElementById('typed-text');
    let currentText = typedTextElem.innerHTML;
    
    var loopDeleting = function() {
        if (currentText.length > 0) {
            currentText = currentText.substring(0, currentText.length - 1);
            typedTextElem.innerHTML = currentText;
            setTimeout(loopDeleting, 40);
        } else {
            i = (i + 1) % words.length;
            setTimeout(typingEffect, 500);
        }
    };
    loopDeleting();
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('typed-text')) {
        typingEffect();
    }
});