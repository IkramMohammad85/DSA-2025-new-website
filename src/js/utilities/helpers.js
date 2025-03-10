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
