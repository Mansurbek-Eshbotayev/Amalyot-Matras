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

window.addEventListener("resize" , function(){
  if(window.innerWidth === 1026){
    window.location.reload();
  }
})


// Add contact

let elContactForm = document.querySelector(".interes__form");
let elContactInput = document.querySelector(".interes__input");
let elSecondPage = document.querySelector(".interes__second");

elContactForm.addEventListener("submit", function(evt){
  evt.preventDefault()
 
  let inputVal = elContactInput.value
  // let dataNum = {
  //   "number":inputVal
  // }

  if (elContactInput.value) {

     fetch("http://localhost:1212/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        number: inputVal
      }),
    })
    .then(data => {
      console.log(data)
      if (data.status === 201) {
        elSecondPage.classList.add('interes__second--on')
      }
    })
    .catch(err => console.log(err))

    elContactInput.value = ""

  }
})

// Carousel hero

let elCarouselList = document.querySelector(".hero__list");
let elCarouselTitle = document.querySelectorAll(".hero__title");
let listFragment = new DocumentFragment()

function CreateCarousel (){
  elCarouselList.innerHTML = ''

  fetch('http://localhost:1212/api/carousel')
  .then(res => res.json())
  .then(data => {
    if (data) {
      // console.log(data);
      data.forEach(item => {
        
        let newItem = document.createElement('li')
        newItem.setAttribute('class','hero__item')
        
        let info = `
            <h3 class="hero__title">
            ${item.title}
            </h3>
            <img class="hero__img" src='http://localhost:1212/carousel/${item.image}' alt="bad">
            <img class="hero__img--two" src='http://localhost:1212/carousel/${item.image}' alt="bad">
            <a class="hero__link" href="#">
              Kategoriyalar
            </a>
        `
        newItem.innerHTML = info
        listFragment.appendChild(newItem)
      })
      elCarouselList.appendChild(listFragment)
    }

    $('.hero__list').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      dots:true,
      autoplay: true,
      autoplaySpeed: 4000,
    });
  })
  .catch(err => console.log(err))

} 

CreateCarousel()


// post Modal
elModal = document.querySelector(".modal")
elHederMinBtn = document.querySelector(".header__btn")
elHederBtn = document.querySelector(".header__btn--on")
elWrapModal = document.querySelector(".wrap__modal")
elExitBtn = document.querySelector(".modal_exit")

// add input
elInputName = document.querySelector(".modal__name")
elInputNumber = document.querySelector(".modal__tel")
elSelect = document.querySelector(".modal__select")
// count
elIncBtn = document.querySelector(".button_inc")
elDecBtn = document.querySelector(".button_dec")
elCount = document.querySelector(".button__count")
elSecondlModal = document.querySelector(".second__modal")
elSecondlLastModal = document.querySelector(".second__btn")
elFrist = document.querySelector(".modal")

// open modal
elHederBtn.addEventListener("click", function(){
  elWrapModal.classList.add("wrap__modal--on")
  // elSecondlModal.classList.remove("second__modal--on")
})
// open modal
elHederMinBtn.addEventListener("click", function(){
  elWrapModal.classList.add("wrap__modal--on")
})
//  close modal
elExitBtn.addEventListener("click", function(){
  elWrapModal.classList.remove("wrap__modal--on")
})

// Econd Modal close
elSecondlLastModal.addEventListener("click", function(){
  elSecondlModal.classList.remove("second__modal--on")
  elWrapModal.classList.remove("wrap__modal--on")
})

// incer function
let count = 1
elDecBtn.addEventListener("click", function(){
  count += 1
  elCount.textContent = count
})


elIncBtn.addEventListener("click", function(){
  count -= 1
  if (count == 0) {
    count = 1
  }
  elCount.textContent = count;
})



// submit
elModal.addEventListener("submit", function(evt){
   evt.preventDefault()

  fetch("http://localhost:1212/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: elInputName.value,
        number: elInputNumber.value,
        productName: elSelect.value,
        count:count
      }),
    })
    .then(data => {
      if (data.status === 201) {
        console.log(data);
        elFrist.classList.add("modal_off")
        elSecondlModal.classList.add("second__modal--on")
      }
    })
    .catch(err => console.log(err))

})

// get product

let elProductlList = document.querySelector(".product__box");
let ProductFragment = new DocumentFragment()

