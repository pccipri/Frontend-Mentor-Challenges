const shareButton = document.getElementById('shareButton');
const shareContainer = document.getElementById('shareContainer');
const shareImage = document.getElementById('shareImage')
const shareTriangle = document.getElementById('shareTriangle');

if (window.innerWidth > 769) {
shareButton.addEventListener('mouseenter', (event) => {
    shareContainer.classList.add('active');
    shareTriangle.classList.add('active');
    shareImage.style.filter = 'brightness(0) invert(1)';
  });

  shareButton.addEventListener('mouseleave', (event) => {
    shareContainer.classList.remove('active');
    shareTriangle.classList.remove('active');
    shareImage.style.filter = 'brightness(100%) invert(0)';
  });
}
else {
  shareButton.addEventListener('touchstart', (event) => {
    if(shareContainer.classList.contains('active')) {
      shareContainer.classList.remove('active');
      shareButton.style.backgroundColor = 'hsl(210, 46%, 95%)';
      shareImage.style.filter = 'brightness(100%) invert(0)';
    } else {
      shareContainer.classList.add('active');
      shareButton.style.backgroundColor = 'hsl(214, 17%, 51%)';
      shareImage.style.filter = 'brightness(0) invert(1)';
    }
  });

}
