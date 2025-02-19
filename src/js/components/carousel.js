// Polyfill: forEach
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }
  
  
  
  // GlideJS Setup
  if (typeof Glide != "undefined" && document.querySelector('.glide') !== null) {
    var glideElements = document.querySelectorAll('.glide');
    [].forEach.call(glideElements, function (glideItem) {
      var glideClass = '.' + glideItem.className.toString().split(' ').join('.');
      var perView = 4;
      var perViewTablet = perView-1;
  
      var autoplay = 5000;
      if (glideItem.getAttribute('data-preView')) perView = glideItem.getAttribute('data-preView');
  
      if (glideItem.getAttribute('data-preViewTablet')) {
            perViewTablet = glideItem.getAttribute('data-preViewTablet');
      } else {
            perViewTablet = perView-1;
      }
  
      if (glideItem.getAttribute('data-autoplay')) autoplay = glideItem.getAttribute('data-autoplay');
  
      if (autoplay == 0) autoplay = false;
  
      var breakpoints = {
        992: {
          perView: 1
        },
        1400: {
          perView: perViewTablet
        }
      };
  
      new Glide(glideClass, {
        type: 'carousel',
        autoplay: autoplay,
        animationDuration: 1000,
        gap: 0,
        startAt: 0,
        perView: perView,
        peek: 0,
        animationTimingFunc: 'ease',
        breakpoints: breakpoints
      }).mount();
    });
  }
  
  
  // Navbar: Sign-up Slider
  if (typeof Glide != "undefined" && document.querySelector('.navbar__signupbox__slider') !== null) {
    const signupSlider = new Glide(".navbar__signupbox__slider", {
      type: "carousel",
      startAt: 0,
      perView: 1,
      gap: 0,
      autoplay: 10000,
      animationDuration: 1000,
      animationTimingFunc: "ease",
      peek: 0,
      dragThreshold: false,
    }).mount();
  }
  
  
  
  // Homepage: News slider
  if (typeof Glide != "undefined" && document.querySelector('#hp-news-slider') !== null) {
    const newsSlider = new Glide("#hp-news-slider", {
      type: "carousel",
      startAt: 0,
      perView: 1,
      gap: 0,
      autoplay: 10000,
      animationDuration: 200,
      animationTimingFunc: "ease",
      peek: 0,
      dragThreshold: false,
      autoplay: false,
      keyboard: false
    }).mount();
  }
  
  // Homepage: Carousel
  if (typeof Glide != "undefined" && document.querySelector('#carousel') !== null) {
    const carousel = new Glide("#carousel", {
      type: "carousel",
      startAt: 0,
      perView: 1,
      gap: 0,
      autoplay: 10000,
      animationDuration: 200,
      animationTimingFunc: "ease",
      peek: 0,
      dragThreshold: false,
    })
  
    carousel.on(['mount.after', 'run'], function () { 
      var firstSpan = document.querySelector('.carousel__count span:first-child');
      firstSpan.innerHTML = carousel.index + 1;
    })
  
    carousel.mount();
  }
  
  // Homepage: Guides Slider
  if (typeof Glide != "undefined" && document.querySelector('.hp-guide__slider') !== null) {
    const guideSlider = new Glide(".hp-guide__slider", {
      type: "carousel",
      startAt: 0,
      perView: 1,
      gap: 0,
      autoplay: 10000,
      animationDuration: 200,
      animationTimingFunc: "ease",
      peek: 0,
      dragThreshold: false,
    }).mount();
  }
  
  // Homepage: Events Slider
  const eventBreakpoints = {
    576: {perView: 1},
    768: {perView: 2},
    1040: {perView: 3},
  }
  if (typeof Glide != "undefined" && document.querySelector('.hp-event__slider') !== null) {
    const eventSlider = new Glide(".hp-event__slider", {
      type: "carousel",
      startAt: 0,
      perView: 4,
      gap: 30,
      animationDuration: 1000,
      animationTimingFunc: "ease",
      peek: 0,
      dragThreshold: false,
      breakpoints: eventBreakpoints,
    }).mount();
  }
  
  
  // investor-resources: Guides Slider
  const PublicationResourcesBreakpoints = {
    576: {perView: 1},
    768: {perView: 2},
    1040: {perView: 3},
  }
  if (typeof Glide != "undefined" && document.querySelector('.publication-resources') !== null) {
    const guideSlider = new Glide(".publication-resources", {
      type: "carousel",
      startAt: 0,
      perView: 5,
      gap: -60,
      autoplay: 10000,
      animationDuration: 200,
      animationTimingFunc: "ease",
      peek: 0,
      dragThreshold: false,
      breakpoints: PublicationResourcesBreakpoints,
    }).mount();
  }
  // investor-resources: Guides Slider
  const relatedInsightRresourcesBreakpoints = {
    576: {perView: 1},
    768: {perView: 2},
    1040: {perView: 3},
  }
  if (typeof Glide != "undefined" && document.querySelector('.related-insight-resources') !== null) {
    const guideSlider = new Glide(".related-insight-resources", {
      type: "carousel",
      startAt: 0,
      perView: 4,
      gap: 0,
      autoplay: 10000,
      animationDuration: 200,
      animationTimingFunc: "ease",
      peek: 0,
      dragThreshold: false,
      breakpoints: relatedInsightRresourcesBreakpoints,
     
    }).mount();
  }
  
  // Helper: Toggle visibility
  function toggle_visibility(element) {
    var e = document.querySelector(element);
    if (e) {
      if(e.style.display == 'block') {
        e.style.display = 'none';
      } else {
        e.style.display = 'block';
      }
    }
  }
  
  // Helper: Toggle modal
  function toggle_modal(element) {
    var e = document.querySelector(element);
    if (e) {
      e.classList.toggle("show-modal");
    }
  }
  
  // Helper: Toggle a class
  function toggle_class(element, myclass) {
    var e = document.querySelector(element);
    if (e) {
      e.addEventListener('click', function() {
        this.classList.toggle(myclass)
      })
    }
  }
  
  function toggle_class_trigger(element, myclass) {
    var e = document.querySelector(element);
    if (e) {
      e.classList.toggle(myclass)
    }
  }
  
  // Component: Toggle hamburger menu animation
  toggle_class(".navbar__hamburger", "menu-show");
  
  // Component: Toggle accordions
  if (document.querySelector('.c-accordion') !== null) {
    const accordionItems = document.querySelectorAll(".c-accordion__title");
  
    function aToggle(e) {
      let target = e.target.className || null;
      let link = this.getAttribute('href');
  
      if (target == 'c-accordion__icon' || link == '#') {
        e.preventDefault();
        const accordionState = this.getAttribute('aria-expanded');
  
        for (i = 0; i < accordionItems.length; i++) {
          accordionItems[i].setAttribute('aria-expanded', 'false');
        }
  
        if (accordionState == 'false') {
          this.setAttribute('aria-expanded', 'true');
        }
      }
    }
  
    accordionItems.forEach(item => item.addEventListener('click', aToggle));
  };
  
  // Component: Toggle mobile menu accordion
  if (document.querySelector('.navbar__menuwrap') !== null) {
    const mobileNavItems = document.querySelectorAll(".navbar__togglemenu");
  
    function toggleAccordion() {
      const toggleItem = this.getAttribute('aria-expanded');
      
      for (i = 0; i < mobileNavItems.length; i++) {
        mobileNavItems[i].setAttribute('aria-expanded', 'false');
      }
      
      if (toggleItem == 'false') {
        this.setAttribute('aria-expanded', 'true');
      }
    }
  
    if (mobileNavItems.length > 0) {
      mobileNavItems.forEach(item => item.addEventListener('click', toggleAccordion));
    }
  }
  
  // Accounting Page: Slide to anchor link
  (function () {
    scrollTo();
  })();
  
  function scrollTo() {
    const links = document.querySelectorAll('.scrollto');
    links.forEach(each => (each.onclick = scrollAnchors));
  
      // If this anchor points to the contact block, expand the contact block
  
    
  }

  
  
  
  
  
  function scrollAnchors(e, respond = null) {
    var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
  
    if (!isIE11)
      e.preventDefault();
  
    // If this anchor points to the contact block, expand the contact block
    if (this.classList.contains('cta-link')) {
      document.querySelector('.cta-contact__bot').style.display = "block";
    }
  
    // Get the distance between el and top, scroll to el
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
    var targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href');
    const targetAnchor = document.querySelector(targetID);
    if (!targetAnchor) return;
    const originalTop = distanceToTop(targetAnchor) - navbarHeight;
    window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });
    const checkIfDone = setInterval(function () {
      const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
      if (distanceToTop(targetAnchor) === 0 || atBottom) {
        targetAnchor.tabIndex = '-1';
        targetAnchor.focus();
        window.history.pushState('', '', targetID);
        clearInterval(checkIfDone);
      }
    }, 100);
  }
  
 
  
  // Accounting Tabs: Country Tabs
  if (document.querySelector('.pricing') !== null) {
    let showCountry;
    const pricingCountryTabs = document.querySelectorAll(".pricing__tab--country a");
    const countryItems = document.querySelectorAll(".pricing__country");
  
    if (pricingCountryTabs.length > 0) {
      pricingCountryTabs.forEach(tab => tab.addEventListener('click', function () {
        if (this.parentElement.classList.contains("tab--active")) {
          return
        } else {
          pricingCountryTabs.forEach(tab => tab.parentElement.classList.remove("tab--active"));
          this.parentElement.classList.add("tab--active");
          showCountry = document.querySelector(this.dataset.tab);
          countryItems.forEach(country => country.classList.remove("pricing--active"));
          showCountry.classList.add("pricing--active");
        }
      }));
    }
  }
  
  // Accounting Tabs: Pricing Content Tabs
  function countryTab(country) {
    let showItem;
    const tabs = country.querySelectorAll('.pricing__tab--inner a');
    const items = country.querySelectorAll('.pricing__content');
  
    tabs.forEach(tab => tab.addEventListener('click', function () {
      if(this.classList.contains('tab--active')) {
        return
      } else {
        tabs.forEach(tab => tab.classList.remove("tab--active"));
        this.classList.add("tab--active");
        showItem = document.querySelector(this.dataset.tab);
        items.forEach(item => item.classList.remove("content--active"));
        showItem.classList.add("content--active");      
      }
    }));
  }
  
  if (document.querySelector('.pricing__country') !== null) {
    const countries = document.querySelectorAll('.pricing__country');
    countries.forEach(function(country) {
      countryTab(country);
    });
  }
  
  // Services Page: Sidebar Mini-Slider
  if (typeof Glide != "undefined" && document.querySelector('.c-slider--mini') !== null) {
    const sidebarSlider = new Glide(".c-slider--mini", {
      type: "carousel",
      startAt: 0,
      perView: 1,
      gap: 0,
      autoplay: 10000,
      animationDuration: 200,
      animationTimingFunc: "ease",
      peek: 0,
    }).mount();
  }
  // Our featured technology partners and certifications
  if (typeof Glide != "undefined" && document.querySelector('.partners-slide') !== null) {
    const sidebarSlider = new Glide(".partners-slide", {
      animationDuration: 200,
    }).mount();
  }
  // meet our people on career page
  if (typeof Glide != "undefined" && document.querySelector('.our-people') !== null) {
    const sidebarSlider = new Glide(".our-people", {
      animationDuration: 200,
    }).mount();
  }
  //market-entry landing page
  if (typeof Glide != "undefined" && document.querySelector('.cp-featured__slider_1') !== null) {
    const sidebarSlider = new Glide(".cp-featured__slider_1", {
      animationDuration: 200,
      gap: 0,
    }).mount();
  }
  
  //partners-across
  if (typeof Glide != "undefined" && document.querySelector('.partners-across') !== null) {
    const sidebarSlider = new Glide(".partners-across", {
      perView: 5,
      type: "carousel",
      autoplay: false,
      gap:40,
      startAt: 0,
      focusAt: 'center',
      animationDuration: false,
      animationDuration: false,
      animationTimingFunc: "",
      breakpoints: {
        1024: {
          perView: 3
        },
        768: {
          perView: 2
        },
        820: {
          perView: 2
        },
        667: {
          perView: 1
        }
      }
    }).mount();
  }
  //Insights and Case Studies
  if (typeof Glide != "undefined" && document.querySelector('.insights-studies') !== null) {
    const sidebarSlider = new Glide(".insights-studies", {
      perView: 3,
      type: "carousel",
      autoplay: false,
      gap:0,
      startAt: 0,
      animationDuration: false,
      animationTimingFunc: "",
      breakpoints: {
        1024: {
          perView: 2
        },
        820: {
          perView: 1
        },
        768: {
          perView: 1
        },
        667: {
          perView: 1
        }
      }
    }).mount();
  }
  
  //Trusted by Global Businesses
  if (typeof Glide != "undefined" && document.querySelector('.global-businesses') !== null) {
    const sidebarSlider = new Glide(".global-businesses", {
      perView: 3,
      type: "carousel",
      gap:0,
      startAt: 0,
      breakpoints: {
        1024: {
          perView: 2
        },
        820: {
          perView: 1
        },
        768: {
          perView: 1
        },
        600: {
          perView: 1
        }
      }
    }).mount();
  }
  
  //Trusted by Global Businesses
  if (typeof Glide != "undefined" && document.querySelector('.success-Highlights-testimonials') !== null) {
    const sidebarSlider = new Glide(".success-Highlights-testimonials", {
      perView: 3,
      type: "carousel",
      gap:0,
      startAt: 0,
      breakpoints: {
        1024: {
          perView: 2
        },
        820: {
          perView: 1
        },
        768: {
          perView: 1
        },
        600: {
          perView: 1
        }
      }
    }).mount();
  }
  
  //Contact our Experts
  if (typeof Glide != "undefined" && document.querySelector('.our-experts') !== null) {
    const sidebarSlider = new Glide(".our-experts", {
      perView: 5,
      type: "carousel",
      gap:0,
      startAt: 0,
      breakpoints: {
        1024: {
          perView: 3
        },
        820: {
          perView: 3
        },
        768: {
          perView: 3
        },
        667: {
          perView: 1
        }
      }
    }).mount();
  }
  
  // Campaign Page: Featured Slider
  const cpBreakpoints = {
    1080: { perView: 1 },
  }
  
  if (typeof Glide != "undefined" && document.querySelector('.cp-featured__slider') !== null) {
    const campaignSlider = new Glide(".cp-featured__slider", {
      type: "carousel",
      startAt: 0,
      perView: 3,
      focusAt: 'center',
      gap: 40,
      animationDuration: 200,
      animationTimingFunc: "ease",
      peek: 0,
      dragThreshold: false,
      breakpoints: cpBreakpoints,
    }).mount();
  }
  
  // Campaign Page: Vertical Tab Component
  if (document.querySelector('.c-tab--vertical') !== null) {
    const tabLink = document.querySelectorAll('.c-tab__menu__item');
    const tabContent = document.querySelectorAll('.c-tab__content__item');
    
    function getContentIndex(content) {
      for (let i = 0; i < content.length; i++) {
        if (content[i].classList.contains("c-tab--active")) {
          return content[i].dataset.index;
        }
      }
    }
    
    function addClassToContent(index, content, myclass) {
      for (let i = 0; i < content.length; i++) {
        if (content[i].dataset.index == index) {
          content[i].classList.add(myclass);
        }
      }
    }
    
    function clearActive(tags) {
      tags.forEach(tag => tag.classList.remove("c-tab--active"));
    }
    
    tabLink.forEach(link => {
      link.addEventListener('mouseenter', function () {
        let tabLinkIndex = this.dataset.index;
        let tabContentIndex = getContentIndex(tabContent);
        if (tabLinkIndex !== tabContentIndex) {
          clearActive(tabLink);
          clearActive(tabContent);
          this.classList.add('c-tab--active');
          addClassToContent(tabLinkIndex, tabContent, 'c-tab--active');
        }
      })
  
      link.addEventListener('click', function(e) {
        e.preventDefault();
      })
    })
  }
  
  // Campaign Page: Vertical Tab becomes Accordion
  if (document.querySelector('.c-tab--vertical') !== null) {
    const tabLink = document.querySelectorAll('.c-tab__menu__item');
    const tabItem = document.querySelectorAll('.c-tab__content__item');
  
    function changeTab(e) {
      e.preventDefault();
      let tabParent = this.parentElement;
      if (!tabParent.classList.contains('c-tab--active')) {
        tabItem.forEach(item => item.classList.remove("c-tab--active"));
        tabParent.classList.add('c-tab--active');
      }
    }
  
    for (let i = 0; i < tabLink.length; i++) {
      let tabClone = tabLink[i].cloneNode(true);
      tabClone.classList.remove('c-tab--active', 'c-tab__menu__item');
      tabClone.classList.add('c-tab__content__btn');
      tabClone.addEventListener('click', changeTab);
      let tabContent = document.querySelector(`.c-tab__content__item[data-index='${i}']`);
      tabContent.insertAdjacentElement('afterbegin', tabClone);
    }
  }
  
  // Asiapedia-Resources Filter Dropdown
  if (document.querySelector('.ap-area__dropdown') !== null) {
    const ddBtn = document.querySelector('.ap-area__dropdown');
    const ddBox = document.querySelector('.ap-area__inner');
    ddBtn.addEventListener('click', function() {
      ddBox.classList.toggle('ap-area__inner--active');
    })
  }
  
  // Turn sidebars into dropdown menus
  function makeDropdown(name) {
    if (document.querySelector(`.${name}__dropdown`) !== null) {
      const sidebar = document.querySelector(`.${name}__sidebar`);
      const ddBox = document.querySelector(`.${name}__inner`);
      let title = sidebar.dataset.title || 'More Information';
  
      // Create button and attach it to our sidebar
      let ddBtn = document.createElement('button');
      ddBtn.innerHTML = title;
      ddBtn.classList.add(`${name}__button`);
      sidebar.insertAdjacentElement('afterbegin', ddBtn);
  
      ddBtn.addEventListener('click', function () {
        ddBox.classList.toggle(`${name}__inner--active`);
      })
    }
  }
  
  makeDropdown('s-layout');
  
  //Feature: List.js
  const listElements = document.querySelectorAll(".listJS");
  if (typeof List != "undefined" && listElements) {
    [].forEach.call(listElements, function (item) {
      var recordsPerPage = 10;
      if (item.getAttribute("data-page"))
        recordsPerPage = item.getAttribute("data-page");
  
      var options = {
        valueNames: ["title", "description"],
        page: recordsPerPage,
        pagination: true,
      };
      new List(item.getAttribute("id"), options);
    });
  }
  
  //cookie policy accept
  var cookiesPoligyAccept = document.getElementById("cookiesPoligyAccept");
  if (typeof cookiesPoligyAccept != "undefined" && cookiesPoligyAccept != null) {
    cookiesPoligyAccept.addEventListener("click", function () {
      setCookie("user_accepted_cookie_policy", "yes", 100);
    });
  }
  
  //Components: dropdown,accordion
  window.addEventListener(
    "load",
    () => {
      //Initiate the dropdown, the component will auto initiate all the dropdowns
      //Custom for dezshira.com layout ONLY
      // new dropdown();
      new dropdownCheckbox();
  
      //Scan all the pages for accordion and initiate
      const accordions = document.querySelectorAll(".accordion-wrapper");
      if (accordions) {
        [].forEach.call(accordions, function (item) {
          new accordion(item);
        });
      }
    },
    false
  );
  
  //Helper Functions
  function setCookie(t, e, i) {
    var n = new Date();
    n.setTime(n.getTime() + 24 * i * 60 * 60 * 1e3);
    var s = "expires=" + n.toUTCString();
    document.cookie = t + "=" + e + ";" + s + ";path=/";
  }
  
  function getCookie(t) {
    for (
      var e = t + "=", i = document.cookie.split(";"), n = 0;
      n < i.length;
      n++
    ) {
      for (var s = i[n]; " " == s.charAt(0); ) s = s.substring(1);
      if (0 == s.indexOf(e)) return s.substring(e.length, s.length);
    }
    return "";
  }
  

  

    document.addEventListener("DOMContentLoaded", function() {
  
      var glideElementsExplore = document.querySelectorAll('.explore-further-slider');
      [].forEach.call(glideElementsExplore, function(glideItem) {
        var glideClass = '.' + glideItem.className.toString().split(' ').join('.');
  
        var perView = 3;
        var totalSlide = 1;
        // if (glideItem.getAttribute('data-preView')) perView = glideItem.getAttribute('data-preView');
        // if (glideItem.getAttribute('data-preView')) totalSlide = glideItem.getAttribute('data-totalSlide');
  
  
        // if (totalSlide > 3) {
          new Glide(glideClass, {
            type: "slider",
            // focusAt: "center",
            perView: perView,
            // startAt: 1,
            breakpoints: {
              1024: {
                perView: perView,
              },
              600: {
                perView: 1,
              },
            },
          }).mount();
        // }
      });
  
    });
  
      /* media page vertical tabs */
      function openMedia(evt, countryName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(countryName).style.display = "block";
        evt.currentTarget.className += " active";
      }
      
      // Get the element with id="defaultOpen" and click on it
      var defaultOpen=document.getElementById("defaultOpen");
  if(defaultOpen) defaultOpen.click();
  
  
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
  
  // page MenuLi links on Scroll
  // Check if the page is country
  const countrySection=document.querySelector("main.country-section");
  if(countrySection){
  
    const sections = document.querySelectorAll("section");
  
    var sectionsTop = new Array;
    sections.forEach((section) => {
      var currentSectionLoop=section.getAttribute("id");
      if(currentSectionLoop=="why-singapore" || currentSectionLoop=="our-services" || currentSectionLoop=="our-team-experts" || currentSectionLoop=="case-study-videos" || currentSectionLoop=="insigts-events"){
      sectionsTop[section.offsetTop]=currentSectionLoop;
      }
    });
  console.log(sectionsTop);
    window.onscroll = () => {
  
      sectionsTop.forEach((s,topValue)=>{
  
        if(window.scrollY>=topValue-2000){
            var selected_navLinkAnchor=document.querySelector(".page-menu ul li.selected");
            if(selected_navLinkAnchor){
              selected_navLinkAnchor.classList.remove("selected")
            }
  
            var navLinkAnchor =document.querySelector("a[href='#"+s+"']").parentNode;
            navLinkAnchor.classList.add("selected");
  
        }
        
      })
    };
  
  
  }
  
  // Scroll up down
  
  const scrollToTopButton = document.getElementById('js-top');
  const scrollInstructionBottom = document.querySelector('.scrolldown-instruction');
  
  // Scroll Down Instruction Click
  scrollInstructionBottom.addEventListener('click', function (e) {
      window.scroll({
          top: 500,
          behavior: 'smooth'
      });
  })
  
  // Let's set up a function that shows our scroll-to-top button if we scroll beyond the height of the initial window.
  const scrollFunc = () => {
      // Get the current scroll value
      let y = window.scrollY;
  
      // If the scroll value is greater than the window height, let's add a class to the scroll-to-top button to show it!
      if (y > 0) {
          scrollToTopButton.className = "top-link show";
          scrollInstructionBottom.classList.add("hide");
      } else {
          scrollToTopButton.className = "top-link hide";
          scrollInstructionBottom.classList.remove("hide");
      }
  };
  
  window.addEventListener("scroll", scrollFunc);
  
  // When the button is clicked, run our ScrolltoTop function above!
  scrollToTopButton.onclick = function (e) {
      e.preventDefault();
      // scrollToTop();
  
      window.scroll({
        top: 0,
        behavior: 'smooth'
      });
  }