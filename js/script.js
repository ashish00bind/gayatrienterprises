document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Theme Toggle System ---
    const themeBtn = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check localStorage or System Preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateIcon(currentTheme);
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateIcon('dark');
    }

    themeBtn.addEventListener('click', () => {
        let targetTheme = 'light';
        if (document.documentElement.getAttribute('data-theme') === 'light') {
            targetTheme = 'dark';
        }
        document.documentElement.setAttribute('data-theme', targetTheme);
        localStorage.setItem('theme', targetTheme);
        updateIcon(targetTheme);
    });

    function updateIcon(theme) {
        // Simple text swap or icon class toggle
        themeBtn.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }

    // --- 2. Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // --- 3. Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up');
    animatedElements.forEach(el => observer.observe(el));

    // --- 4. Number Counter Animation ---
    const counters = document.querySelectorAll('.counter-number');
    const speed = 200; // The lower the slower

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const updateCount = () => {
                    const target = +entry.target.getAttribute('data-target');
                    const count = +entry.target.innerText;
                    const inc = target / speed;

                    if (count < target) {
                        entry.target.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 20);
                    } else {
                        entry.target.innerText = target + "+";
                    }
                };
                updateCount();
                observer.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => counterObserver.observe(counter));
    
    // --- 5. Dynamic WhatsApp Message ---
    // Updates the WhatsApp link based on the page context
    const waFloat = document.querySelector('.whatsapp-float');
    if(waFloat) {
        const pageTitle = document.title;
        let msg = "Hello, I need manpower services.";
        
        if(pageTitle.includes("Services")) msg = "I am interested in your contract labor services.";
        if(pageTitle.includes("Industries")) msg = "I need manpower for my factory.";
        
        waFloat.href = `https://wa.me/919016461241?text=${encodeURIComponent(msg)}`;
    }
});

// Disable Right Click
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});

// Disable DevTools Shortcuts
document.addEventListener("keydown", function (e) {

    // F12
    if (e.key === "F12") {
        e.preventDefault();
    }

    // Ctrl+Shift+I
    if (e.ctrlKey && e.shiftKey && e.key === "I") {
        e.preventDefault();
    }

    // Ctrl+Shift+J
    if (e.ctrlKey && e.shiftKey && e.key === "J") {
        e.preventDefault();
    }

    // Ctrl+U (View Source)
    if (e.ctrlKey && e.key === "u") {
        e.preventDefault();
    }

});

// DevTools Detection
(function () {

    const threshold = 160;

    setInterval(function () {

        if (
            window.outerWidth - window.innerWidth > threshold ||
            window.outerHeight - window.innerHeight > threshold
        ) {

            document.body.innerHTML =
                "<h1 style='text-align:center;margin-top:20%;font-family:sans-serif;'>DevTools detected. Access blocked.</h1>";

        }

    }, 1000);

})();