const slides = document.querySelectorAll(".slide");
const counterNode = document.querySelector(".counter");

// Исходное значение
counterNode.innerText = "1 / 4";
let counter = 0;

// Скрыть все слайды по дефолту
slides.forEach((slide, index) => {
  slide.style.left = `${index * 100}%`;
});

// Назад
const goPrev = () => {
  if (counter === 1) {
    hidePrev();
  }
  showNext();
  counter--;
  counterNode.innerText = `${counter + 1} / ${slides.length}`;
  slideImage();
};

// Вперед
const goNext = () => {
  if (counter === 2) {
    hideNext();
  }
  showPrev();
  counter++;
  counterNode.innerText = `${counter + 1} / ${slides.length}`;

  slideImage();
};

// Переключить слайд
const slideImage = () => {
  slides.forEach((slide) => {
    slide.style.transform = `translateX(-${counter * 100}%)`;
  });
};

// Скрыть кнопку prev
const hidePrev = () => {
  document.querySelector(".prev-btn").style.opacity = ".3";
  document.querySelector(".prev-btn").style.cursor = "default";
};

// Скрыть кнопку next
const hideNext = () => {
  document.querySelector(".next-btn").style.opacity = ".3";
  document.querySelector(".next-btn").style.cursor = "default";
};

// Показать кнопку prev
const showPrev = () => {
  document.querySelector(".prev-btn").style.opacity = "1";
  document.querySelector(".prev-btn").style.cursor = "pointer";
};

// Показать кнопку next
const showNext = () => {
  document.querySelector(".next-btn").style.opacity = "1";
  document.querySelector(".next-btn").style.cursor = "pointer";
};

// Скрыть кнопку prev по дефолту
hidePrev();