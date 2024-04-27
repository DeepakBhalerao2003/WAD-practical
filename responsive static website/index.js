
var swiper1 = new Swiper(".mySwiper", {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
        dynamicBullets: true,
    //   type: "progressbar",
    },
    loop: true, 
    spaceBetween: 30,
      effect: "fade",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
        delay: 3000, // Change this to adjust the delay between slides
        disableOnInteraction: false, // Keep this false to allow clicking and autoplay
      },
  });




  var swiper = new Swiper('.slide-card', {
    slidesPerView: 3, // Adjust slidesPerView accordingly
    spaceBetween: 30, // Adjust space between slides accordingly
    loop: true,
      // loopFillGroupWithBlank: true
    fade:true,
    graCursor: true,
    centerSlide: true,
    pagination:{
      el : '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    // autoplay: {
    //   delay: 3000, // Change this to adjust the delay between slides
    //   disableOnInteraction: false, // Keep this false to allow clicking and autoplay
    // },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints:{
      
      0: {
        slidesPerView: 1,
      },
      800: {
        slidesPerView: 2,
      },
      1100:{
        slidesPerView: 3,
      } ,
    },
  });

