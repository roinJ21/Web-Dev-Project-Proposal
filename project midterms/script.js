function showMessage(message) {
    document.getElementById("content").innerText = message;
  }
  
  function toggleLogin() {
    const modal = document.getElementById("loginModal");
    modal.style.display = modal.style.display === "flex" ? "none" : "flex";
  }
  
  function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("active");
  }
  
  function validateForm(event) {
    event.preventDefault();
  
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const date = document.getElementById("date").value;
    const petType = document.getElementById("petType").value.trim();
    const reason = document.getElementById("reason").value.trim();
    const messageEl = document.getElementById("formMessage");
  
    if (!name || !email || !date || !petType || !reason) {
      displayFormMessage(messageEl, "Error: All fields must be filled out.", "red");
      return false;
    }
  
    if (!isValidEmail(email)) {
      displayFormMessage(messageEl, "Error: Invalid email format.", "red");
      return false;
    }
  
    if (!isValidDate(date)) {
      displayFormMessage(messageEl, "Error: Date must be in YYYY-MM-DD format.", "red");
      return false;
    }
  
    displayFormMessage(messageEl, "Success: Booking submitted!", "green");
    return true;
  }
  
  function displayFormMessage(element, message, color) {
    element.style.color = color;
    element.innerText = message;
  }
  
  function isValidEmail(email) {
    return /^[\\w.-]+@[\\w.-]+\\.\\w{2,}$/.test(email);
  }
  
  function isValidDate(date) {
    return /^\\d{4}-\\d{2}-\\d{2}$/.test(date);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-link");  //  Use .nav-link
  
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
  
        const targetSection = document.querySelector(link.getAttribute("href")); //  Direct select
  
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 50,  //  Offset for header
            behavior: "smooth",
          });
  
          navLinks.forEach((navLink) => navLink.classList.remove("active"));
          link.classList.add("active");
  
          if (window.innerWidth < 768) {
            toggleMenu();
          }
        }
      });
    });
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute("id");
            navLinks.forEach((navLink) => {
              navLink.classList.remove("active");
              if (navLink.getAttribute("href") === `#${sectionId}`) {
                navLink.classList.add("active");
              }
            });
          }
        });
      },
      {
        threshold: 0.5,  //  Adjust as needed
      }
    );
  
    document.querySelectorAll("section").forEach((section) => {
      observer.observe(section);
    });
  });