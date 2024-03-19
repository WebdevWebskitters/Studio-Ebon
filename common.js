const clickGallery = document.querySelectorAll(".idea_slde_wrppr");
  if (clickGallery.length > 0) {
    clickGallery.forEach((imgWrapper) => {
      const list = imgWrapper.querySelector("ul");
      const item = list.querySelectorAll("li");
      const totalLn = item.length;
      var count = parseInt(imgWrapper.getAttribute("click_gallery"), 0);
      var duration = Number(imgWrapper.getAttribute("data-time"));

      if (count + 1 < totalLn) {
        if (isNaN(count)) {
          count = Math.floor(totalLn / 2);
        }
        if (duration == 0) {
          duration = 1;
        }
        if (isMob) {
          count = 1;
        }

        var i = count;
        var k = 0;

        //primary setup
        [...item].map((el, i) => {
          gsap.set(el, {
            display: () => (isMob ? "none" : "block"),
            position: () => (isMob ? "relative" : "absolute"),
            left: () => (isMob ? null : 0),
            top: () => (isMob ? null : 0),
            width: () => {
              if (isMob) {
                return "100%";
              } else {
                let ww = 60 - Math.abs(getRandWidth(i, totalLn / i));
                if (isNaN(ww) || ww < 30 || ww > 70) {
                  ww = 50;
                }
                return ww + "%";
              }
            },
            opacity: 0,
            scale: 0.8,
            transformOrigin: "50% 50%",
            zIndex: 0
          });
          if (i < count) {
            if (!isMob) {
              let center = {
                x: window.innerWidth / 2 - el.clientWidth / 2,
                y: window.innerHeight / 2 - el.clientHeight / 2,
                xOffset: window.innerWidth / (count * 2),
                yOffset: window.innerHeight / (count * 2)
              };
              //static generate
              gsap.set(el, {
                opacity: 1,
                scale: 1,
                transformOrigin: "50% 50%",
                zIndex: 2
              });

              gsap.set(item[0], {
                x: center.x + 150,
                y: center.y + 52
              });
              gsap.set(item[1], {
                x: center.x - 150,
                y: center.y - 52
              });
              gsap.set(item[2], {
                x: center.x,
                y: center.y
              });
            } else {
              gsap.set(el, {
                display: "block",
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                transformOrigin: "50% 50%",
                zIndex: 2
              });
            }
            el.classList.add("active");
          }
        });

        function callImg(i, pos) {
          gsap.set(item, {
            zIndex: 0,
            display: () => (isMob ? "none" : "block")
          });
          gsap.set(item[i], {
            display: "block",
            x: () => (isMob ? 0 : pos.x - item[i].clientWidth / 2),
            y: () => (isMob ? 0 : pos.y - item[i].clientHeight / 2),
            scale: 0.8,
            zIndex: 1
          });
          gsap.to(item[i], {
            opacity: 1,
            scale: 1,
            transformOrigin: "50% 50%",
            ease: "Power3.easeOut"
          });
          item[i].classList.add("active");

          if (list.querySelectorAll(".idea_slde_item.active").length > count) {
            if (i - count >= 0) {
              k = i - count;
            } else {
              k = k + 1;
              if (k > totalLn) {
                k = 0;
              }
            }
            // console.log(k);
            gsap.to(item[k], {
              opacity: 0,
              scale: 0.8,
              ease: "Power3.easeOut"
            });
            item[k].classList.remove("active");
          }
        }

        function getRandWidth(radians, radius) {
          return (Math.tan(radians) * radius).toFixed();
        }

        gsap.set(list, {
          opacity: 1
        });
        imgWrapper.addEventListener("click", (e) => {
          var pos = { x: e.clientX, y: e.clientY };
          callImg(i, pos);
          i++;
          if (i >= totalLn) {
            i = 0;
          }
        });
      }
    });
  }
