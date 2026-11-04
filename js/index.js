
document.addEventListener("DOMContentLoaded", () => {

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    const navbar = document.querySelector(".navbar-collapse");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navbar && navbar.classList.contains("show")) {
                bootstrap.Collapse.getOrCreateInstance(navbar).hide();
            }
        });
    });

    const sections = document.querySelectorAll("header[id], section[id]");

    const updateActiveLink = () => {
        let current = "home";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${current}`
            );
        });
    };

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = lightbox.querySelector("img");
    const closeButton = lightbox.querySelector(".lightbox-close");
    const galleryItems = document.querySelectorAll(".gallery-item");

    galleryItems.forEach(item => {
        item.addEventListener("click", event => {
            event.preventDefault();

            lightboxImage.src = item.href;
            lightbox.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
    };

    closeButton.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeLightbox();
        }
    });

const counters = document.querySelectorAll(".count-up");

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = Number(counter.dataset.target);
            const duration = 1500;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const progress = Math.min(
                    (currentTime - startTime) / duration,
                    1
                );

                const eased = 1 - Math.pow(1 - progress, 4);

                counter.textContent = Math.floor(eased * target);

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            }

            requestAnimationFrame(updateCounter);
            observer.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

const whatsappForm = document.getElementById("whatsappContactForm");

whatsappForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const service = document.getElementById("customerService").value;
    const details = document.getElementById("projectDetails").value.trim();

    const whatsappNumber = "966539381165";

    const message = `
طلب جديد من موقع لمسة إتقان للمقاولات والتشطيب

الاسم: ${name}
رقم الجوال: ${phone}
الخدمة المطلوبة: ${service}

تفاصيل المشروع:
${details || "لا توجد تفاصيل إضافية"}
    `;

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");

    whatsappForm.reset();
});

document.getElementById("currentYear").textContent = new Date().getFullYear();

});
