///Accordion regular
document.addEventListener("DOMContentLoaded", function () {
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
  });

//home top banner slider customization
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.splide').forEach((el) => {
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
});
//end

//toggle read more text on asia-manufacturing-index
document.addEventListener("DOMContentLoaded", function() {
  var buttons = document.querySelectorAll('.toggle-btnls');
  buttons.forEach(function(button) {
  button.addEventListener('click', function() {
  var content = this.parentElement;
  var dots = content.querySelector('.dots');
  var moreTexts = content.querySelectorAll('.more-text');
  moreTexts.forEach(function(moreText) {
  if (moreText.style.display === "none" || moreText.style.display === "") {
  moreText.style.display = "block";
  dots.style.display = "none"; // Hide the dots
  button.textContent = "-less";
  } else {
  moreText.style.display = "none";
  dots.style.display = "none"; // Show the dots
  button.textContent = "Read full summary";
  }
  });
  });
  });
  });
//end
// Article Read More Toggle
var articleToggle=document.querySelectorAll("a[data-togglearticle]"), i;
for(i=0;i<articleToggle.length;++i){
  var a=articleToggle[i];

  a.addEventListener('click',function(e){
    e.preventDefault();
    var contentDiv=this.getAttribute("data-togglearticle");
    contentDiv=document.getElementById(contentDiv);

    contentDiv.classList.toggle("d-none");
    
    this.innerText=='more+'?this.innerText='less-':this.innerText='more+';

  })
}
//end
//CB logos slide on our brands page
document.addEventListener("DOMContentLoaded", function () {
  let slideIndex = 0;
  carousel();

  function carousel() {
    const slides = document.querySelectorAll(".LogoSlides");

    if (slides.length === 0) return; // Prevent error if no slides exist

    slides.forEach((slide) => {
      slide.style.display = "none";
    });

    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }

    slides[slideIndex - 1].style.display = "block";

    setTimeout(carousel, 9000);
  }
});
//end

// Toggle dropdown on home for service section
document.addEventListener('DOMContentLoaded', () => {
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
});

//end



//counter on home page for who we are section
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

// Scroll trigger
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
observer.observe(counterSection);

//end

// toggle Expand on home page for top slide section of Trending Insight
document.querySelectorAll('.expand-toggle').forEach((btn) => {
  btn.addEventListener('click', () => {
    const expander = btn.closest('.expand-sect');
    const content = expander.querySelector('.expand-content');
    const icon = btn.querySelector('.icon');

    content.classList.toggle('open');
    icon.textContent = content.classList.contains('open') ? '−' : '+';
  });
});
//end
// video on home for Who We Are section
const container = document.querySelector(".video-container");
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

// Fullscreen on play
function enterFullscreen(el) {
  if (el.requestFullscreen) el.requestFullscreen();
  else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  else if (el.msRequestFullscreen) el.msRequestFullscreen();
}

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
//end

//

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




