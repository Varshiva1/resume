"use strict";

const btnScollTo = document.querySelector(".btn--scroll-to");
const sec1 = document.querySelector("#section--1");
const moveToTopBtn = document.querySelector(".movetop");
const nav = document.querySelector(".nav");
const allSections = document.querySelectorAll(".section");
const navLink = document.querySelector(".nav");
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

/////////////scoll tbn to section1
btnScollTo.addEventListener("click", function (e) {
  e.preventDefault();
  sec1.scrollIntoView({ behavior: "smooth" });
});

//scroll with nav links
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
    });
  }
});

/////nav hover effect
const hoverEffect = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const sibling = link.closest(".nav").querySelectorAll(".nav__link");

    sibling.forEach((sib) => {
      if (sib !== link) {
        sib.style.opacity = this;
      }
    });
  }
};
nav.addEventListener("mouseover", hoverEffect.bind(0.5));
nav.addEventListener("mouseout", hoverEffect.bind(1));

/////scrolling effect for section
const secObsFunc = function (sec, observer) {
  const [sect] = sec;
  if (!sect.isIntersecting) return;
  sect.target.classList.remove("section--hidden");
  observer.unobserve(sect.target);
};

const secObserver = new IntersectionObserver(secObsFunc, {
  root: null,
  threshold: 0.15,
});

allSections.forEach((section) => {
  secObserver.observe(section);
  section.classList.add("section--hidden");
});

//////sticky nav after front page
const navheight = navLink.getBoundingClientRect().height;
const navObserve = function (nav) {
  nav.forEach((navbar) => {
    if (navbar.isIntersecting) {
      moveToTopBtn.style.opacity = 0;
      navLink.classList.remove("sticky");
    } else {
      moveToTopBtn.style.opacity = 1;
      navLink.classList.add("sticky");
    }
  });
};
const navObserver = new IntersectionObserver(navObserve, {
  root: null,
  threshold: 0,
  rootMargin: `-${navheight}px`,
});
navObserver.observe(document.querySelector(".header"));

/////slider for section 3
let currslide = 0;

const createdots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createdots();

const changeSlide = function (slide) {
  slides.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
changeSlide(currslide);

const nextSlide = function () {
  if (currslide === slides.length - 1) {
    currslide = 0;
  } else {
    currslide++;
  }
  changeSlide(currslide);
  activedots(currslide);
};

const prevSlide = function () {
  if (currslide === 0) {
    currslide = slides.length - 1;
  } else {
    currslide--;
  }
  changeSlide(currslide);
  activedots(currslide);
};

const activedots = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};
activedots(0);

btnRight.addEventListener("click", nextSlide);

btnLeft.addEventListener("click", prevSlide);

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") prevSlide();
  else if (e.key === "ArrowRight") nextSlide();
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const slide = e.target.dataset.slide;
    changeSlide(slide);
    activedots(slide);
  }
});

//move to top btn
moveToTopBtn.addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".header").scrollIntoView({ behavior: "smooth" });
});

document.querySelector(".send_msg").addEventListener("click", function (e) {
  e.preventDefault();
});
