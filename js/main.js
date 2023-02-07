let elHeaderNav = document.querySelector(".header__nav");
let elBtn = document.querySelector(".close-btn");
let elExitBtn = document.querySelector(".exit-btn");

elBtn.addEventListener("click" , function(){
  elHeaderNav.classList.toggle("header__nav--active")
})

elExitBtn.addEventListener("click" , function(){
  elHeaderNav.classList.remove("header__nav--active")
})

window.addEventListener("resize" , function(){
  if(window.innerWidth>768){
    elHeaderNav.classList.add("header__nav--active");
  }
})

window.addEventListener("resize" , function(){
  if(window.innerWidth<768){
    elHeaderNav.classList.remove("header__nav--active");
  }
})