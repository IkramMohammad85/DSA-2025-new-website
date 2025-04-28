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
  document.querySelectorAll('.splide').forEach(el => {
    const options = {
      perPage: parseInt(el.dataset.perPage) || 1,
      type: el.dataset.type || 'loop',
      autoplay: el.dataset.autoplay === 'true',
      pagination: el.dataset.pagination !== 'false',
      rewind: el.dataset.rewind === 'true',
      arrows: el.dataset.arrows !== 'false',
    };
    if (el.dataset.breakpoints) {
      try {
        options.breakpoints = JSON.parse(el.dataset.breakpoints);
      } catch (e) {
        console.warn('Invalid breakpoints JSON for', el, e);
      }
    }
    new Splide(el, options).mount();
  });

  /** Logo Slides (Our Brands Page) */
  let slideIndex = 0;
  function carousel() {
    const slides = document.querySelectorAll(".LogoSlides");

    if (slides.length === 0) return; // Prevent error if no slides exist

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
      counter.innerText = '0';
      const target = +counter.getAttribute('data-target');
      const hasPlus = counter.getAttribute('data-plus') === "true";

      const updateCounter = () => {
        const current = +counter.innerText.replace('+', '');
        const increment = target / 200;

        if (current < target) {
          counter.innerText = `${Math.ceil(current + increment)}`;
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = hasPlus ? `${target}+` : `${target}`;
        }
      };
      updateCounter();
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

  /** Home Video Who We Are Section */
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
