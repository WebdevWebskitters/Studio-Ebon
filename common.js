"use strict";
document.addEventListener("DOMContentLoaded", pageScript, false);
function pageScript() {
    gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin);
    gsap.config({
        nullTargetWarn: false,
    });

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
    // }a

    $(document).ready(function () {

        $(".mrque_dtls_sldr").wrapInner("<em class='mrquee_txt mrquee_txt_alt'></em>");
        $(".mrquee_txt_alt").wrap("<span class='mrquee_item'></span>");
        $(".txt_lne_indvdl").wrapInner("<span class='hdng_info_txt'></span>");

        // Clone Text And Append
        let hdngMain = document.querySelectorAll('.mrque_dtls_sldr');
        hdngMain.forEach((el, i) => {
            let hdngInner = document.querySelector('.mrque_dtls_sldr .mrquee_item');
            let copy = hdngInner.cloneNode(true);
            el.appendChild(copy);
        })
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
            // Details Text Wrapper


            //Text Line Animation
            if ($(".bnr_hdng_wrp").length) {
                $(".bnr_hdng_wrp").each(function () {
                    let ele = $(this);
                    gsap.set([ele.find('.hdng_anim'), ele.find('.hdng_info_txt')], {
                        translateY: "100%",
                        transformStyle: "preserve-3d",
                    });
                    var t1 = gsap.timeline({
                        repeat: 0,

                    });
                    t1
                        .to($('.hdng_anim'), {
                            delay: 1.5,
                            translateY: 0,
                        }, "+=0.3")
                        .to($('.hdng_info_txt'), {
                            translateY: 0,
                        })
                })

            }
            //Text Line Animation 2
            if ($(".inner_bnnr").length) {
                $(".inner_bnnr").each(function () {
                    let ele = $(this);
                    gsap.set([ele.find('.hdng_anim'), ele.find('.hdng_info_txt')], {
                        translateY: "100%",
                        transformStyle: "preserve-3d",
                    });
                    var t1 = gsap.timeline({
                        repeat: 0,
                    })
                    t1
                        .to($('.hdng_anim'), {
                            delay: 1.5,
                            translateY: 0,
                        }, "+=0.3")
                        .to($('.hdng_info_txt'), {
                            translateY: 0,
                        })
                })

            }
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
            slidesPerView: 3.5,
            grabCursor: true,
            spaceBetween: '7%',
            // centeredSlides: true,
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
                        scroller: isDekstop ? pageContainer : window,
                    },
                })
            })

        }

        let brandBox = document.querySelectorAll('.brnd_lnk_box');

        let cursorXx = document.querySelector('.custom_cursor_alt');
        let cursorBttnAlt = document.querySelector('.custom_arrw_bttn_alt');
        brandBox.forEach((el) => {
            function mouseFunction(e) {
                let mousePosX = e.clientX;
                let mousePosY = e.clientY;
                cursorXx.style.transform = `translate3d(${mousePosX - (cursorBttnAlt.clientWidth / 2)}px, ${mousePosY - (cursorBttnAlt.clientHeight / 2)}px, 0)`;
            }
            el.addEventListener('mousemove', mouseFunction, false);
            el.addEventListener('click', mouseFunction, false);
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
        //Swiper Slider With Custom Arrow 2
        var swiper = new Swiper(".cultre_sldr", {
            slidesPerView: 1.5,
            grabCursor: true,
            spaceBetween: '1.5%',
            // centeredSlides: true,
            loop: false,
            pagination: {
                el: '.swiper-pagination',
                type: 'custom',
                renderCustom: function (swiper, current, total) {
                    return current + '<span>-</span>' + total;
                }
            }
        });
        //Swiper Slider With Custom Arrow 3
        var swiper = new Swiper(".tem_sldr", {
            slidesPerView: 3.5,
            grabCursor: true,
            spaceBetween: '1.5%',
            loop: false,
        });
        // Custom Cursor 3
        let mrqueeBox = document.querySelectorAll('.mrquee_cursor_hldr');

        let cursorXY = document.querySelector('.custom_arrw_cursor');
        let cusrorArrwBttn = document.querySelector('.custom_arrw_bttn');
        mrqueeBox.forEach((el) => {
            function mouseFunction(e) {
                let mousePosX = e.clientX;
                let mousePosY = e.clientY;
                cursorXY.style.transform = `translate3d(${mousePosX - (cusrorArrwBttn.clientWidth / 2)}px, ${mousePosY - (cusrorArrwBttn.clientHeight / 2)}px, 0)`;
            }
            el.addEventListener('mousemove', mouseFunction, false);
            el.addEventListener('click', mouseFunction, false);
            el.addEventListener('mouseenter', function () {
                cursorXY.classList.add("active");
                el.classList.add('active_box')
            });
            el.addEventListener('mouseleave', function () {
                cursorXY.classList.remove("active");
                el.classList.remove('active_box')
            })
        });

        // Play Audio Cursor
        let audioBox = document.querySelectorAll('.aud_txt_box');

        let cursorXYZ = document.querySelector('.play_cursor');
        let playBttn = document.querySelector('.ply_bttn');
        audioBox.forEach((el) => {
            function mouseFunction(e) {
                let mousePosX = e.clientX;
                let mousePosY = e.clientY;
                cursorXYZ.style.transform = `translate3d(${mousePosX - (playBttn.clientWidth / 2)}px, ${mousePosY - (playBttn.clientHeight / 2)}px, 0)`;
            }
            el.addEventListener('mousemove', mouseFunction, false);
            el.addEventListener('click', mouseFunction, false);
            el.addEventListener('mouseenter', function () {
                cursorXYZ.classList.add("active");
                el.classList.add('active_audio')
            });
            el.addEventListener('mouseleave', function () {
                cursorXYZ.classList.remove("active");
                el.classList.remove('active_audio')
            })
        });

        // Audio Text Sync
        const target = document?.querySelectorAll(".play_text>div"),
            audio = document?.querySelector("audio"),
            btn = document?.querySelector(".play_cursor"), audioPlayBox = document?.querySelector('.aud_txt_box');

        let time = audio?.dataset.time;
        if (time != undefined || time != null) {
            let tl = gsap.timeline({
                paused: !0,
                defaults: {
                    ease: "none",
                    duration: 0.5
                }
            }),
                tl_main = gsap.timeline();
            target.forEach(function (el) {
                gsap.set(el, {
                    xPercent: -100,
                    opacity: 1,
                    overflow: "hidden",
                    position: "relative"
                });
                gsap.set(el.querySelector("div"), { xPercent: 100, opacity: 1 });
                tl.to(el, {
                    xPercent: 0
                }).to(
                    el.querySelector("div"),
                    {
                        xPercent: 0
                    },
                    "<"
                );
            });
            tl.pause();

            tl_main
                .to(tl, {
                    progress: 1,
                    duration: time,
                    ease: "none"
                })
                .pause();

            audioPlayBox?.addEventListener("click", function () {
                if (!tl_main.isActive()) {
                    audio.play();
                    tl_main.restart();
                    // btn.innerHTML = "now playing";
                    btn.classList.add('playing');
                } else {
                    audio.currentTime = 0;
                    audio.pause();
                    tl_main.pause();
                    // btn.innerHTML = "play";
                    btn.classList.remove('playing');
                }
            });

            window.addEventListener("resize", () => {
                audio.pause();
                audio.currentTime = 0;
                tl_main.pause();
                tl_main.progress(0);
                //btn.innerHTML = "play";
            });
        }
        let goToLinks = gsap.utils.toArray('.hw_lnk');
        goToLinks.forEach((btn, index) => {
            btn.addEventListener("click", () => {
                // gsap.to(window, {
                //     duration: 1,
                //     scrollTo: { y: "#about-studio-" + (index + 1), offsetY: 0 },
                //     //scroller: isDekstop ? pageContainer : window,
                // });
                locoScroll.scrollTo("#about-studio-" + (index + 1));
                locoScroll.update();
            });
        });

        // Orbit Animation
        let circle = document?.querySelector('.crcle_anim');
        let circleOuter = document?.querySelector('.orbt_wrp');
        let sectionAnim = document?.querySelectorAll('.mthd_idea_box');
        let orbitAnim = document?.querySelectorAll('.ech_orbt_section');

        let circleHeight = circleOuter?.offsetHeight;
        let halfWidth = circleOuter?.offsetWidth / 2;
        let halfCircleWidth = circle?.offsetWidth / 2

        let circleAnimation = gsap.to(circle, {
            translateX: `${halfWidth - halfCircleWidth}px`,
            translateY: `${circle?.offsetHeight / 3}px`,
            scale: 0.75,
            ease: 'none',
            scroller: isDekstop ? pageContainer : window,
        });

        ScrollTrigger.create({
            trigger: sectionAnim,
            start: "top top",
            end: () => `+=${circleHeight / 2 + circleHeight / 3}px`,
            // markers: true,
            scrub: 1,
            animation: circleAnimation,
            scroller: isDekstop ? pageContainer : window,
        });

        let dotAnim = document.querySelectorAll('.crcle_dot');

        function addRemove(i) {
            $(dotAnim).removeClass("active");
            dotAnim[i].classList.add('active');
        }

        orbitAnim.forEach((el, i) => {
            ScrollTrigger.create({
                trigger: el,
                start: "top 60%",
                end: () => "bottom 60%",
                pin: circleOuter,
                pinSpacing: false,
                scroller: isDekstop ? pageContainer : window,
                onEnter: function () {
                    addRemove(i);
                    circleOuter.classList.add('anim_active')
                },
                onEnterBack: function () {
                    addRemove(i);
                    circleOuter.classList.add('anim_active')
                },
                onLeave: function () {
                    if (i == 0) {
                        dotAnim[0].classList.remove('active');
                        circleOuter.classList.remove('anim_active')
                    }
                },
                onLeaveBack: function () {
                    if (i == 0) {
                        dotAnim[0].classList.remove('active');
                        circleOuter.classList.remove('anim_active')
                    }
                },
                // markers: true,
            })

        })

        let navLinks = document.querySelectorAll('.nxt_stp_lnk');
        navLinks.forEach((btn, index) => {
            btn.addEventListener("click", () => {
                // gsap.to(window, {
                //     duration: 1,
                //     scrollTo: { y: "#orbit-" + (index + 1), offsetY: 0 },
                //     // scroller: isDekstop ? pageContainer : window,
                // });
                locoScroll.scrollTo("#orbit-" + (index + 1));
                locoScroll.update();
            });
        });

        // Accordion
        let accItem = document.getElementsByClassName('acc_item');
        let accBtn = document.getElementsByClassName('acc_bttn');
        // var accPanel = document.getElementsByClassName('acc_bttn');
        for (let i = 0; i < accBtn.length; i++) {
            accBtn[i].addEventListener('click', toggleItem, false);
            accBtn[i].addEventListener('click', function () {
                locoScroll.update();
            });
        }
        function toggleItem() {
            let itemClass = this.parentNode.className;
            for (let i = 0; i < accItem.length; i++) {
                accItem[i].className = 'acc_item close';
            }
            if (itemClass == 'acc_item close') {
                this.parentNode.className = 'acc_item open';
            }
        }

        // Random Positioning Gallery
        const imgGallery = document?.getElementById("modal-1");
        // const modalGallery = document?.querySelector(".idea_modal");

        if ($("#modal-1").length) {
            const list = imgGallery?.querySelector(".img_lstng");
            const item = list?.querySelectorAll(".img_hldr");
            const totalLn = item?.length;
            var count = parseInt(imgGallery?.getAttribute("random_gallery"), 0);
            var duration = Number(imgGallery?.getAttribute("data-time"));
            let contW = imgGallery?.getBoundingClientRect().width;
            item.forEach((el) => {
                let imgWidth = el?.querySelector('.mdl_img')?.clientWidth;
                gsap.set(el, {
                    width: `${Math.round(((contW - imgWidth - imgWidth / (item.length * 4)) / contW) * 100) / 2}%`,
                })
            })
            if (isNaN(count)) {
                count = Math.floor(totalLn / 2);
            }
            if (duration == 0) {
                duration = 1;
            }
            var k = 0;
            var mainTl = gsap.timeline({
                pause: true,
                defaults: {
                    duration: duration,
                },
            }),
                subTl = gsap.timeline({
                    pause: true,
                    repeatRefresh: true,
                    repeat: -1,
                    defaults: {
                        duration: duration,
                    },
                });

            if (count + 2 < totalLn) {
                [...item].map((el, i) => {
                    //primary setup
                    gsap.set(el, {
                        opacity: 0,
                        position: "absolute",
                        left: 0,
                        top: 0,
                        x: getRandomNumber(0, list.clientWidth - el.clientWidth / 2),
                        y: getRandomNumber(0, list.clientHeight - el.clientHeight / 2),
                    });

                    if (i >= 0 && i < count) {
                        k = count + i;
                    }
                    if (k > totalLn - 2) {
                        k = -1;
                    }
                    k++;

                    subTl
                        .to(item[k], {
                            opacity: 1,
                        })
                        .to(
                            item[i],
                            {
                                opacity: 0,
                            },
                            "<"
                        )
                        .set(item[i], {
                            x: getRandomNumber(0, list.clientWidth - item[i].clientWidth / 2),
                            y: getRandomNumber(0, list.clientHeight - item[i].clientHeight / 2),
                        });
                });
                subTl.pause();

                //for first time show
                for (let i = 0; i <= count; i++) {
                    mainTl.set(item[i], { opacity: 0 }).to(item[i], {
                        opacity: 1,
                        onComplete: () => {
                            if (i == count) {
                                subTl.restart();
                            }
                        },
                    });
                }
                mainTl.pause();
            }

            // gsap.set(list, {
            //     opacity: 0,
            //     pointerEvents: "none",
            // });
            const btn = document.querySelector("[data-gallery_btn]");
            btn.addEventListener("mouseenter", () => {
                mainTl.totalProgress(0);
                mainTl.pause();
                subTl.totalProgress(0);
                gsap.to(imgGallery, {
                    opacity: 1,
                    onComplete: () => mainTl.restart(),
                });
            });

            btn.addEventListener("mouseleave", () => {
                mainTl.totalProgress(0);
                mainTl.pause();
                subTl.totalProgress(0);
                subTl.pause();
                gsap.to(imgGallery, {
                    opacity: 0,
                    pointerEvents: "none",
                });
                gsap.set(item, {
                    opacity: 0,
                });
            });
        }
        function getRandomNumber(min, max) {
            return Math.random() * (max - min) + min;
        }

        // Custom Select Dropdown

        // if(postonTop !== null || assgnHeight !== null){
        //         postonTop.style.top = assgnHeight +  "px";

        // }else{
        //    return false;
        // }
        if ($(".slct_rght").length) {
            let postonTop = document?.querySelector(".slct_lst_drp");
            let assgnHeight = document?.querySelector(".srch_slct_tggle")?.clientHeight;
            postonTop.style.top = assgnHeight + "px";
        }
        $('srch_slct').hide()
        $('.srch_slct_tggle').on('click', function () {
            $(this).next().slideToggle();
            $(this).parent().toggleClass('selct_active');
            locoScroll.update();
        });
        $('.custom_lnk').on('click', function () {
            $(this).parents('.srch_slct').find('.slct_lst_drp').slideUp();
            $(this).parents('.srch_slct').removeClass('selct_active');
        });
        $('.custom_lnk input[type=radio]').change(function () {
            if ($(this).is(':checked')) {
                $(this).parents('.srch_slct').find('.srch_slct_tggle').children('.srch_txt_block').text($(this).next('span').text());
            }
            setTimeout(() => {
                locoScroll.update();
                ScrollTrigger.refresh();
            }, 300);
        });

        // Loop Scroll
        const $menu = document?.querySelector('.list_item_wrppr')
        const $items = document?.querySelectorAll('.wrk_lstng_item')
        let menuHeight = $menu?.clientHeight
        let itemHeight = $items[0]?.clientHeight
        let wrapHeight = $items.length * itemHeight
        let scrollSpeed = 0
        let oldScrollY = 0
        let scrollY = 0
        let y = 0

        const lerp = (v0, v1, t) => {
            return v0 * (1 - t) + v1 * t
        }
        const dispose = (scroll) => {
            gsap.set($items, {
                y: (i) => {
                    return i * itemHeight + scroll
                },
                modifiers: {
                    y: (y) => {
                        const s = gsap.utils.wrap(-itemHeight, wrapHeight - itemHeight, parseInt(y))
                        return `${s}px`
                    }
                }
            })
        }
        dispose(0)
        const handleMouseWheel = (e) => {
            scrollY -= e.deltaY
        }
        $menu?.addEventListener('wheel', handleMouseWheel)
        $menu?.addEventListener('selectstart', () => { return false })
        window.addEventListener('resize', () => {
            menuHeight = $menu?.clientHeight
            itemHeight = $items[0]?.clientHeight
            wrapHeight = $items.length * itemHeight
        })
        const render = () => {
            requestAnimationFrame(render)
            y = lerp(y, scrollY, .1)
            dispose(y)

            scrollSpeed = y - oldScrollY
            oldScrollY = y
        }
        render();

        // On Hover Show Respective Item
        let hiddenBox = document.querySelectorAll('.hddn_wrk_item');
        let navItemLink = document.querySelectorAll('.wrk_nav_lnk')

        hiddenBox.forEach((elem) => {
            gsap.set(elem, { opacity: 0, yPercent: 10, zIndex: 0, overflow: "hidden" });
            gsap.set($(elem).find("img"), {
                yPercent: 50,
                opacity: 0,
            })
            gsap.set($(elem).children("[data-text]"), {
                yPercent: 100,
                opacity: 0,
            })
        });

        function hoverAnim() {
            let index = Array.from(navItemLink).indexOf(event.target);
            let aa = hiddenBox[index];
            gsap.timeline()
                .to($(hiddenBox).not($(aa)), { opacity: 0, yPercent: -10, duration: 0.4, zIndex: 0, ease: "none" })
                .to(aa, { opacity: 1, yPercent: 0, duration: 0.4, zIndex: 1, ease: "none", }, "-=0.35")
                .to($(aa).find("img"), {
                    duration: 0.5,
                    yPercent: 0,
                    opacity: 1,
                }, "-=0.35")
                .to($(aa).children("[data-text]"), {
                    duration: 0.3,
                    yPercent: 0,
                    opacity: 1,
                    stagger: 0.1,
                }, "-=0.15")
                .set($(hiddenBox).not($(aa)).find("img"), { opacity: 0, yPercent: 50, })
                .set($(hiddenBox).not($(aa)).children("[data-text]"), { opacity: 0, yPercent: 100, })
                .set($(hiddenBox).not($(aa)), { opacity: 0, yPercent: 10, zIndex: 0, })
        }
        function hoverAnimOut() {
            let index = Array.from(navItemLink).indexOf(event.target);
            let aa = hiddenBox[index];
            gsap.timeline().to($(aa).find("[data-text]"), {
                duration: 0.2,
                yPercent: -100,
                opacity: 0,
                stagger: 0.1,
            }).to($(aa).find("img"), {
                // duration: 0.3,
                yPercent: -50,
                opacity: 0,
            }, "<")
                .set(aa, { opacity: 0, yPercent: -10, zIndex: 0, })
        }

        // }
        // hoverAnimOut();
        navItemLink.forEach((ele, x) => {
            ele.addEventListener('mouseenter', hoverAnim, false);
            ele.addEventListener('mouseleave', hoverAnimOut, false);
            ele.addEventListener('mouseout', hoverAnimOut, false);
        })

        //Swiper Slider With Custom Arrow 3
        var swiper = new Swiper(".clnts_sldr", {
            slidesPerView: 2.5,
            grabCursor: true,
            spaceBetween: '1.5%',
            // centeredSlides: true,
            loop: false,
            pagination: {
                el: '.swiper-pagination',
                type: 'custom',
                renderCustom: function (swiper, current, total) {
                    return current + '<span>-</span>' + total;
                }
            }
        });
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
