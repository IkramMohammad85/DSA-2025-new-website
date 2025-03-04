$(function(){

    window.sr = ScrollReveal();
  
    if ($(window).width() < 1024) {
  
        if ($('.timeline-content').hasClass('js--fadeInLeft')) {
            $('.timeline-content').removeClass('js--fadeInLeft').addClass('js--fadeInRight');
        }
  
        sr.reveal('.js--fadeInRight', {
          origin: 'right',
          distance: '300px',
          easing: 'ease-in-out',
          duration: 1000,
        });
  
    } else {
        
        sr.reveal('.js--fadeInLeft', {
          origin: 'left',
          distance: '300px',
            easing: 'ease-in-out',
          duration: 800,
        });
  
        sr.reveal('.js--fadeInRight', {
          origin: 'right',
          distance: '300px',
          easing: 'ease-in-out',
          duration: 800,
        });
  
    }
    
    sr.reveal('.js--fadeInLeft', {
          origin: 'left',
          distance: '300px',
            easing: 'ease-in-out',
          duration: 800,
        });
  
        sr.reveal('.js--fadeInRight', {
          origin: 'right',
          distance: '45500px',
          easing: 'ease-in-out',
          duration: 800,
        });
  
  
  });
// more and less text
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
  