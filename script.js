// Firebase (optional): replace with your config if needed
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase (optional)
try {
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  // Log visitor
  db.collection("visitors").add({
    visitedAt: new Date(),
    userAgent: navigator.userAgent,
    url: window.location.href
  });

  console.log("Visitor logged to Firebase");
} catch (err) {
  console.warn("Firebase not active.");
}

// Scroll animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
      observer.unobserve(entry.target);
    }
  });
});

document.querySelectorAll(".fade").forEach(section => {
  observer.observe(section);
});

// Contact form submit
document.getElementById("contact-form")?.addEventListener("submit", e => {
  e.preventDefault();
  alert("Thank you for reaching out! We'll get back to you soon.");
  e.target.reset();
});

// Comments system
const commentsKey = "gflow_comments";

function loadComments() {
  const saved = localStorage.getItem(commentsKey);
  if (saved) {
    const arr = JSON.parse(saved);
    const commentsDiv = document.getElementById("comments");
    commentsDiv.innerHTML = arr.map(c => `<p>${c}</p>`).join("");
  }
}

document.getElementById("comment-form")?.addEventListener("submit", e => {
  e.preventDefault();
  const comment = document.getElementById("user-comment").value;
  if (!comment) return;

  let arr = JSON.parse(localStorage.getItem(commentsKey) || "[]");
  arr.push(comment);
  localStorage.setItem(commentsKey, JSON.stringify(arr));
  document.getElementById("user-comment").value = "";
  loadComments();
});

loadComments();
