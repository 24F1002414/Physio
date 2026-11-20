/* ==========================================
   Dr. Priya Panchal Portfolio
   app.js
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
        AOS
    ========================================== */

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

    /* ==========================================
        MOBILE NAVBAR
    ========================================== */

    const navbar = document.querySelector(".navbar");
    const menuToggle = document.querySelector(".menu-toggle");

    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", () => {

            navbar.classList.toggle("active");

        });

    }

    /* ==========================================
        CLOSE NAV AFTER CLICK
    ========================================== */

    document.querySelectorAll(".navbar ul li a").forEach(link => {

        link.addEventListener("click", () => {

            if (navbar) {

                navbar.classList.remove("active");

            }

        });

    });

    /* ==========================================
        NAVBAR SHADOW
    ========================================== */

    window.addEventListener("scroll", () => {

        if (!navbar) return;

        if (window.scrollY > 50) {

            navbar.style.boxShadow =
                "0 15px 40px rgba(0,0,0,.08)";

        } else {

            navbar.style.boxShadow = "none";

        }

    });

    /* ==========================================
        SCROLL PROGRESS
    ========================================== */

    const progress = document.querySelector(".scroll-bar");

    window.addEventListener("scroll", () => {

        if (!progress) return;

        const scrollTop = document.documentElement.scrollTop;

        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const percentage = (scrollTop / height) * 100;

        progress.style.width = percentage + "%";

    });

    /* ==========================================
        COUNTER
    ========================================== */

    const counters = document.querySelectorAll(".counter");

    const animateCounter = (counter) => {

        const target = Number(counter.dataset.target);

        let count = 0;

        const speed = target / 100;

        const update = () => {

            count += speed;

            if (count < target) {

                counter.innerText = Math.floor(count);

                requestAnimationFrame(update);

            } else {

                counter.innerText = target + "+";

            }

        };

        update();

    };

    const counterObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                animateCounter(entry.target);

                counterObserver.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.5

    });

    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

    /* ==========================================
        SCROLL TO TOP
    ========================================== */

    const scrollTopBtn = document.querySelector(".scroll-top");

    window.addEventListener("scroll", () => {

        if (!scrollTopBtn) return;

        if (window.scrollY > 500) {

            scrollTopBtn.classList.add("show");

        } else {

            scrollTopBtn.classList.remove("show");

        }

    });

    if (scrollTopBtn) {

        scrollTopBtn.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }

    /* ==========================================
        ACTIVE NAV LINK
    ========================================== */

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar ul li a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 150;

            const height = section.offsetHeight;

            if (pageYOffset >= top &&
                pageYOffset < top + height) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

    /* ==========================================
        GSAP HERO
    ========================================== */

    if (typeof gsap !== "undefined") {

        gsap.from(".hero-content h3", {

            // opacity: 0,

            y: 40,

            duration: 1

        });

        gsap.from(".hero-content h1", {

            opacity: 0,

            y: 60,

            duration: 1,

            delay: .3

        });

        gsap.from(".hero-content h2", {

            opacity: 0,

            y: 60,

            duration: 1,

            delay: .6

        });

        gsap.from(".hero-content p", {

            opacity: 0,

            y: 60,

            duration: 1,

            delay: .9

        });

        gsap.from(".hero-buttons", {

            opacity: 0,

            y: 60,

            duration: 1,

            delay: 1.2

        });

        gsap.from(".hero-image", {

            opacity: 0,

            x: 120,

            duration: 1.5,

            delay: .5

        });

    }

    /* ==========================================
        PARALLAX
    ========================================== */

    document.addEventListener("mousemove", (e) => {

        const image = document.querySelector(".hero-image");

        if (!image) return;

        const x = (window.innerWidth / 2 - e.pageX) / 80;

        const y = (window.innerHeight / 2 - e.pageY) / 80;

        image.style.transform =
            `translate(${x}px, ${y}px)`;

    });

    /* ==========================================
        TESTIMONIAL AUTO SLIDER
    ========================================== */

    const slider = document.querySelector(".testimonial-slider");

    if (slider) {

        let index = 0;

        setInterval(() => {

    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    showSlide(currentSlide);

}, 6000);

    }

    /* ==========================================
        LOADER
    ========================================== */

    const loader = document.querySelector(".loader");

    if (loader) {

        window.addEventListener("load", () => {

            loader.style.opacity = "0";

            setTimeout(() => {

                loader.style.display = "none";

            }, 500);

        });

    }

    /* ==========================================
        FLOATING SVG BODY
    ========================================== */

    const bodySvg = document.querySelector(".hero-image img");

    if (bodySvg) {

        let angle = 0;

        setInterval(() => {

            angle += 0.02;

            bodySvg.style.transform =

                `translateY(${Math.sin(angle) * 10}px)`;

        }, 25);

    }

});