function CreateProduct (){
  elProductlList.innerHTML = ''

  fetch('http://localhost:1212/api/products')
  .then(res => res.json())
  .then(data => {
    if (data) {
      // console.log(data);
      let fristPro = data.products
      // console.log(fristPro);
      fristPro.forEach(item => {

        const img = item.product_images.replaceAll("[", "").replaceAll("]", "").replaceAll('"', "").split(",")[0]
        // console.log(img);

        // console.log(item.product_images);
        
        let newProductItem = document.createElement('li')
        newProductItem.setAttribute('class','buying__item')
        
        let infor = `
        <div class="buying__wrap wrap">
        <a class="wrap__link" href="#">
          Yangi mahsulot
        </a>
        <h4 class="buying__title">
          ${item.name}
        </h4>
        <img class="wrap__img" src='http://localhost:1212/carousel/${img}' alt="moto">
        <img class="wrap__img--two" src='http://localhost:1212/carousel/${img}' alt="moto">
      </div>

      <div class="buying__info">
        <h4 class="buying__title--two">
        ${item.name}
        </h4>
        <ul class="buying__content content">
          <li class="content__item">
            <span class="content__type">Yuklama</span>
            <strong class="content__size">${item.weight} <span>kg</span></strong>
          </li>

          <li class="content__item">
            <span class="content__type">Kafolat</span>
            <strong class="content__size">${item.warranty} <span>yil</span></strong>
          </li>

          <li class="content__item">
            <span class="content__type">O’lchami</span>
            <strong class="content__size">${item.size}</strong>
          </li>

          <li class="content__item">
            <span class="content__type">Sig’imi</span>
            <strong class="content__size">${item.capacity} <span> kishilik</span></strong>
          </li>
        </ul>
        <p class="buying__text">
        ${item.body}
        </p>

        <div class="content__cash cash">
          <span class="cash__price">Narxi</span>
          <strong class="cash__value">${item.cost}<span>so'm</span></strong>
        </div>

        <button class="content__order">
          Buyurtma berish
        </button>
      </div>
        `
        newProductItem.innerHTML = infor
        ProductFragment.appendChild(newProductItem)
      })
      elProductlList.appendChild(ProductFragment)
    }

  })
  .catch(err => console.log(err))

} 

CreateProduct()

// get axia

let elProductlAxiaList = document.querySelector(".product__action");
let ProductAxiaFragment = new DocumentFragment()

function CreateProductAxia (){
  elProductlAxiaList.innerHTML = ''

  fetch('http://localhost:1212/api/products')
  .then(res => res.json())
  .then(data => {
    if (data) {
      // console.log(data);
      let fristPro = data.products
      // console.log(fristPro);
      fristPro.forEach(item => {

        const img = item.product_images.replaceAll("[", "").replaceAll("]", "").replaceAll('"', "").split(",")[0]
        // console.log(img);

        // console.log(item.product_images);
        
        let newProductItemAxia = document.createElement('li')
        newProductItemAxia.setAttribute('class','buying__item')
        
        let inform = `
        <div class="buying__wrap wrap">
        <a class="wrap__link" href="#">
          Yangi mahsulot
        </a>
        <h4 class="buying__title">
          ${item.name}
        </h4>
        <img class="wrap__img" src='http://localhost:1212/carousel/${img}' alt="moto">
        <img class="wrap__img--two" src='http://localhost:1212/carousel/${img}' alt="moto">
      </div>

      <div class="buying__info">
        <h4 class="buying__title--two">
        ${item.name}
        </h4>
        <ul class="buying__content content">
          <li class="content__item">
            <span class="content__type">Yuklama</span>
            <strong class="content__size">${item.weight} <span>kg</span></strong>
          </li>

          <li class="content__item">
            <span class="content__type">Kafolat</span>
            <strong class="content__size">${item.warranty} <span>yil</span></strong>
          </li>

          <li class="content__item">
            <span class="content__type">O’lchami</span>
            <strong class="content__size">${item.size}</strong>
          </li>

          <li class="content__item">
            <span class="content__type">Sig’imi</span>
            <strong class="content__size">${item.capacity} <span> kishilik</span></strong>
          </li>
        </ul>
        <p class="buying__text">
        ${item.body}
        </p>

        <div class="content__cash cash">
                <span class="cash__price">Narxi</span>
                <div class="cash__cover">
                  <strong class="cash__value--red">${item.new_cost} <span> so'm</span></strong>
                  <strong class="cash__value">${item.cost}<span>so'm</span></strong>
                </div>
              </div>

              <button class="content__order">
                Xarid qilish
              </button>
      </div>
        `
        newProductItemAxia.innerHTML = inform
        ProductAxiaFragment.appendChild(newProductItemAxia)
      })
      elProductlAxiaList.appendChild(ProductAxiaFragment)
    }

  })
  .catch(err => console.log(err))

} 

