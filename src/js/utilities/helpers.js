//hope page service section
document.addEventListener('DOMContentLoaded', () => {
  const dropdownLinks = document.querySelectorAll('.toggleBtn-dropdown-menu a');

  function activateCountry(link) {
   
    dropdownLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');


    const imgSelector = link.getAttribute('data-imagechangeclick');
    const newImgSrc = link.getAttribute('data-img');
    if (imgSelector && newImgSrc) {
      const img = document.querySelector(imgSelector);
      if (img) img.src = newImgSrc;
    }

   
    const showSelector = link.getAttribute('datashowonclick');
    const allContents = document.querySelectorAll('.service-left');
    allContents.forEach(content => content.classList.remove('show'));

    if (showSelector) {
      const target = document.querySelector(showSelector);
      if (target) target.classList.add('show');
    }


    // const cta = document.querySelector('.text-cta-link');
    // const countryName = link.textContent.trim();
    // if (cta) cta.innerHTML = `Connect with a ${countryName} Expert <span class="arrow-anim"></span>`;
  }


  dropdownLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      activateCountry(link);
    });
  });

 
  const firstLink = dropdownLinks[0];
  if (firstLink) {
    activateCountry(firstLink);
  }
});




document.addEventListener('DOMContentLoaded', function () {
  /** Pricing Tabs */
  const tabs = document.querySelectorAll('.pricing__tab--country li a');
  const tabContents = document.querySelectorAll('.pricing__country');

  if (tabs.length > 0 && tabContents.length > 0) {
    tabs.forEach((tab) => {
      tab.addEventListener('click', function (e) {
        e.preventDefault();
        tabs.forEach(t => t.parentElement.classList.remove('tab--active'));
        tabContents.forEach(content => content.classList.remove('pricing--active'));

        tab.parentElement.classList.add('tab--active');

        const tabSelector = this.getAttribute('data-tab');
        if (tabSelector) {
          const activeTabContent = document.querySelector(tabSelector);
          if (activeTabContent) {
            activeTabContent.classList.add('pricing--active');

            const glideElement = activeTabContent.querySelector('.glide');
            if (glideElement) {
              const glideId = glideElement.getAttribute('id');
              if (glideId) {
                initGlide(`#${glideId}`);
              }
            }
          }
        }
      });
    });
  }
     // change image on hover card-btn
     document.querySelectorAll('[data-imageChangeHover]').forEach(el => {
      const targetSelector = el.dataset.imagechangehover;
      const newImg = el.dataset.img;
      el.addEventListener('mouseenter', () => {
        document.querySelectorAll('.card-btn').forEach(btn => btn.classList.remove('active'));
        el.classList.add('active');
        const targetImg = document.querySelector(targetSelector);
        if (targetImg && newImg) {
          fadeImageChange(targetImg, newImg);
        }
      });
    });
    
    function fadeImageChange(imgEl, newSrc) {
      imgEl.classList.add('fade-out');
      setTimeout(() => {
        imgEl.src = newSrc;
        imgEl.onload = () => imgEl.classList.remove('fade-out');
      }, 150);
    }
  /** Insights Resources Toggle */
  const toggleButton = document.querySelector(".insights-resources__toggle");
  const menu = document.querySelector(".insights-resources__menu");

  if (toggleButton && menu) {
    const options = menu.querySelectorAll("li");

    toggleButton.addEventListener("click", function () {
      menu.classList.toggle("show");
    });

    options.forEach(option => {
      option.addEventListener("click", function () {
        const selectedText = this.textContent;
        const selectedValue = this.getAttribute("data-value");
        if (selectedText) {
          toggleButton.textContent = selectedText;
        }
        menu.classList.remove("show");
        console.log(`Selected value: ${selectedValue}`);
      });
    });

    document.addEventListener("click", function (event) {
      if (!toggleButton.contains(event.target) && !menu.contains(event.target)) {
        menu.classList.remove("show");
      }
    });
  }

  /** Accordion Regular */
  document.querySelectorAll('.accordion-reg').forEach(accordion => {
    const autoClose = accordion.getAttribute('data-autoClose') !== 'false';

    accordion.querySelectorAll('.accordion-reg-button').forEach(button => {
      button.addEventListener('click', function () {
        const targetPanel = document.querySelector(this.dataset.bsTarget);
        const isOpen = targetPanel.classList.contains("show");
        const accordionItem = this.closest('.accordion-reg-item');

        if (autoClose) {
          accordion.querySelectorAll('.accordion-reg-collapse').forEach(panel => {
            if (panel !== targetPanel) {
              panel.classList.remove("show");

              const btn = accordion.querySelector(`[data-bs-target="#${panel.id}"]`);
              if (btn) btn.setAttribute("aria-expanded", "false");

              const icon = btn?.querySelector(".arrow");
              if (icon) icon.classList.remove("rotate");
            }
          });
        }

        targetPanel.classList.toggle("show");
        this.setAttribute("aria-expanded", String(!isOpen));

        const arrowIcon = this.querySelector(".arrow");
        if (arrowIcon) {
          arrowIcon.classList.toggle("rotate", !isOpen);
        }

        if (!isOpen) {
          const yOffset = -100;
          const y = accordionItem.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      });
    });
  });

  /** Home Top Banner Splide Slider */
  // document.querySelectorAll('.splide').forEach(el => {
  //   const options = {
  //     perPage: parseInt(el.dataset.perPage) || 1,
  //     type: el.dataset.type || 'loop',
  //     autoplay: el.dataset.autoplay === 'true',
  //     pagination: el.dataset.pagination !== 'false',
  //     rewind: el.dataset.rewind === 'true',
  //     arrows: el.dataset.arrows !== 'false',
  //   };
  //   if (el.dataset.breakpoints) {
  //     try {
  //       options.breakpoints = JSON.parse(el.dataset.breakpoints);
  //     } catch (e) {
  //       console.warn('Invalid breakpoints JSON for', el, e);
  //     }
  //   }
  //   new Splide(el, options).mount();
  // });
  
  // document.querySelectorAll('.splide').forEach(el => {
  //   const type = el.dataset.type || 'loop';
  
  //   const options = {
  //     perPage: parseInt(el.dataset.perPage) || 1,
  //     type: type,
  //     autoplay: el.dataset.autoplay === 'true',
  //     pagination: el.dataset.pagination !== 'false',
  //     arrows: el.dataset.arrows !== 'false',
  //     pauseOnHover: false,
  //     interval: parseInt(el.dataset.interval) || 5000, // Default to 3000ms (3 seconds)
  //   };
  
  //   // Only include rewind if not using loop
  //   if (type !== 'loop') {
  //     options.rewind = el.dataset.rewind === 'true';
  //   }
  
  //   if (el.dataset.breakpoints) {
  //     try {
  //       options.breakpoints = JSON.parse(el.dataset.breakpoints);
  //     } catch (e) {
  //       console.warn('Invalid breakpoints JSON for', el, e);
  //     }
  //   }
  
  //   const splide = new Splide(el, options);
  //   splide.mount();
  
  //   // Pause/play autoplay on specific inner elements only
  //   el.querySelectorAll('.slider-content, .trending-insights').forEach(innerEl => {
  //     innerEl.addEventListener('mouseenter', () => {
  //       if (splide.Components.Autoplay) {
  //         splide.Components.Autoplay.pause();
  //       }
  //     });
  //     innerEl.addEventListener('mouseleave', () => {
  //       if (splide.Components.Autoplay) {
  //         splide.Components.Autoplay.play();
  //       }
  //     });
  //   });
  // });
  
  document.querySelectorAll('.splide').forEach(el => {
  const type = el.dataset.type || 'loop';

  const options = {
    perPage: parseInt(el.dataset.perPage) || 1,
    type: type,
    autoplay: el.dataset.autoplay === 'true',
    pagination: el.dataset.pagination !== 'false',
    arrows: el.dataset.arrows !== 'false',
    pauseOnHover: false,
    interval: parseInt(el.dataset.interval) || 5000,
  };

  if (type !== 'loop') {
    options.rewind = el.dataset.rewind === 'true';
  }

  if (el.dataset.breakpoints) {
    try {
      options.breakpoints = JSON.parse(el.dataset.breakpoints);
    } catch (e) {
      console.warn('Invalid breakpoints JSON for', el, e);
    }
  }

  const splide = new Splide(el, options);
  splide.mount();

  // Autoplay pause on hover inside slider-content and trending-insights
  el.querySelectorAll('.slider-content, .trending-insights').forEach(innerEl => {
    innerEl.addEventListener('mouseenter', () => {
      if (splide.Components.Autoplay) {
        splide.Components.Autoplay.pause();
      }
    });
    innerEl.addEventListener('mouseleave', () => {
      if (splide.Components.Autoplay) {
        splide.Components.Autoplay.play();
      }
    });
  });

  // Custom Progress bar and counter
  const wrapper = el.parentElement.querySelector('.splide-progress-wrapper');
  const currentIndex = wrapper?.querySelector('.current-index');
  const totalCount = wrapper?.querySelector('.total-count');
  const progressFill = wrapper?.querySelector('.progress-fill');

  if (wrapper && currentIndex && totalCount && progressFill) {
    const updateProgress = () => {
      const index = splide.index + 1;
      const total = splide.length;

      currentIndex.textContent = index.toString().padStart(2, '0');
      totalCount.textContent = total.toString().padStart(2, '0');

      const percent = ((index - 0) / (total - 0)) * 100;
      progressFill.style.width = `${percent}%`;
    };

    splide.on('mounted move', updateProgress);
    updateProgress(); 
  }
});

  /** Logo Slides (Our Brands Page) */
  let slideIndex = 0;
  function carousel() {
    const slides = document.querySelectorAll(".LogoSlides");

    if (slides.length === 0) return; 

    slides.forEach(slide => {
      slide.style.display = "none";
    });

    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }

    slides[slideIndex - 1].style.display = "block";

    setTimeout(carousel, 9000);
  }
  carousel();

  /** Toggle Dropdown in Home Service Section */
  const dropdowns = document.querySelectorAll('.toggleBtn-dropdown');

  dropdowns.forEach(dropdown => {
    const button = dropdown.querySelector('.toggleBtn-dropdown-button');
    const menu = dropdown.querySelector('.toggleBtn-dropdown-menu');

    button.addEventListener('click', (e) => {
      e.stopPropagation();

      dropdowns.forEach(d => {
        if (d !== dropdown) d.classList.remove('open', 'drop-up');
      });

      dropdown.classList.toggle('open');

      if (dropdown.classList.contains('open')) {
        const rect = menu.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        const requiredHeight = menu.scrollHeight;

        if (spaceBelow < requiredHeight && spaceAbove > spaceBelow) {
          dropdown.classList.add('drop-up');
        } else {
          dropdown.classList.remove('drop-up');
        }
      }
    });
  });

  window.addEventListener('click', () => {
    dropdowns.forEach(d => d.classList.remove('open', 'drop-up'));
  });

  /** Toggle Expand Section for Trending Insights */
  document.querySelectorAll('.expand-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const expander = btn.closest('.expand-sect');
      const content = expander.querySelector('.expand-content');
      const icon = btn.querySelector('.icon');

      content.classList.toggle('open');
      icon.textContent = content.classList.contains('open') ? '−' : '+';
    });
  });

  /** Toggle Read More Text on Asia Manufacturing Index */
  document.querySelectorAll('.toggle-btnls').forEach(button => {
    button.addEventListener('click', function () {
      const content = this.parentElement;
      const dots = content.querySelector('.dots');
      const moreTexts = content.querySelectorAll('.more-text');

      moreTexts.forEach(moreText => {
        if (moreText.style.display === "none" || moreText.style.display === "") {
          moreText.style.display = "block";
          dots.style.display = "none";
          button.textContent = "-less";
        } else {
          moreText.style.display = "none";
          dots.style.display = "none";
          button.textContent = "Read full summary";
        }
      });
    });
  });

  /** Counter Animation in Home Who We Are Section */
  const counters = document.querySelectorAll('.counter');
  let countersStarted = false;
  
  function startCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const hasPlus = counter.getAttribute('data-plus') === "true";
      const duration = +counter.getAttribute('data-speed') || 2000; // Duration in ms
  
      const startTime = performance.now();
  
      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1); // Clamp to 1
        const value = Math.floor(progress * target);
  
        counter.innerText = hasPlus ? `${value}+` : `${value}`;
  
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = hasPlus ? `${target}+` : `${target}`;
        }
      }
  
      requestAnimationFrame(updateCounter);
    });
  }
  
  const observerOptions = {
    threshold: 0.4
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted) {
        startCounters();
        countersStarted = true;
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  const counterSection = document.querySelector('.counter-section');
  if (counterSection) {
    observer.observe(counterSection);
  }
  
  

  /** Home Video Who We Are Section
  const container = document.querySelector(".video-container");
  if (container) {
    const video = container.querySelector("video");
    const overlay = container.querySelector(".video-overlay");

    container.addEventListener("click", () => {
      if (container.dataset.state === "initial") {
        video.setAttribute("controls", true);
        video.play();
        container.dataset.state = "playing";
        startAutoHideControls();
      }
    });

    video.addEventListener("pause", () => {
      if (container.dataset.state === "playing" && container.hasAttribute("data-no-pause") && !video.ended) {
        video.play();
      }
    });

    function startAutoHideControls() {
      if (!container.hasAttribute("data-autohide")) return;

      let timeout;
      const hideControls = () => {
        video.classList.add("hide-controls");
      };
      const showControls = () => {
        video.classList.remove("hide-controls");
        clearTimeout(timeout);
        timeout = setTimeout(hideControls, 3000);
      };

      video.addEventListener("mousemove", showControls);
      video.addEventListener("touchstart", showControls);
      timeout = setTimeout(hideControls, 3000);
    }
  }*/


  document.querySelectorAll(".video-container").forEach(container => {
    const video = container.querySelector("video");
    const overlay = container.querySelector(".video-overlay");

    container.addEventListener("click", () => {
  if (container.dataset.state === "initial") {
    video.setAttribute("controls", true);
    video.play();
    container.dataset.state = "playing";
    startAutoHideControls(video, container); // this is fine to keep
  }
});

    // Prevent pausing if needed
    video.addEventListener("pause", () => {
      if (
        container.dataset.state === "playing" &&
        container.hasAttribute("data-no-pause") &&
        !video.ended
      ) {
        video.play();
      }
    });
  });

  function enterFullscreen(el) {
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if (el.msRequestFullscreen) el.msRequestFullscreen();
  }

  function startAutoHideControls(video, container) {
    if (!container.hasAttribute("data-autohide")) return;

    let timeout;
    const hideControls = () => video.classList.add("hide-controls");
    const showControls = () => {
      video.classList.remove("hide-controls");
      clearTimeout(timeout);
      timeout = setTimeout(hideControls, 3000);
    };

    video.addEventListener("mousemove", showControls);
    video.addEventListener("touchstart", showControls);
    timeout = setTimeout(hideControls, 3000);
  }
});

