import { TEXT_TO_TYPE } from "../constants.js";

export default (function () {
  const typewriter = document.getElementById("typewriter");
  const textCursor = typewriter.querySelector(".text-cursor");
  let i = 0;
  let displayedText = "";

  function typeWriting() {
    if (i >= TEXT_TO_TYPE.length) return;
    displayedText += TEXT_TO_TYPE.charAt(i);
    typewriter.textContent = displayedText;
    typewriter.appendChild(textCursor);
    i++;
    setTimeout(typeWriting, 100);
  }

  typeWriting();
})();
