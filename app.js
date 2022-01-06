// hides nav on scroll down
let prevScrollPosisiton = window.pageYOffset;
window.addEventListener("scroll", () => {
  let currentScrollPosition = window.pageYOffset;
  if (prevScrollPosisiton > currentScrollPosition) {
    document.querySelector("nav").style.top = "0";
  } else {
    let navHeight = document
      .querySelector("nav")
      .getBoundingClientRect().height;
    // opened menu navigation is 180px tall
    document.querySelector("nav").style.top = `-${navHeight + 180}px`;
  }
  prevScrollPosisiton = currentScrollPosition;
});

// also closes mobile menu when link is clicked
const menuLinks = [...document.getElementById("menu-links").children];
let navHeight = document.querySelector("nav").getBoundingClientRect().height;
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector("nav").style.top = `-${navHeight + 180}px`;
  });
});

// explore button bookmark
const button = document.querySelector(".button");
button.addEventListener("click", () => {
  let workSection = document.querySelector(".work-section");
  workSection.scrollIntoView();
});

// appear on scroll
// idk works fine but might be laggy on slower devices
const images = document.querySelectorAll("img");

window.addEventListener("scroll", showOnScroll);
function showOnScroll() {
  let screenPos = window.innerHeight;
  for (let i = 0; i < images.length; i++) {
    let imgPos = images[i].getBoundingClientRect().top;
    if (imgPos < screenPos) {
      images[i].classList.add("appear");
    } else {
      images[i].classList.remove("appear"); // optional
    }
  }
}

// menu toggle
const menuButton = document.querySelector(".menu");
const menu = document.querySelector(".menu-nav");

menuButton.addEventListener("click", () => {
  if (menu.classList.contains("open")) {
    menu.classList.remove("open");
    menu.classList.add("close");
  } else {
    menu.classList.remove("close");
    menu.classList.add("open");
  }
});

// open image
for (let i = 0; i < images.length; i++) {
  let imgFullUrl = images[i].getAttribute("src");
  images[i].addEventListener("click", function openImage() {
    if (window.innerWidth > 970) {
      let newImgWindow = document.createElement("div");
      document.body.appendChild(newImgWindow);
      newImgWindow.setAttribute("class", "window");
      newImgWindow.setAttribute("onclick", "closeImg()");

      let newImg = document.createElement("div");
      newImgWindow.appendChild(newImg);
      newImg.setAttribute("class", "image");
      newImg.style.backgroundImage = `url(${imgFullUrl})`;

      imgResize(newImg, i);
      document.body.style.overflow = "hidden";

      // create the cross for closing
      let cross = document.createElement("div");
      newImg.appendChild(cross);
      cross.setAttribute("class", "cross");
      cross.innerHTML = '<i class="fas fa-times"></i>';
      newImgWindow.addEventListener("click", closeImg);

      // create arrows
      jumpImage(newImg, i);
    }
  });
}

// close image
function closeImg(event) {
  let imgWindow = document.querySelector(".window");
  let cross = document.querySelector(".cross").children[0];
  let targetElement = event.target;

  // only closed if clicked outside the image or on cross
  if (targetElement == imgWindow || targetElement == cross) {
    imgWindow.remove();
    document.body.style.overflow = "scroll";
  }
}

// resizes image to its fit its aspect ratio
function imgResize(image, i) {
  if (i == 0 || i == 11 || i == 12 || i == 23) {
    image.style.width = "128vh";
    image.style.height = "96vh";
  } else {
    image.style.width = "64vh";
    image.style.height = "96vh";
  }
}

// prev or next image
function jumpImage(image, index) {
  let leftArrow = document.createElement("div");
  image.appendChild(leftArrow);
  leftArrow.setAttribute("class", "arrow");
  leftArrow.innerHTML = '<i class="fas fa-angle-double-left"></i>';
  leftArrow.addEventListener("click", () => {
    if (index == 0) {
      index = 23;
    } else {
      index--;
    }
    updatePicture(image, index);
  });

  let rightArrow = document.createElement("div");
  image.appendChild(rightArrow);
  rightArrow.setAttribute("class", "arrow");
  rightArrow.innerHTML = '<i class="fas fa-angle-double-right"></i>';
  rightArrow.addEventListener("click", () => {
    if (index == 23) {
      index = 0;
    } else {
      index++;
    }
    updatePicture(image, index);
  });
}

// updates bg url when arrow is clicked
function updatePicture(image, index) {
  image.style.backgroundImage =
    "url(./tattoo-pics/tattoo" + (index + 1) + ".jpg";
  imgResize(image, index);
}

// intro bg animation
const introBackground = document.querySelector(".intro-section");
let bgHeight = introBackground.getBoundingClientRect().height;
window.addEventListener("scroll", bgAnimate);

function bgAnimate() {
  let scrollPos = window.pageYOffset;
  if (scrollPos < bgHeight) {
    let moveAmount = scrollPos / 15 + 50;
    introBackground.style.backgroundPositionX = `left, ${moveAmount}%`;
  }
}

// Form
const form = document.querySelector("form");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const comments = document.getElementById("comments");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevents form from submitting
  checkInputs();
});

// validation
function checkInputs() {
  const fnameValue = fname.value.replace(/\\/g, ""); // removes backslashes
  const lnameValue = lname.value.replace(/\\/g, "");
  const phoneValue = phone.value.replace(/\\/g, "");
  const emailValue = email.value.replace(/\\/g, "");
  const commentsValue = comments.value.replace(/\\/g, "");

  // first name
  if (fnameValue === "") {
    setError(fname, "First name cannot be blank");
  } else if (!isName(fnameValue)) {
    setError(fname, "Letters and spaces only");
  } else {
    setSuccess(fname);
  }

  // last name
  if (lnameValue === "") {
    setError(lname, "Last name cannot be blank");
  } else if (!isName(lnameValue)) {
    setError(lname, "Letters and spaces only");
  } else {
    setSuccess(lname);
  }

  // phone
  if (phoneValue === "") {
    setError(phone, "Phone number cannot be blank");
  } else if (!isPhone(phoneValue)) {
    setError(phone, "Must be a valid phone number");
  } else {
    setSuccess(phone);
  }

  // email
  if (emailValue === "") {
    setError(email, "Email address cannot be blank");
  } else if (!isEmail(emailValue)) {
    setError(email, "Must be a valid email address");
  } else {
    setSuccess(email);
  }

  // comments
  if (!areComments(commentsValue) && commentsValue !== "") {
    setError(comments, "Comments cannot contain special symbols");
  } else {
    setSuccess(comments);
  }
}

// applies error styling
function setError(input, message) {
  const inputField = input.parentElement;
  const errorBox = inputField.querySelector(".error-message");
  inputField.className = "input-field error";
  errorBox.innerText = message;
}

// applies success styling
function setSuccess(input) {
  const inputField = input.parentElement;
  inputField.className = "input-field success";
}

// VALIDATION FUNCTIONS       all return true if matches regex
// name validation
function isName(input) {
  return /^[A-Za-z ]+$/.test(input);
}

// phone validation
function isPhone(input) {
  return /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(input);
}

// email validation
function isEmail(input) {
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    input
  );
}

// comments validation
function areComments(input) {
  return /^[0-9A-Za-z,;'\" !?.-]+$/.test(input);
}
