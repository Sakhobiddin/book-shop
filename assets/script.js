window.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".container");
  // Main section started
  let main = document.createElement("div"),
    title = document.createElement("div"),
    btn = document.createElement("div");

  main.classList.add("hero-section");
  title.classList.add("title");
  btn.classList.add("btn");

  main.innerHTML = `<img src="https://media.wired.com/photos/5955c3573ff99d6b3a1d165c/master/pass/books.jpg">`;
  title.innerHTML = `<h1>Welcome to amazing book shop</h1>`;
  btn.innerHTML = `<button><a href="#">Learn more</a></button>`;

  container.append(main);
  main.append(title);
  title.append(btn);

  // Main section ended

  // Card section starred
  let catalog = document.createElement("div"),
    heading = document.createElement("h2"),
    bookCards = document.createElement("div"),
    modal = document.createElement("div"),
    cartBtn = document.createElement("button");

  heading.textContent = "Book Catalog";

  catalog.classList.add("catalog");
  bookCards.classList.add("book-cards");
  modal.classList.add("modal-btn");

  container.appendChild(catalog);
  catalog.appendChild(heading);
  catalog.appendChild(bookCards);
  catalog.appendChild(modal);
  modal.appendChild(cartBtn);

  // opening cards
  cartBtn.textContent = "Your Books";
  modal.style.display = "none";
  // opening cards

  // Card section ended

  // Fetch Api
  fetch("./book.json")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      data.map((user) => {
        const markup = `
          <div class="card">
          <div class="card-img">
          <img src=${user.imageLink}>
          </div>
          <div class="card-details">
          <h2>${user.author}</h2>
          <h4>${user.title}</h4>
          <p>${user.price} $</p>
          <div class="card-btn">
          <a class="showMore" href="#show">Show more</a>
          <button class="add-btn">Add to bag</button>
          </div>
          </div>
          </div>
          `;
        bookCards.insertAdjacentHTML("beforeend", markup);
      });

      // Fetch Api

      // Show More section
      let showMore = document.querySelectorAll(".showMore");
      showMore.forEach(function (show, i) {
        show.addEventListener("click", function () {
          let showModal = document.createElement("div");
          showModal.classList.add("show-modal");
          bookCards.appendChild(showModal);

          fetch("./book.json")
            .then((res) => res.json())
            .then((data) => {
              data.map((user, index) => {
                let desc = `
              <div class="show-head">
                <h2>${user.author}</h2>
                <button class="times">&times;</button>
              </div>
              <p>${user.description}</p>
            `;
                if (i === index) {
                  return showModal.insertAdjacentHTML("beforeend", desc);
                } else {
                  return "";
                }
              });
              let times = document.querySelector(".times");
              times.addEventListener("click", () => {
                showModal.style.display = "none";
              });
            });
        });
      });
      // Show More section

      // Add to bag section
      function bookCarts() {
        let field = document.createElement("div"),
          carts = document.createElement("div"),
          intro = document.createElement("div"),
          head = document.createElement("h3"),
          closeBtn = document.createElement("button"),
          confirmOrder = document.createElement("div"),
          confirm = document.createElement("button");

        field.classList.add("cart-field");
        carts.classList.add("carts");
        intro.classList.add("cart-intro");
        closeBtn.classList.add("close-btn");
        confirmOrder.classList.add("confirm-order");
        confirm.classList.add("confirm");

        head.textContent = "Order Book";
        closeBtn.innerHTML = `&times;`;

        container.appendChild(field);
        field.appendChild(intro);
        intro.appendChild(head);
        intro.appendChild(closeBtn);
        field.appendChild(carts);
        field.appendChild(confirmOrder);
        confirmOrder.appendChild(confirm);
      }
      bookCarts();

      const field = document.querySelector(".cart-field"),
        carts = document.querySelector(".carts");
      closeBtn = document.querySelector(".close-btn");

      cartBtn.addEventListener("click", () => {
        field.style.display = "block";
        catalog.style.display = "none";
      });

      closeBtn.addEventListener("click", () => {
        field.style.display = "none";
        catalog.style.display = "block";
      });

      let btns = document.querySelectorAll(".add-btn");
      btns.forEach((btn, i) => {
        btn.addEventListener("click", function () {
          // opening cards
          modal.style.display = "block";
          // opening cards

          fetch("./book.json")
            .then((res) => res.json())
            .then((data) => {
              data.map((user, index) => {
                const cardBook = `
        <div class="card" id="catalog" key=${index}>
          <div class="card-img">
            <img src=${user.imageLink}>
          </div>
          <div class="card-details">
            <h2>${user.author}</h2>
          </div>
          <p>${user.price} $</p>
        </div>
      `;

                if (i === index) {
                  return carts.insertAdjacentHTML("beforeend", cardBook);
                } else {
                  return "";
                }
              });
            });
        });
      });
      // Add to bag section ended

      // Delivery form section
      let delivery = document.querySelector(".contact-form"),
        confirm = document.querySelector(".confirm");
      confirm.textContent = "Confirm Order";
      closeDelivery = document.querySelector(".close-delivery");

      confirm.addEventListener("click", function () {
        delivery.style.display = "block";
        field.style.display = "none";
        catalog.style.display = "none";
      });

      closeDelivery.addEventListener("click", function () {
        delivery.style.display = "none";
        catalog.style.display = "block";
      });

      // Form Validation
      // Selectors
      const submitBtn = document.querySelector(".complete-btn");
      // Selectors

      function validate() {
        let regName = /^[a-zA-Z]+$/,
          name = document.getElementById("fname").value;
        if (!regName.test(name)) {
          document.querySelector(
            ".error"
          ).innerHTML = `<h6>Please Enter Your Name</h6>`;
          document.getElementById("fname").focus();
          return false;
        } else {
          document.querySelector(".error").innerHTML = ``;
          return true;
        }
      }

      submitBtn.addEventListener("click", () => {
        validate();
      });
      // Form Validation

      // Delivery form section ended
    });
});
