const mobileMenu = document.querySelector(".js-mobilemenu");
const menuTriggers = document.querySelectorAll(".js-menutrigger");
const docBody = document.querySelector("body");
const bodyMenuClass = "has-menu";
const menuActiveClass = "is-active";

function init() {
  menuTriggers.forEach((el) => {
    el.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        mobileMenu.classList.toggle(menuActiveClass);
        docBody.classList.toggle(bodyMenuClass);
      },
      false
    );
  });
}

export { init };
