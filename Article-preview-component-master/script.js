const shareButton = document.getElementById('shareButton');
const shareContainer = document.getElementById('shareContainer');
const shareImage = document.getElementById('shareImage')
const shareTriangle = document.getElementById('shareTriangle');

function addHighlight(button, image) {
  button.style.backgroundColor = 'hsl(214, 17%, 51%)';
  image.style.filter = 'brightness(0) invert(1)';
}

function removeHighlight(button, image) {
  button.style.backgroundColor = 'hsl(210, 46%, 95%)';
  image.style.filter = 'brightness(100%) invert(0)';
}

function addActiveClass(element) {
  element.classList.add('active');
}

function removeActiveClass(element) {
  element.classList.remove('active');
}

shareButton.addEventListener('mouseenter', () => {
  if(window.innerWidth > 768) {
  addActiveClass(shareContainer);
  addActiveClass(shareTriangle);
  addHighlight(shareButton, shareImage);
  }
  else {
    addActiveClass(shareContainer);
    addHighlight(shareButton, shareImage);
  }

});

shareButton.addEventListener('mouseleave', () => {
  removeActiveClass(shareContainer);
  removeActiveClass(shareTriangle);
  removeHighlight(shareButton, shareImage);
})
