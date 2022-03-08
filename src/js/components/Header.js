const buttonOpenMenu = document.querySelector('.j_header-toggle');
const menu = document.querySelector('.j_menu');

const toggleMobileMenu = () => {
  buttonOpenMenu.classList.toggle('active');
  menu.classList.toggle('active');
}

buttonOpenMenu.addEventListener('click', toggleMobileMenu); 


// Закрытие меню при клике вне меню
window.addEventListener('click', (e) => { 
  const target = e.target;
  if (!target.closest('.header__inner') && !target.closest('.j_header-toggle')) { 
    menu.classList.remove('active');
  }
});