CreateProductAxia()



// get Travel
// travel__ownList
let elTravellList = document.querySelector(".travel__ownList");
let TravellFragment = new DocumentFragment()

function Createtravel (){
  elTravellList.innerHTML = ''

  fetch('http://localhost:1212/api/address')
  .then(res => res.json())
  .then(data => {
    if (data) {
      // console.log(data);
      data.forEach(item => {

        const img = item.images.replaceAll("[", "").replaceAll("]", "").replaceAll('"', "").split(",")[0]
        // console.log(img);
        
        let newTrivelItem = document.createElement('li')
        newTrivelItem.setAttribute('class','travel__ownItem')
        
        let unicForm = `
        <div class="travel__wrap">

        <div class="travel__info">
          <h3 class="travel__title">
            Manzilimiz
          </h3>
  
          <div class="travel__cover">
            <ul class="travel__list">
              <li class="travel__item">
                <img class="travel__img" src='http://localhost:1212/carousel/${img}' alt="temp">
              </li>
              <li class="travel__item">
              <img class="travel__img" src='http://localhost:1212/carousel/${img}' alt="temp">
              </li>
              <li class="travel__item">
              <img class="travel__img" src='http://localhost:1212/carousel/${img}' alt="temp">
              </li>
            </ul>
          </div>
  
          <p class="travel__desc">
            ${item.location}
          </p>
  
          <p class="travel__text">
          ${item.destination}
          </p>
  
          <a class="travel__location" href='https://www.google.com/maps/search/${item.geolacation}' target="blank">
            Geolokatsiya
          </a>
        </div>

        <div class="travel__carousel carousel-on">
          <div class="travel__cover">
            <ul class="travel__list">
              <li class="travel__item">
                <img class="travel__img" src='http://localhost:1212/carousel/${img}' alt="temp">
              </li>
              <li class="travel__item">
              <img class="travel__img" src='http://localhost:1212/carousel/${img}' alt="temp">
              </li>
              <li class="travel__item">
              <img class="travel__img" src='http://localhost:1212/carousel/${img}' alt="temp">
              </li>
            </ul>
          </div>
        </div>
       </div>
        `
        newTrivelItem.innerHTML = unicForm
        TravellFragment.appendChild(newTrivelItem)
      })
      elTravellList.appendChild(TravellFragment)
    }
    $('.travel__ownList').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      dots:false,
      autoplay: true,
      autoplaySpeed: 12600,
    });
    
    $('.travel__list').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      dots:true,
      autoplay: true,
      autoplaySpeed: 4000,
    });
  
  })
  .catch(err => console.log(err))

} 

Createtravel()


// get technology

let elMovieList = document.querySelector(".movie__list");
let listMovieFragment = new DocumentFragment()

function CreateMovie (){
  elMovieList.innerHTML = ''

  fetch('http://localhost:1212/api/technology')
  .then(res => res.json())
  .then(data => {
    if (data) {
      console.log(data);
      data.forEach(item => {
        
        let newMovieItem = document.createElement('li')
        newMovieItem.setAttribute('class','movie__item')
        
        let infoMove = `
        <h3 class="youtube__title">
        ${item.name}
       </h3>
       <div class="youtube__wrap">
        <iframe class="youtube__link" src="https://www.youtube.com/embed/${item.link}" title="template?" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
       </div>

       <p class="youtube__desc">
       ${item.description}
       </p>
        `
        newMovieItem.innerHTML = infoMove
        listMovieFragment.appendChild(newMovieItem)
      })
      elMovieList.appendChild(listMovieFragment)
    }

    $('.movie__list').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      dots:false,
      autoplay: true,
      autoplaySpeed: 4000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 850,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1.5,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 400,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots:true,
          }
        },
      ]
    });
 
  })
  .catch(err => console.log(err))

} 

CreateMovie()

// let elYtBtn = document.querySelector(".space__btn")
// let elYtImg = document.querySelector(".tout__img")

elProductlList.addEventListener("click", function(evt){
  if (evt.target.matches(".content__order")) {
    elWrapModal.classList.add("wrap__modal--on")
  }
})

elProductlAxiaList.addEventListener("click", function(evt){
  if (evt.target.matches(".content__order")) {
    elWrapModal.classList.add("wrap__modal--on")
  }
})

{/* <button class="space__btn" data-id=${item.id}></button>
<img class="tout__img" src="http://i3.ytimg.com/vi/${item.thumbnail}/mqdefault.jpg" alt="template"> */}





