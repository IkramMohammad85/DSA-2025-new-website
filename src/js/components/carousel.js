// carousel for mobile 

document.addEventListener("DOMContentLoaded", function() {

  var glideElementsExplore = document.querySelectorAll('.explore-further-slider');
  [].forEach.call(glideElementsExplore, function(glideItem) {
    var glideClass = '.' + glideItem.className.toString().split(' ').join('.');

    var perView = 3;
    var totalSlide = 1;
    if (glideItem.getAttribute('data-preView')) perView = glideItem.getAttribute('data-preView');
    if (glideItem.getAttribute('data-preView')) totalSlide = glideItem.getAttribute('data-totalSlide');


    new Glide(glideClass, {
      // type: "carousel",
      type: "slider",
      // focusAt: "center",
      perView: perView,
      // startAt: 1,
      bound: true,
      breakpoints: {
        1024: {
          perView: perView,
        },
        768: {
          perView: 1,
        },
      },
    }).mount();
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(carousel => {
  const indicatorsContainer = carousel.querySelector('.carousel-indicators');
  const items = carousel.querySelectorAll('.carousel-item');
  let startX = null;
  items.forEach((item, index) => {
  const indicator = document.createElement('div');
  indicator.classList.add('carousel-indicator');
  if (index === 0) indicator.classList.add('active');
  indicator.addEventListener('click', () => {
  goToItem(index, carousel);
  });
  indicatorsContainer.appendChild(indicator);
  });
  function goToItem(index, carousel) {
  const carouselWidth = carousel.offsetWidth;
  const offset = index * carouselWidth;
  carousel.querySelector('.carousel-inner').style.transform = `translateX(-${offset}px)`;
  const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
  indicators.forEach((indicator, i) => {
  indicator.classList.toggle('active', i === index);
  });
  }
  // Swipe gesture handling
  carousel.addEventListener('touchstart', touchStart);
  carousel.addEventListener('touchmove', touchMove);
  function touchStart(event) {
  startX = event.touches[0].clientX;
  }
  function touchMove(event) {
  if (!startX) return;
  const endX = event.touches[0].clientX;
  const diffX = startX - endX;
  if (Math.abs(diffX) > 50) {
  if (diffX > 0) {
  // Swiped left
  goToNextItem(carousel);
  } else {
  // Swiped right
  goToPrevItem(carousel);
  }
  startX = null;
  }
  }
  function goToNextItem(carousel) {
  const currentActiveIndex = Array.from(indicatorsContainer.querySelectorAll('.carousel-indicator')).findIndex(indicator => indicator.classList.contains('active'));
  const nextIndex = (currentActiveIndex + 1) % items.length;
  goToItem(nextIndex, carousel);
  }
  function goToPrevItem(carousel) {
  const currentActiveIndex = Array.from(indicatorsContainer.querySelectorAll('.carousel-indicator')).findIndex(indicator => indicator.classList.contains('active'));
  const prevIndex = (currentActiveIndex - 1 + items.length) % items.length;
  goToItem(prevIndex, carousel);
  }
  });
  });