"use strict";
document.addEventListener("DOMContentLoaded", pageScript, false);
function pageScript() {
    gsap.registerPlugin(ScrollTrigger, Observer);

    window.scrollTo(0, 0);
    if (window.history.scrollRestoration) {
        window.history.scrollRestoration = "manual";
    }

    const responsive_size = 1024;
    var isDekstop = true;

    if (window.innerWidth <= responsive_size) {
        isDekstop = false;
        document.body.classList.add("mobileLayout");
    }

    //detect device
    function detectDevice() {
        const iOS = /^iP/.test(navigator.platform);
        if (iOS) {
            document.body.classList.add("iphone");
        } else {
            document.body.classList.add("android");
        }
    }
    detectDevice();

    // Detect Safari
    if (
        navigator.userAgent.indexOf("Safari") > -1 &&
        navigator.userAgent.indexOf("Chrome") <= -1
    ) {
        document.body.classList.add("safariBrowser");
    }

    //prevent scroll
    function pvs(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
    function preventScroll() {
        document.body.classList.add("disable");
        document.addEventListener("wheel", pvs, { passive: false });
        document.addEventListener("touchstart", pvs, { passive: false });
        document.addEventListener("touchend", pvs, { passive: false });
        document.addEventListener("touchmove", pvs, { passive: false });
    }
    preventScroll();

    //enable scroll
    function enableScroll() {
        document.body.classList.remove("disable");
        document.removeEventListener("wheel", pvs, { passive: false });
        document.removeEventListener("touchstart", pvs, { passive: false });
        document.removeEventListener("touchend", pvs, { passive: false });
        document.removeEventListener("touchmove", pvs, { passive: false });
    }

    window.onbeforeunload = function () {
        window.history.scrollRestoration = "manual";
        ScrollTrigger.clearScrollMemory();
        window.scrollTo(0, 0);
    };

    var isLoaded = false;

    //// page smooth scroll
    const pageContainer = document.querySelector("[data-scroll-container]");
    //for desktop
    if (isDekstop) {
        var locoScroll = new LocomotiveScroll({
            el: pageContainer,
            smooth: true,
            class: "inviewport",
            reloadOnContextChange: true,
            offset: [0, 0],
            repeat: true,
            initPosition: { x: 0, y: 0 },
            direction: "vertical",
            getDirection: true,
            getSpeed: true,
            tablet: { breakpoint: 0, smooth: false },
            smartphone: { smooth: false },
        });
        locoScroll.on("scroll", ScrollTrigger.update);
        ScrollTrigger.scrollerProxy(pageContainer, {
            scrollTop(value) {
                return arguments.length
                    ? locoScroll.scrollTo(value, 0, 0)
                    : locoScroll.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            pinType: pageContainer.style.transform ? "transform" : "fixed",
        });
        ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

        document.addEventListener('DOMContentLoaded', function () {
            locoScroll.update();
            ScrollTrigger.refresh();
        });
        document.addEventListener('resize', function () {
            locoScroll.update();
            ScrollTrigger.refresh();
        });
        new ResizeObserver(() => locoScroll.update()).observe(pageContainer);

        ScrollTrigger.refresh();
        locoScroll.stop();
    }


    // try {
    //     ScrollTrigger.refresh();
    //     locoScroll.update();
    // }
    // catch (err) {
    //     console.log(err, ", loading failed");
    // }

    $(document).ready(function () {
        ///////// init function //////////////////
        function loadInit() {
            //locomotive & scrolltrigger refresh
            ScrollTrigger.clearScrollMemory();
            ScrollTrigger.refresh();
            window.scrollTo(0, 0);
            if (isDekstop) {
                locoScroll.scrollTo(pageContainer, 0);
                ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
            }

            //pause loader
            gsap.set(pageContainer, { opacity: 1, pointerEvents: "all" });
            gsap.to(".preloader", {
                delay: 1.5,
                opacity: 0,
                pointerEvents: "none",
                duration: 1,
            });

            setTimeout(() => {
                //ScrollTrigger.refresh();
                isLoaded = true;

                enableScroll();
                locoScroll.start();
            }, 1500);
            ///end
        }
        /////////////////////////////////////////
        /*
        
            /*** */
        //   Swiper Slider Continious 
        var swiper = new Swiper(".trstd_sldr", {
            loop: true,
            freeMode: true,
            spaceBetween: '6%',
            autoplay: {
                delay: 0,
            },
            speed: 3000,
            slidesPerView: 6,
        });

        //Swiper Slider With Custom Arrow
        var swiper = new Swiper(".clnt_sldr", {
            slidesPerView: 4,
            grabCursor: true,
            spaceBetween: '7%',
            centeredSlides: true,
            loop: true,
            navigation: {
                nextEl: ".custom_arrw_lft",
                prevEl: ".custom_arrw_rght",
            },
        });
        let wrapperHolder = document.querySelectorAll('.sldr_cursor_wrppr');

        let cursorX = document.querySelector('.custom_cursor');
        let cursorBttn = document.querySelector('.custom_arrw_bttn');
        wrapperHolder.forEach((el, i) => {
            let totlWidth = el.offsetWidth;
            function mouseFunction(e) {
                let mousePosX = e.clientX;
                let mousePosY = e.clientY;
                let pageX = mousePosX - el.offsetLeft;
                let percX = Math.ceil(((pageX / totlWidth) * 100) - 50);
                if (percX > 0) {
                    cursorX.classList.add('next_active');
                    cursorX.classList.remove('prev_active')
                } else {
                    cursorX.classList.add('prev_active');
                    cursorX.classList.remove('next_active');
                }
                cursorX.style.transform = `translate3d(${mousePosX - (cursorBttn.clientWidth / 2)}px, ${mousePosY - (cursorBttn.clientHeight / 2)}px, 0)`;
                // console.log(mousePosX);
                // console.log(mousePosY);

            }
            el.addEventListener('mousemove', mouseFunction, false);
            el.addEventListener('click', mouseFunction, false);
            el.addEventListener('mouseenter', function () {
                cursorX.classList.add("active");
                el.closest('.sldr_cursor_wrppr').classList.add('active_main')
            });
            el.addEventListener('mouseleave', function () {
                cursorX.classList.remove("active");
                cursorX.classList.remove('prev_active');
                cursorX.classList.remove('next_active');
                el.closest('.sldr_cursor_wrppr').classList.remove('active_main')
            })
        });

        const dataScrolling = document.querySelectorAll("[data-scrolling]");

        dataScrolling.forEach((el) => {
            const scl_direction = el.dataset.scrolling;
            if (scl_direction != "up" || scl_direction != "down") {

                const scrollingText = el.querySelectorAll('.mrquee_item');

                const tl = horizontalLoop(scrollingText, {
                    repeat: -1,
                });

                Observer.create({
                    onChangeY(self) {
                        let factor = 2.5 * (scl_direction != "up" ? -1 : 1);
                        if (self.deltaY < 0) {
                            factor *= 1;
                        }
                        gsap.timeline({
                            defaults: {
                                ease: "none",
                            }
                        })
                            .to(tl, { timeScale: factor * 2.5, duration: 0.2 })
                            .to(tl, { timeScale: factor / 2.5, duration: 1 }, "+=0.3");
                    }
                });
            }
            function horizontalLoop(items, config) {
                items = gsap.utils.toArray(items);
                config = config || {};
                let tl = gsap.timeline({ repeat: config.repeat, paused: config.paused, defaults: { ease: "none" }, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100) }),
                    length = items.length,
                    startX = items[0].offsetLeft,
                    times = [],
                    widths = [],
                    xPercents = [],
                    curIndex = 0,
                    pixelsPerSecond = (config.speed || 1) * 100,
                    snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1),
                    totalWidth, curX, distanceToStart, distanceToLoop, item, i;
                gsap.set(items, {
                    xPercent: (i, el) => {
                        let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
                        xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
                        return xPercents[i];
                    }
                });
                gsap.set(items, { x: 0 });
                totalWidth = items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX") + (parseFloat(config.paddingRight) || 0);
                for (i = 0; i < length; i++) {
                    item = items[i];
                    curX = xPercents[i] / 100 * widths[i];
                    distanceToStart = item.offsetLeft + curX - startX;
                    distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
                    tl.to(item, { xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
                        .fromTo(item, { xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100) }, { xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond)
                        .add("label" + i, distanceToStart / pixelsPerSecond);
                    times[i] = distanceToStart / pixelsPerSecond;
                }
                function toIndex(index, vars) {
                    vars = vars || {};
                    (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
                    let newIndex = gsap.utils.wrap(0, length, index),
                        time = times[newIndex];
                    if (time > tl.time() !== index > curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
                        vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
                        time += tl.duration() * (index > curIndex ? 1 : -1);
                    }
                    curIndex = newIndex;
                    vars.overwrite = true;
                    return tl.tweenTo(time, vars);
                }
                tl.next = vars => toIndex(curIndex + 1, vars);
                tl.previous = vars => toIndex(curIndex - 1, vars);
                tl.current = () => curIndex;
                tl.toIndex = (index, vars) => toIndex(index, vars);
                tl.times = times;
                tl.progress(1, true).progress(0, true);
                if (scl_direction != "up") {
                    tl.vars.onReverseComplete();
                    tl.reverse();
                }
                return tl;
            }
        })
        //Text Line Animation
        $('.hdng_anim').each(function () {
            let ele = $(this);
            ele.wrap('<span class="hdng_wrppr"></span>')
        })
        if ($(".bnr_hdng_wrp").length) {
            $(".bnr_hdng_wrp").each(function () {
                let ele = $(this);
                gsap.set([ele.find('.hdng_anim'), ele.find('.hdng_info_txt')], {
                    translateY: "100%",
                    transformStyle: "preserve-3d",
                });
                var t1 = gsap.timeline({
                    repeat: 0,
                    delay: 1.5,
                    scrollTrigger: {
                        trigger: ele,
                        start: "top bottom",
                        end: "bottom bottom",
                        scrub: false,
                        scroller: isDekstop ? pageContainer : window,
                    },
                })
                t1
                    .to($('.hdng_anim'), {
                        translateY: 0,
                    }, "+=0.3")
                    .to($('.hdng_info_txt'), {
                        translateY: 0,
                    })
            })

        }

        //Video Animation
        let video_sec = document?.querySelector(".video_sec");
        let videoBox = video_sec?.querySelector(".video_box"),
            videoPara = video_sec?.querySelector(".para");

        let topPos = videoBox?.getBoundingClientRect().top;
        let tl = gsap.timeline({
            defaults: {
                duration: 0.5,
                ease: "none",
            },
        });

        tl.set(videoBox, {
            clipPath: "inset(22% 30%)",
            opacity: 1,
            yPercent: -40,
            overwrite: true,
        })
            .set(videoPara, {
                opacity: 0,
                yPercent: 100,
                overwrite: true,
            })
            //   .to(videoBox, {
            //     yPercent: 0,
            //     clipPath: "inset(5% 5%)",
            //   })
            .to(videoBox, {
                yPercent: 0,
                clipPath: "inset(0% 0%)",
                duration: 1.5,
            })
            .to(
                videoPara,
                {
                    opacity: 1,
                    yPercent: 0,
                },
                "-=1"
            )
            .to(videoPara, {
                opacity: 0,
                yPercent: -200,
            })
            .to(videoBox, {
                clipPath: "inset(43% 53% 34% 28%)",
                yPercent: 97,
                transformOrigin: "50% 100%",
            });

        tl.pause();
        ScrollTrigger.create({
            trigger: video_sec,
            start: `top ${topPos}`,
            end: "+=320%",
            animation: tl,
            scrub: 1.1,
            //   invalidateOnRefresh: true,
            scroller: isDekstop ? pageContainer : window,
        });

        ScrollTrigger.create({
            trigger: video_sec,
            start: "top +=12.5%",
            end: "+=150%",
            pin: true,
            scrub: 1.1,
            //   invalidateOnRefresh: true,
            scroller: isDekstop ? pageContainer : window,
        });

        //Footer Animation
        if ($(".innr_footr").length) {
            $(".innr_footr").each(function () {
                let ele = $(this);
                gsap.set(ele, {
                    yPercent: -35,
                    // transformStyle: "preserve-3d",
                });
                gsap
                    .to(ele, {
                        scrollTrigger: {
                            trigger: ele,
                            start: "top 85%",
                            end: "bottom 50%",
                            scrub: 1.2,
                            // transformOrigin: "top top",
                            scroller: isDekstop ? pageContainer : window,
                        },
                        yPercent: 0,
                    })
            })

        }
        let topPos2 = document?.querySelector('.vid_hdng_box')?.getBoundingClientRect().top;
        // let endPoint = 
        if ($(".strd_anim_bttn").length) {
            $(".strd_anim_bttn").each(function () {
                let ele = $(this);
                gsap.to(ele, {
                    rotation: 360,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: ele,
                        start: `top ${topPos2}`,
                        end: `+=${window.innerHeight}`,
                        scrub: 0.5,
                        //transformOrigin: "top top",
                        scroller: isDekstop ? pageContainer : window,
                    },
                })
            })

        }
        // /add class in viewport
        // function scrollUpdate() {
        // document.querySelectorAll(".sldr_cursor_wrppr").forEach((sec) => {
        //     let poz= ScrollTrigger.positionInViewport(sec, "center").toFixed(2);
        //     console.log(poz);
        //     poz>0 && poz<=1?document.querySelector('.custom_cursor').classList.add("active_cursor"):document.querySelector('.custom_cursor').classList.remove("active_cursor");
        // });
        // }
        // if (isDekstop) {
        //     locoScroll.on("scroll", scrollUpdate)
        // }
        // else{
        //     window.addEventListener("scroll", scrollUpdate);
        // }

        let brandBox = document.querySelectorAll('.brnd_lnk_box');

        let cursorXx = document.querySelector('.custom_cursor_alt');
        let cursorBttnAlt = document.querySelector('.custom_arrw_bttn_alt');
        brandBox.forEach((el, i) => {
            function mouseFunction(e) {
                let mousePosX = e.clientX;
                let mousePosY = e.clientY;
                cursorXx.style.transform = `translate3d(${mousePosX}px, ${mousePosY}px, 0)`;
            }
            el.addEventListener('mousemove', mouseFunction, false);
            el.addEventListener('mouseenter', function () {
                cursorXx.classList.add("active");
                el.classList.add('active_box')
            });
            el.addEventListener('mouseleave', function () {
                cursorXx.classList.remove("active");
                el.classList.remove('active_box')
            })
        });
        //Menu Link Animation
        let linkAnim = document?.querySelectorAll('.nav_menu > .nav_lnk');
        let botHedrTop = document?.querySelector('.main_header')?.getBoundingClientRect().top;
        linkAnim.forEach((el) => {
            ScrollTrigger.create({
                trigger: '.main_header',
                start: `top ${botHedrTop}`,
                end: `+=${window.innerHeight / 5}`,
                scroller: isDekstop ? pageContainer : window,
                onEnterBack: function () {
                    gsap
                        .to(el, {
                            yPercent: 0,
                            opacity: 1,
                            ease: "power3.inOut",
                            stagger: 0.2,
                            duration: 0.3,
                        })
                },
                onLeave: function () {
                    gsap
                        .to(el, {
                            yPercent: -100,
                            opacity: 0,
                            ease: "power3.inOut",
                            stagger: 0.2,
                            duration: 0.3,
                        })
                },
                onLeaveBack: function () {
                    gsap
                        .to(el, {
                            yPercent: 0,
                            opacity: 1,
                            ease: "power3.inOut",
                            stagger: 0.2,
                            duration: 0.3,
                        })
                },
            })
        })
        //parallax Background
        if ($("[data-parallax]").length) {
            $("[data-parallax]").each(function () {
                let pr_this = $(this);
                let pr_val = Number(pr_this.attr("data-parallax"));
                if (pr_this.find(".parallax_bg").length) {
                    gsap.set(pr_this.find(".parallax_bg"), {
                        yPercent: -pr_val,
                        height: 100 + pr_val + "%",
                    });

                    gsap.to(pr_this.find(".parallax_bg"), {
                        yPercent: pr_val,
                        duration: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: pr_this,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1.3,
                            invalidateOnRefresh: true,
                            scroller: isDekstop ? pageContainer : window,
                            // markers: true,
                        },
                    });
                }
            })
            }
                //end ready

                //// page loader
                jQuery("body")
                    .imagesLoaded({
                        background: true,
                    })
                    // .progress(function (instance, image) {})
                    .always(loadInit);
            });


        }
