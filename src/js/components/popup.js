const openEls = document.querySelectorAll("[data-open]");
const closeEls = document.querySelectorAll("[data-close]");
const isVisible = "is-visible";

for (let i = 0; i < openEls.length; i++) {
  var el = openEls[i];
  el.addEventListener("click", function () {
    const modalId = this.getAttribute("data-open");
    document.getElementById(modalId).classList.add(isVisible);
  });
}

for (let i = 0; i < openEls.length; i++) {
  var el = openEls[i];
  el.addEventListener("click", function () {
    this.parentElement.parentElement.parentElement.classList.remove(isVisible);
  });
}

document.addEventListener("click", (e) => {
  if (e.target == document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});

document.addEventListener("keyup", (e) => {
  // if we press the ESC
  if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});

     // Get the modal and close button elements
     var modal = document.getElementById("eventModal");
     var closeBtn = document.getElementsByClassName("register__accessbox__close")[0];
     
     // Get the video element
     var video = document.getElementById("eventVideo");
           // Get the list of videos on the page
     // Get the list of videos on the page with the "video-item" class
     var videoList = document.getElementsByClassName("event-video-item");
     
     // Add click event listeners to each video in the list
     for (var i = 0; i < videoList.length; i++) {
       videoList[i].addEventListener("click", function() {
         // Update the video source in the modal
         video.src = this.getAttribute("src");
         video.poster=this.getAttribute("data-cover");
         
         // Show the modal
         modal.style.display = "block";
       });
     }
     // When the user clicks on the close button, stop the video
     closeBtn.onclick = function() {
     modal.style.display = "none";
     video.pause();
     }
     // When the user clicks anywhere outside of the modal, close it and stop the video
     window.onclick = function(event) {
     if (event.target == modal) {
     modal.style.display = "none";
     video.pause();
     }
     }
