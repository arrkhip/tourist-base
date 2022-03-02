const buttonMenu = document.querySelector('.j_header-toggle');
const menu = document.querySelector('.j_menu');

buttonMenu.addEventListener('click', function() {
  this.classList.toggle('active');
  menu.classList.toggle('active');
});