/** Article Read More Toggle (outside DOMContentLoaded) */
document.querySelectorAll("a[data-togglearticle]").forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const contentDiv = document.getElementById(this.getAttribute("data-togglearticle"));
    if (contentDiv) {
      contentDiv.classList.toggle("d-none");
      this.innerText = this.innerText === 'more+' ? 'less-' : 'more+';
    }
  });
});

/** Show Regional Office (outside DOMContentLoaded) */
function showRegionalOffice() {
  const selectedValue = document.getElementById("RegionaltS").value;
  document.querySelectorAll(".regional-office > div").forEach(div => {
    div.classList.add("regional-hidden");
  });
  if (selectedValue !== "Select the office") {
    const selectedOffice = document.querySelector(`.regional-office-${selectedValue.toLowerCase()}`);
    if (selectedOffice) {
      selectedOffice.classList.remove("regional-hidden");
    }
  }
}

      // Open popup on click
      document.querySelectorAll('[data-popup]').forEach(trigger => {
        trigger.addEventListener('click', e => {
          e.preventDefault();
          const id = trigger.getAttribute('data-popup');
          document.getElementById(id)?.classList.add('active');
        });
      });
  
      // Close popup
      document.querySelectorAll('.popup-overlay').forEach(popup => {
        popup.addEventListener('click', e => {
          if (e.target === popup || e.target.classList.contains('popup-close')) {
            popup.classList.remove('active');
          }
        });
      });
  
      // Open dynamically
      function openPopupById(id) {
        document.getElementById(id)?.classList.add('active');
      }
      // Open the popup after 3 seconds
          setTimeout(() => {
          openPopupById('dynamic-popup');
          }, 3000);
  
  
      // Scroll-based popup trigger
      let scrollTriggered = false;
      window.addEventListener('scroll', () => {
        if (!scrollTriggered && window.scrollY > 500) {
          openPopupById('scroll-popup');
          scrollTriggered = true;
        }
      });
  // on click expand div
  document.addEventListener('DOMContentLoaded', function () {
    const exploreLink = document.querySelector('.text-cta-expnd');
    const exploreContent = document.querySelector('.explore-content');
    const closeBtn = document.querySelector('.explore-close');
  
    // Only attempt to find .arrow-anim *inside* exploreLink if it exists
    const arrowRotate = exploreLink?.querySelector('.arrow-anim');
  
    if (exploreLink && exploreContent && closeBtn && arrowRotate) {
      exploreLink.addEventListener('click', function (e) {
        e.preventDefault();
        exploreContent.classList.add('show');
        arrowRotate.classList.add('arrow-rotate');
      });
  
      closeBtn.addEventListener('click', function () {
        exploreContent.classList.remove('show');
        arrowRotate.classList.remove('arrow-rotate');
      });
    } else {
      console.warn('One or more required elements were not found in the DOM.');
      console.log({ exploreLink, exploreContent, closeBtn, arrowRotate });
    }
//get-in-touch
const buttons = document.querySelectorAll("[data-show-on-click]");

  buttons.forEach((button) => {
    const targetClass = button.getAttribute("data-show-on-click");

    button.addEventListener("click", function () {
      const target = document.querySelector(`.${targetClass}`);
      if (!target) return;

      const isVisible = target.style.display === "block";

      if (isVisible) {
        target.style.display = "none";
      } else {
        target.style.display = "block";

        // Scroll to element with 85 offset from top
        const elementTop = target.getBoundingClientRect().top + window.pageYOffset;
        const scrollTo = elementTop - 85;

        window.scrollTo({
          top: scrollTo,
          behavior: "smooth"
        });
      }
    });
  });
    //video popup controll
const modal = document.getElementById("center-popup");
const popupCloseBtn = modal ? modal.querySelector(".popup-close") : null;
const video = document.getElementById("eventVideo");


document.querySelectorAll('.event-video-item').forEach(trigger => {
  trigger.addEventListener('click', e => {
    e.preventDefault();
    video.src = trigger.getAttribute("src");
    video.poster = trigger.getAttribute("data-cover");
    modal.classList.add('active');
  });
});


// modal.addEventListener("click", function(e) {
//   if (e.target === modal || e.target.classList.contains("popup-close")) {
//     modal.classList.remove("active");
//     video.pause();
//     video.currentTime = 0; 
//   }
// });


if (modal) {
  modal.addEventListener("click", function (e) {
    if (e.target === modal || e.target.classList.contains("popup-close")) {
      modal.classList.remove("active");
      video.pause();
      video.currentTime = 0;
    }
  });
}
//location page

  // const imageCards = document.querySelectorAll("[data-show-on-click]");
  // imageCards.forEach(card => {
  //   card.addEventListener("click", () => {
  //     const targetId = card.getAttribute("data-show-on-click");
  //     const target = document.getElementById(targetId);
  //     document.querySelectorAll(".location-card-mian").forEach(loc => {
  //       loc.classList.remove("show");
  //     });
  //     if (target) {
  //       target.classList.add("show");
  //     }
  //   });
  // });

  //  const imageCards = document.querySelectorAll("[data-show-on-click]");
  // imageCards.forEach(card => {
  //   card.addEventListener("click", () => {
  //     const targetId = card.getAttribute("data-show-on-click");
  //     const target = document.getElementById(targetId);
  //     document.querySelectorAll(".location-card-mian").forEach(loc => {
  //       loc.classList.remove("show");
  //     });
  //     imageCards.forEach(c => c.classList.remove("selected"));
  //     if (target) {
  //       target.classList.add("show");
  //       card.classList.add("selected");
  //     }
  //   });
  // });
  });

  //Radio button select on location and personnel
    document.querySelectorAll('.custom-radio input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
      document.querySelectorAll('.custom-radio').forEach(label => {
        label.classList.remove('selected');
      });
      if (radio.checked) {
        radio.closest('.custom-radio').classList.add('selected');
      }
    });
  });
  document.querySelectorAll('.custom-radio input[type="radio"]:checked').forEach(radio => {
    radio.closest('.custom-radio').classList.add('selected');
  });

  
//home page main slide progess bar with count slide number
//   document.addEventListener('DOMContentLoaded', function () {
//   const splide = new Splide('#main-slider', {
//     type: 'slide', // or 'loop'
//     perPage: 1,
//     pagination: false,
//     arrows: true,
//     autoplay:true,
//     rewind:true,
//   });

//   const currentIndex = document.querySelector('.current-index');
//   const totalCount = document.querySelector('.total-count');
//   const progressFill = document.querySelector('.progress-fill');

//   splide.on('mounted move', function () {
//     const index = splide.index + 1;
//     const total = splide.length;

//     currentIndex.textContent = index.toString().padStart(2, '0');
//     totalCount.textContent = total.toString().padStart(2, '0');
//     const progress = ((index - 1) / (total - 1)) * 100;
//     progressFill.style.width = `${progress}%`;
//   });

//   splide.mount();
// });