document.addEventListener("DOMContentLoaded", function () {


    /* ==========================================
       PRELOADER
       ========================================== */

    const preloader =
        document.getElementById("preloader");


    if (preloader) {

        setTimeout(function () {

            preloader.classList.add("hide");

        }, 1600);

    }



    /* ==========================================
       NAVBAR
       ========================================== */

    const navbar =
        document.getElementById("navbar");


    const topButton =
        document.getElementById("topButton");


    function updateScroll() {

        if (window.scrollY > 40) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }


        if (window.scrollY > 600) {

            topButton.style.display = "block";

        } else {

            topButton.style.display = "none";

        }

    }


    window.addEventListener(
        "scroll",
        updateScroll,
        { passive: true }
    );


    updateScroll();



    /* ==========================================
       MOBILE MENU
       ========================================== */

    const menuButton =
        document.getElementById("menuButton");


    const navigation =
        document.getElementById("navigation");


    menuButton.addEventListener(
        "click",
        function () {

            navigation.classList.toggle("open");

        }
    );


    document
        .querySelectorAll(".navigation a")
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    navigation.classList.remove("open");

                }
            );

        });



    /* ==========================================
       BACK TO TOP
       ========================================== */

    topButton.addEventListener(
        "click",
        function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );



    /* ==========================================
       SCROLL REVEAL
       ========================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target
                            .classList
                            .add("visible");

                        revealObserver
                            .unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    revealElements.forEach(
        function (element) {

            revealObserver.observe(element);

        }
    );



    /* ==========================================
       NUMBER COUNTERS
       ========================================== */

    const counters =
        document.querySelectorAll("[data-number]");


    counters.forEach(function (counter) {

        let started = false;


        const counterObserver =
            new IntersectionObserver(

                function (entries) {

                    if (
                        !entries[0].isIntersecting ||
                        started
                    ) {

                        return;

                    }


                    started = true;


                    const target =
                        Number(
                            counter.dataset.number
                        );


                    const duration = 1300;

                    const startTime =
                        performance.now();


                    function animate(time) {

                        const progress =
                            Math.min(
                                (time - startTime)
                                / duration,
                                1
                            );


                        const eased =
                            1 -
                            Math.pow(
                                1 - progress,
                                3
                            );


                        const current =
                            Math.floor(
                                eased * target
                            );


                        counter.textContent =
                            current.toLocaleString()
                            + (target > 20 ? "+" : "");


                        if (progress < 1) {

                            requestAnimationFrame(
                                animate
                            );

                        }

                    }


                    requestAnimationFrame(
                        animate
                    );


                    counterObserver.disconnect();

                },

                {
                    threshold: .6
                }

            );


        counterObserver.observe(counter);

    });



});
