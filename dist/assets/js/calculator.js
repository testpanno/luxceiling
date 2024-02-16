document.addEventListener("DOMContentLoaded", function () {
  const addRoomBtn = document.querySelector(".add-room-btn");
  const removeRoomBtn = document.querySelector(".remove-room-btn");
  const roomsList = document.querySelector(".calculator-widget-rooms-list");
  const ceilingTypeChooseTab = document.querySelector(
    "#ceiling-type-choose-tab"
  );
  const manufacturerChooseTab = document.querySelector(
    "#manufacturer-choose-tab"
  );
  const constructionTypeChooseTab = document.querySelector(
    "#construction-type-choose-tab"
  );
  const darkInputs = document.querySelectorAll(".dark-input");

  //
  // ===== ИСХОДНОЕ СОСТОЯНИЕ КАЛЬКУЛЯТОРА ============================
  //

  const calculatorState = {
    rooms: [
      {
        name: "Помещение 1",
        area: 0,
        corners: 4,
        ventilation: 0,
        luminaries: 0,
        chandeliers: 0,
        pipes: 0,
        ceilingType: "PVC",
        manufacturer: "MSD-Premium",
        constructionType: "classic",
      },
    ],
    selectedRoom: 0, // Индекс выбранного помещения
  };

  //
  // ===== РЕНДЕР КНОПОК И ДАННЫХ О ПОМЕЩЕНИЯХ ======================
  //    

  // Функция для отображения кнопок
  function renderRoomButtons() {
    roomsList.innerHTML = "";
    calculatorState.rooms.forEach((room, index) => {
      const newButton = document.createElement("button");
      newButton.classList.add(
        "me-3",
        "mb-3",
        "btn",
        "btn-outline-light",
        "d-flex",
        "align-items-center"
      );
      newButton.textContent = room.name;

      // Добавляем класс btn-primary к активной кнопке
      if (index === calculatorState.selectedRoom) {
        newButton.classList.add("btn-primary");
      }

      // Создаем элемент <i> для удаления конкретной комнаты
      const closeButton = document.createElement("i");
      closeButton.classList.add(
        "ms-3",
        "remove-room-icon",
        "fa-regular",
        "fa-rectangle-xmark",
        "fz-24"
      );

      if (index !== 0) {
        newButton.appendChild(closeButton);
      }

      closeButton.addEventListener("click", function (event) {
        event.stopPropagation(); // Предотвращаем всплытие события на кнопке
        calculatorState.rooms.splice(index, 1);
        calculatorState.selectedRoom = Math.min(
          calculatorState.selectedRoom,
          calculatorState.rooms.length - 1
        ); // Устанавливаем новый активный индекс
        renderRoomButtons();
        renderRoomData();
      });

      newButton.addEventListener("click", function () {
        calculatorState.selectedRoom = index; // Обновляем индекс текущего выбранного помещения
        renderRoomData();

        // Удаляем класс btn-primary у предыдущей активной кнопки
        const previousActiveButton = document.querySelector(".btn.btn-primary");

        if (previousActiveButton) {
          previousActiveButton.classList.remove("btn-primary");
        }

        newButton.classList.add("btn-primary");
      });

      roomsList.appendChild(newButton);
    });
  }

  // Функция для отображения данных для выбранного помещения
  function renderRoomData() {
    const room = calculatorState.rooms[calculatorState.selectedRoom];
    // Отображаем данные для выбранного помещения
    document.getElementById("areaInput").value = room.area;
    document.getElementById("cornersInput").value = room.corners;
    document.getElementById("ventilationInput").value = room.ventilation;
    document.getElementById("luminariesInput").value = room.luminaries;
    document.getElementById("chandeliersInput").value = room.chandeliers;
    document.getElementById("pipesInput").value = room.pipes;

    // Функция для визуального обновления класса активности для кнопок табов
    function updateButtonClass(buttons, activeValue, activeClass) {
      for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        if (button.id === activeValue) {
          button.classList.add(activeClass);
        } else {
          button.classList.remove(activeClass);
        }
      }
    }

    // Обновляем данные о типе потолка
    updateButtonClass(
      document.querySelectorAll(".ceiling-type-btn"),
      room.ceilingType,
      "btn-primary"
    );

    // Обновляем данные о производителе
    updateButtonClass(
      document.querySelectorAll(".manufacturer-btn"),
      room.manufacturer,
      "btn-primary"
    );

    // Обновляем данные о типе конструкции
    updateButtonClass(
      document.querySelectorAll(".construction-type-btn"),
      room.constructionType,
      "btn-primary"
    );

    // Создаем массив объектов для каждой комнаты
    const roomsListData = calculatorState.rooms.map((room) => {
      return {
        name: room.name,
        totalPrice: 0,
      };
    });

    // Преобразуем массив объектов в строку HTML
    const roomsListHTML = roomsListData
      .map(
        (roomData) => `
        <li class="d-flex justify-content-between">
          <p>${roomData.name}</p>
          <span>${roomData.totalPrice} руб.</span>
        </li>
      `
      )
      .join("");

    // Вставляем строку HTML в элемент
    document.querySelector(".rooms-sum-list").innerHTML = roomsListHTML;

    console.log("rendered");
  }

  //
  // ===== ОБРАБОТЧИКИ НАЖАТИЯ =======================================
  //

  // "Добавить"
  addRoomBtn.addEventListener("click", function () {
    const newRoom = {
      name: `Помещение ${calculatorState.rooms.length + 1}`,
      area: 0,
      corners: 4,
      ventilation: 0,
      luminaries: 0,
      chandeliers: 0,
      pipes: 0,
      ceilingType: "PVC",
      manufacturer: "MSD-Premium",
      constructionType: "classic",
    };
    calculatorState.rooms.push(newRoom);
    console.log(calculatorState);

    calculatorState.selectedRoom = calculatorState.rooms.length - 1;
    renderRoomButtons();
    renderRoomData();
  });

  // "Очистить"
  removeRoomBtn.addEventListener("click", function () {
    calculatorState.rooms = [
      {
        name: "Помещение 1",
        area: 0,
        corners: 4,
        ventilation: 0,
        luminaries: 0,
        chandeliers: 0,
        pipes: 0,
        ceilingType: "PVC",
        manufacturer: "MSD-Premium",
        constructionType: "classic",
      },
    ];

    calculatorState.selectedRoom = 0;
    renderRoomButtons();
    renderRoomData();
  });

  // Выбор типа потолка
  ceilingTypeChooseTab.addEventListener("click", function (event) {
    if (event.target.classList.contains("ceiling-type-btn")) {
      const selectedCeilingType = event.target.id;
      calculatorState.rooms[calculatorState.selectedRoom].ceilingType =
        selectedCeilingType;
      renderRoomData();
    }
  });

  // Выбор производителя
  manufacturerChooseTab.addEventListener("click", function (event) {
    if (event.target.classList.contains("manufacturer-btn")) {
      const selectedManufacturer = event.target.id;
      calculatorState.rooms[calculatorState.selectedRoom].manufacturer =
        selectedManufacturer;
      renderRoomData();
    }
  });

  // Выбор типа конструкции
  constructionTypeChooseTab.addEventListener("click", function (event) {
    if (event.target.classList.contains("construction-type-btn")) {
      const selectedConstructionType = event.target.id;
      calculatorState.rooms[calculatorState.selectedRoom].constructionType =
        selectedConstructionType;
      renderRoomData();
    }

    console.log(calculatorState);
  });

  // Параметры помещения и дополнительные опции (6 inputs)
  darkInputs.forEach((input) => {
    input.addEventListener("input", function (event) {
      const newValue = parseFloat(event.target.value);
      if (isNaN(newValue)) {
        const inputId = event.target.id; // Получаем id инпута
        const stateKey = inputId.replace("Input", "").toLowerCase();
        event.target.placeholder = "Введите число";
        calculatorState.rooms[calculatorState.selectedRoom][stateKey] = 0;
      } else {
        const inputId = event.target.id; // Получаем id инпута
        const stateKey = inputId.replace("Input", "").toLowerCase(); // Получаем имя ключа в состоянии
        calculatorState.rooms[calculatorState.selectedRoom][stateKey] =
          newValue; // Обновляем состояние активного помещения
        renderRoomData();
      }
    });
  });

  //
  // ===== ПЕРВИЧНЫЙ РЕНДЕР КНОПОК И ПОМЕЩЕНИЙ ========================
  //

  renderRoomButtons();
  renderRoomData();
});