/* ==========================================
   BIRTHDAY CELEBRATION
========================================== */
/* ==========================================
   BIRTHDAY CELEBRATION
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const birthdayOverlay = document.getElementById("birthdayOverlay");
    const closeBirthday = document.getElementById("closeBirthday");
    const confettiContainer = document.getElementById("confettiContainer");
    const birthdaySong = document.getElementById("birthdaySong");
    const playSongBtn = document.getElementById("playSongBtn");

    if (!birthdayOverlay || !closeBirthday || !confettiContainer) {
        return;
    }

    let confettiInterval = null;

    // Check birthday using Indian time
    function checkBirthday() {

        const parts = new Intl.DateTimeFormat("en-IN", {
            timeZone: "Asia/Kolkata",
            day: "numeric",
            month: "numeric"
        }).formatToParts(new Date());

        const values = {};

        parts.forEach(part => {
            values[part.type] = Number(part.value);
        });

        const isBirthday = values.day === 20 && values.month === 11;

        if (isBirthday && birthdayOverlay.dataset.closed !== "true") {

            birthdayOverlay.style.display = "flex";

            if (!confettiInterval) {
                createConfetti();
                confettiInterval = setInterval(createConfetti, 800);
            }

        } else {
            birthdayOverlay.style.display = "none";
            stopCelebration();
        }
    }

    // Generate confetti
    function createConfetti() {

        for (let i = 0; i < 8; i++) {

            const confetti = document.createElement("div");

            confetti.className = "confetti";
            confetti.style.left = Math.random() * 100 + "%";

            confetti.style.backgroundColor = [
                "#ff4757",
                "#ffa502",
                "#2ed573",
                "#1e90ff",
                "#e84393"
            ][Math.floor(Math.random() * 5)];

            confetti.style.animationDuration =
                (Math.random() * 3 + 2) + "s";

            confettiContainer.appendChild(confetti);

            setTimeout(() => confetti.remove(), 5000);
        }
    }

    // Play song only after button click
    if (playSongBtn && birthdaySong) {

        playSongBtn.style.display = "inline-flex";

        playSongBtn.addEventListener("click", async () => {

            try {

                await birthdaySong.play();

                playSongBtn.textContent = "🎵 Vibes are Set Priya Mam";

            } catch (error) {

                console.error("Audio playback error:", error);

                playSongBtn.textContent = "⚠️ Unable to Play Song";

            }
        });
    }

    // Stop celebration
    function stopCelebration() {

        if (confettiInterval) {
            clearInterval(confettiInterval);
            confettiInterval = null;
        }

        confettiContainer.innerHTML = "";

        if (birthdaySong) {
            birthdaySong.pause();
            birthdaySong.currentTime = 0;
        }
    }

    // Close birthday popup
    closeBirthday.addEventListener("click", () => {

        birthdayOverlay.dataset.closed = "true";
        birthdayOverlay.style.display = "none";

        stopCelebration();

    });

    checkBirthday();

    setInterval(checkBirthday, 30000);

});