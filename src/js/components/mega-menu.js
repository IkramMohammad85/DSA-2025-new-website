document.addEventListener('DOMContentLoaded', function () {
  // Function to handle service tabs
  window.openService = function (event, serviceFocus) {
      event.stopPropagation();
      var servicetabcontent = document.getElementsByClassName("servicetabcontent");
      var servicetablinks = document.getElementsByClassName("servicetablinks");

      for (let i = 0; i < servicetabcontent.length; i++) {
          servicetabcontent[i].style.display = "none";
      }
      for (let i = 0; i < servicetablinks.length; i++) {
          servicetablinks[i].classList.remove("activeservice");
      }

      document.getElementById(serviceFocus).style.display = "flex";
      event.currentTarget.classList.add("activeservice");
  };

  // Automatically open the default service tab
  document.getElementById("Opendefault").click();

  // Function to activate mega menu tabs
  function activateTab(section, mgtabRel) {
      const megatabs = section.querySelectorAll('.mega-mtabs li');
      const megaMtabContents = section.querySelectorAll('.mega-mtab-content');
      const megaMtabHeadings = section.querySelectorAll('.mega-mtab-heading');

      megatabs.forEach(mgtab => {
          mgtab.classList.toggle('active', mgtab.getAttribute('rel') === mgtabRel);
      });
      megaMtabContents.forEach(content => {
          content.style.display = content.id === mgtabRel ? 'flex' : 'none';
      });
      megaMtabHeadings.forEach(heading => {
          heading.classList.toggle('d_active', heading.getAttribute('rel') === mgtabRel);
      });
  }

  function activateFirstTab(section) {
      const firstTab = section.querySelector('.mega-mtabs li');
      if (firstTab) {
          firstTab.classList.add('active');
          activateTab(section, firstTab.getAttribute('rel'));
      }
  }

  function setupSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (!section) return;

      activateFirstTab(section);

      section.querySelectorAll('.mega-mtabs li span').forEach(span => {
          span.addEventListener('mouseover', function () {
              activateTab(section, this.parentElement.getAttribute('rel'));
          });
      });

      section.querySelectorAll('.mega-mtab-heading').forEach(heading => {
          heading.addEventListener('click', function () {
              const content = section.querySelector(`#${this.getAttribute('rel')}`);
              const megaMtabContents = section.querySelectorAll('.mega-mtab-content');
              const megaMtabHeadings = section.querySelectorAll('.mega-mtab-heading');

              if (content.style.display === 'block') {
                  content.style.display = 'none';
                  this.classList.remove('d_active');
              } else {
                  megaMtabContents.forEach(c => c.style.display = 'none');
                  megaMtabHeadings.forEach(h => h.classList.remove('d_active'));
                  content.style.display = 'block';
                  this.classList.add('d_active');
              }
          });
      });
  }

  const sections = ['serviceAreas', 'industryFocus', 'resources-section-menu', 'locations-section-menu', 'about-section-menu','events-webinars-menu'];
  sections.forEach(setupSection);

  // Add hover effect for service page subheading
  const pageSubheading = document.querySelectorAll('.page-link-block');
  pageSubheading.forEach(block => {
      const links = block.querySelectorAll('ul');
      const subheadingText = block.querySelector('.service-page-subheading a');

      if (subheadingText) {
          links.forEach(link => {
              link.addEventListener('mouseover', () => subheadingText.classList.add('text-black'));
              link.addEventListener('mouseout', () => subheadingText.classList.remove('text-black'));
          });
      }
  });

  // Mega menu close button
  document.querySelectorAll(".mega-menu-close-btn").forEach(closeBtn => {
      closeBtn.addEventListener('click', function (e) {
          e.preventDefault();
          let megaMenu = this.closest('.navbar__megamenu');
          if (megaMenu) {
              megaMenu.style.display = 'none';
              setTimeout(() => { megaMenu.style.display = ''; }, 600);
          }
      });
  });

  // Mega menu toggle
  const navbar__menu = document.querySelector('.navbar__menu');
  const navItems = document.querySelectorAll('ul.navbar__menu > li');

  navItems.forEach(navItem => {
      navItem.addEventListener('click', function (e) {
          e.stopPropagation();
          clearMegaMenu();

          let toggleMenu = this.querySelector('.navbar__togglemenu');
          let megaMenu = this.querySelector('.navbar__megamenu');

          if (toggleMenu && megaMenu) {
              toggleMenu.classList.toggle("menu-opened");
              megaMenu.classList.toggle("menu-expanded");
          }
      });

      navItem.addEventListener('mouseleave', function (event) {
          var e = event.relatedTarget;
          while (e && e.parentNode && e.parentNode !== window) {
              if (e.parentNode === this || e === this) {
                  return false;
              }
              e = e.parentNode;
          }
      });
  });

  navbar__menu.addEventListener('mouseleave', function (event) {
      if (!document.querySelector('.navbar').contains(event.relatedTarget)) {
          clearMegaMenu();
          resetTwice();
      }
  });

  function clearMegaMenu() {
      document.querySelectorAll('.navbar__togglemenu.menu-opened').forEach(btn => {
          btn.classList.remove("menu-opened");
      });

      document.querySelectorAll('.navbar__megamenu.menu-expanded').forEach(menu => {
          menu.classList.remove("menu-expanded");
      });
  }

  function clickedTwice(element) {
      let btn = element.children[0];
      btn.dataset.twice = parseInt(btn.dataset.twice || 0, 10) + 1;

      if (btn.dataset.twice == 2) {
          clearMegaMenu();
          btn.dataset.twice = 0;
      }
  }

  function resetTwice() {
      document.querySelectorAll('ul.navbar__menu > li > a.navbar__togglemenu').forEach(btn => {
          btn.dataset.twice = 0;
      });
  }

  
});

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

// Icon menu
const navbar__iconmenu = document.querySelector('.navbar__iconmenu');
const iconItems = document.querySelectorAll('ul.navbar__iconmenu > li > a');

for (var i = 0; i <= iconItems.length; i++) {
  let iconItem = iconItems[i];
  if (iconItem && iconItem.hasAttribute("data-twice")) {
    iconItem.addEventListener('click', function(e) {
      clearIconMenu();
      this.classList.toggle("menu-opened");
      checkTwice(this);
    })
  }
}

navbar__iconmenu.addEventListener('mouseleave', function (event) {
  clearIconMenu();
  resetCount();
});
    
// Close the menu when clicking outside
document.addEventListener('click', function (event) {
  if (!navbar__iconmenu.contains(event.target)) {
    clearIconMenu();
    resetCount();
  }
});

function clearIconMenu() {
  let openItem = document.querySelector('ul.navbar__iconmenu li a.menu-opened');
  if (openItem) {
    openItem.classList.toggle("menu-opened");
  }
}

function checkTwice(element) {
  element.dataset.twice = parseInt(element.dataset.twice, 10) + 1;
  if (element.dataset.twice == 2) {
    clearIconMenu();
    element.dataset.twice = 0;
  }
}
function resetCount() {
  let btns = document.querySelectorAll('ul.navbar__iconmenu > li > a[data-twice]');
  btns.forEach(function (btn) {
    btn.dataset.twice = 0;
  });
}
