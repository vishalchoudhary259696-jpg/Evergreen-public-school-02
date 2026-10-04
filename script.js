/* =========================================
   PAGE LOADER
========================================= */

const loader =
    document.getElementById("pageLoader");


window.addEventListener("load", () => {

    setTimeout(() => {

        loader.classList.add("hide");

    }, 500);

});



/* =========================================
   HEADER SCROLL EFFECT
========================================= */

const header =
    document.getElementById("siteHeader");

const whatsapp =
    document.querySelector(".whatsapp-button");

const heroImage =
    document.querySelector(".hero-image");


function updateScroll() {

    const scrollPosition =
        window.scrollY;


    /*
       Change header appearance
       after scrolling
    */

    if (scrollPosition > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }


    /*
       WhatsApp button appears
       after scrolling
    */

    if (scrollPosition >
        window.innerHeight * .45) {

        whatsapp.classList.add("show");

    } else {

        whatsapp.classList.remove("show");

    }


    /*
       Subtle hero parallax
    */

    if (
        heroImage &&
        scrollPosition <
        window.innerHeight
    ) {

        const movement =
            Math.min(
                scrollPosition * .08,
                55
            );


        heroImage.style.transform =
            `translateY(${movement}px)`;

    }

}


window.addEventListener(
    "scroll",
    updateScroll,
    {
        passive: true
    }
);


updateScroll();



/* =========================================
   MOBILE MENU
========================================= */

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");


menuButton.addEventListener(
    "click",
    () => {

        mobileMenu.classList.toggle("open");

        document.body.classList.toggle(
            "menu-open"
        );

    }
);



/*
   Close mobile menu after
   clicking a navigation link
*/

const mobileLinks =
    mobileMenu.querySelectorAll("a");


mobileLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            mobileMenu.classList.remove(
                "open"
            );

            document.body.classList.remove(
                "menu-open"
            );

        }
    );

});



/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "visible"
                    );


                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {

            threshold: .14,

            rootMargin:
                "0px 0px -40px 0px"

        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});



/* =========================================
   ANIMATED STATISTICS
========================================= */

const counters =
    document.querySelectorAll(
        "[data-count]"
    );


const counterObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (
                    !entry.isIntersecting
                ) return;


                const element =
                    entry.target;


                const target =
                    Number(
                        element.dataset.count
                    );


                const duration =
                    1300;


                const startTime =
                    performance.now();


                function animateCounter(
                    currentTime
                ) {

                    const progress =
                        Math.min(
                            (currentTime -
                                startTime) /
                            duration,
                            1
                        );


                    /*
                       Smooth ease-out
                    */

                    const eased =
                        1 -
                        Math.pow(
                            1 - progress,
                            3
                        );


                    const value =
                        Math.floor(
                            target * eased
                        );


                    element.textContent =
                        value.toLocaleString(
                            "en-IN"
                        );


                    if (
                        progress < 1
                    ) {

                        requestAnimationFrame(
                            animateCounter
                        );

                    }

                }


                requestAnimationFrame(
                    animateCounter
                );


                counterObserver.unobserve(
                    element
                );

            });

        },

        {

            threshold: .65

        }

    );


counters.forEach(counter => {

    counterObserver.observe(counter);

});



/* =========================================
   GALLERY LIGHTBOX
========================================= */

const lightbox =
    document.getElementById(
        "lightbox"
    );


const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );


const closeLightbox =
    document.getElementById(
        "closeLightbox"
    );


const galleryItems =
    document.querySelectorAll(
        ".gallery-item"
    );



galleryItems.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            const image =
                item.dataset.image;


            const thumbnail =
                item.querySelector("img");


            lightboxImage.src =
                image;


            lightboxImage.alt =
                thumbnail.alt;


            lightbox.classList.add(
                "open"
            );


            document.body.classList.add(
                "menu-open"
            );

        }
    );

});



/*
   Close gallery
*/

function closeGallery() {

    lightbox.classList.remove(
        "open"
    );


    document.body.classList.remove(
        "menu-open"
    );


    setTimeout(() => {

        lightboxImage.src = "";

    }, 300);

}


closeLightbox.addEventListener(
    "click",
    closeGallery
);



/*
   Close when clicking
   outside image
*/

lightbox.addEventListener(
    "click",
    event => {

        if (
            event.target === lightbox
        ) {

            closeGallery();

        }

    }
);



/*
   Close with ESC
*/

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeGallery();

        }

    }
);



/* =========================================
   CURRENT YEAR
========================================= */

document.getElementById(
    "year"
).textContent =
    new Date().getFullYear();
