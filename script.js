const text = "Web Development Vanilla JavaScript";
const typewriter = document.getElementById("typewriter");
const cursor = document.querySelector(".cursor");
let i = 0;

function type() {
  if (i < text.length) {
    const span = document.createTextNode(text.charAt(i));
    typewriter.insertBefore(span, cursor);
    i++;
    setTimeout(type, 100);
  }
}

type();
