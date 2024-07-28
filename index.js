const languageChangeButton = document.querySelector(
  ".button-box .language-box"
);

languageChangeButton.addEventListener("mouseenter", () => {
  languageChangeButton.classList.add("hovered");
});

languageChangeButton.addEventListener("mouseleave", () => {
  languageChangeButton.classList.remove("hovered");
});

const languageChangeButtonFooter = document.querySelector(
  ".footer-top div:last-child"
);

languageChangeButtonFooter.addEventListener("mouseenter", (e) => {
  languageChangeButtonFooter.classList.add("hovered");
});

languageChangeButtonFooter.addEventListener("mouseleave", () => {
  languageChangeButtonFooter.classList.remove("hovered");
});

const navButtons = document.querySelectorAll(".header-nav button");

navButtons.forEach((button) =>
  button.addEventListener("click", (e) => {
    if (button.classList.contains("clicked")) {
      button.classList.remove("clicked");
    } else {
      navButtons.forEach((btn) => btn.classList.remove("clicked"));
      button.classList.add("clicked");
    }
    e.stopPropagation();
  })
);

document.addEventListener("click", (e) => {
  navButtons.forEach((btn) => btn.classList.remove("clicked"));
});

const cookieButton = document.querySelector(".cookie-box .cookie-text");
const cookieBox = cookieButton.parentElement;

function hasAcceptedCookies() {
  return localStorage.getItem("cookiesAccepted") === "true";
}

function setAcceptedCookies() {
  localStorage.setItem("cookiesAccepted", "true");
}

if (hasAcceptedCookies()) {
  cookieBox.classList.add("accept");
}

cookieButton.addEventListener("click", () => {
  setAcceptedCookies();
  cookieBox.classList.add("accept");
});

const dropdownToggles = document.querySelectorAll(".footer-dropdown-toggle");

dropdownToggles.forEach((toggle) => {
  toggle.addEventListener("click", function () {
    const isAlreadyClicked = this.classList.contains("clicked");

    dropdownToggles.forEach((item) => item.classList.remove("clicked"));

    if (!isAlreadyClicked) {
      this.classList.add("clicked");
    }
  });
});

const popUpMenu = document.querySelector(".popUp-menu");

popUpMenu.addEventListener("click", () => {
  popUpMenu.classList.toggle("clicked");
});

const hamburgerIcon = document.querySelector(".hamburger-menu-container");

const mainSection = document.querySelector(".main-content");

const footer = document.querySelector("footer");

hamburgerIcon.addEventListener("click", () => {
  hamburgerIcon.classList.toggle("clicked");
  mainSection.classList.toggle("hamburger-clicked");
  if (window.innerWidth <= 768) {
    footer.classList.toggle("clicked");
  }
});

const sideBarOverlay = document.querySelector(".sideBar-overlay");
const mailIcon = document.querySelector(".popUp-menu-dropdown .mail-icon ");
const sideBarCloseIcon = document.querySelector(".sidebar-close ");

mailIcon.addEventListener("click", () => {
  sideBarOverlay.classList.add("opened");
});

sideBarCloseIcon.addEventListener("click", () => {
  sideBarOverlay.classList.remove("opened");
});

const inputs = document.querySelectorAll(".sidebar-form input");

const textArea = document.querySelector(".textfield");

inputs.forEach((element) => {
  element.addEventListener("input", () => {
    if (element.value.length > 0) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  });
});

textArea.addEventListener("input", () => {
  if (textArea.value.length > 0) {
    textArea.classList.add("active");
  } else {
    textArea.classList.remove("active");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const htmlElement = document.documentElement;
  const bodyElement = document.body;

  let isScrolling;

  window.addEventListener("scroll", () => {
    window.clearTimeout(isScrolling);
    htmlElement.style.scrollbarColor = "#888 #f1f1f1"; // For Firefox
    bodyElement.style.setProperty("--scrollbar-opacity", "1"); // For WebKit

    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(() => {
      // Set the scrollbar to be hidden
      htmlElement.style.scrollbarColor = "transparent transparent"; // For Firefox
      bodyElement.style.setProperty("--scrollbar-opacity", "0"); // For WebKit
    }, 1000);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  const submitButton = document.getElementById("submitButton");

  const inputs = form.querySelectorAll("input, textarea");

  const checkboxes = form.querySelectorAll('input[type="checkbox"]');

  function validateInput(input) {
    const errorElement = document.getElementById(input.id + "Error");
    if (!input.checkValidity()) {
      input.parentElement.classList.add("error");
      errorElement.style.display = "block";
    } else {
      input.parentElement.classList.remove("error");
      errorElement.style.display = "none";
    }
  }

  function validateCheckbox(checkbox) {
    const errorElement = document.getElementById(checkbox.id + "Error");
    if (!checkbox.checked) {
      errorElement.style.display = "block";
    } else {
      errorElement.style.display = "none";
    }
  }

  function validateForm() {
    let isValid = true;
    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        isValid = false;
      }
    });
    checkboxes.forEach((checkbox) => {
      if (!checkbox.checked) {
        isValid = false;
      }
    });
    submitButton.disabled = !isValid;
  }

  function resetForm() {
    inputs.forEach((input) => {
      input.value = "";

      input.parentElement.classList.remove("error");

      const errorElement = document.getElementById(input.id + "Error");

      if (errorElement) {
        errorElement.style.display = "none";
      }
    });

    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;

      const errorElement = document.getElementById(checkbox.id + "Error");

      if (errorElement) {
        errorElement.style.display = "none";
      }
    });

    submitButton.disabled = true;
  }

  inputs.forEach((input) => {
    input.addEventListener("blur", () => validateInput(input));
  });

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => validateCheckbox(checkbox));
  });

  form.addEventListener("input", validateForm);

  form.addEventListener("change", validateForm);

  submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (form.checkValidity()) {
      console.log("Form data:", {
        fullName: document.getElementById("fullName").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        email: document.getElementById("email").value,
        company: document.getElementById("company").value,
        textfield: document.getElementById("textfield").value,
        agreeToTerms: document.getElementById("agreeToTerms").checked,
      });

      resetForm();
    }
  });
});

function initializeCarousel(prevId, nextId, carouselId, scrollAmount) {
  const prev = document.getElementById(prevId);
  const next = document.getElementById(nextId);
  const carousel = document.getElementById(carouselId);

  function updateArrowColors(activeArrow) {
    prev.classList.remove("active");
    next.classList.remove("active");

    prev.classList.add("inactive");
    next.classList.add("inactive");

    if (activeArrow === "prev") {
      next.classList.add("active");
      prev.classList.remove("inactive");
    } else if (activeArrow === "next") {
      prev.classList.add("active");
      next.classList.remove("inactive");
    }
  }

  prev.addEventListener("click", () => {
    carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    updateArrowColors("next");
  });

  next.addEventListener("click", () => {
    carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
    updateArrowColors("prev");
  });
}

initializeCarousel("prev", "next", "carousel", 700);

initializeCarousel("offers-prev", "offers-next", "offers-carousel", 100);
