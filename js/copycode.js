const codeBlocks = document.querySelectorAll("pre:has(code)");

codeBlocks.forEach((block) => {
  // Only add button if browser supports Clipboard API
  if (!navigator.clipboard) return;

  const button = createCopyButton();
  block.appendChild(button);
  block.setAttribute("tabindex", 0); // Add keyboard a11y for <pre></pre>

  button.addEventListener("click", async () => {
    await copyCode(block, button);
  });
});

function createCopyButton() {
  const button = document.createElement("button");
  setButtonAttributes(button, {
    type: "button", // button doesn't act as a submit button
    title: "copy code",
    "aria-label": "click to copy code",
  });
  return button;
}

function setButtonAttributes(button, attributes) {
  for (const [key, value] of Object.entries(attributes)) {
    button.setAttribute(key, value);
  }
}

async function copyCode(block, button) {
  const code = block.querySelector("code");
  const text = code.innerText;

  try {
    await navigator.clipboard.writeText(text);
    updateButtonState(button, "copied", "code is copied!");
  } catch {
    updateButtonState(button, "failed", "failed!");
  }
}

function updateButtonState(button, statusClass, ariaLabel) {
  button.setAttribute("aria-live", "polite");
  button.setAttribute("aria-label", ariaLabel);
  button.classList.add(statusClass);

  // Clear any existing timer
  if (button.dataset.timerId) clearTimeout(button.dataset.timerId);

  const timer = setTimeout(() => {
    button.classList.remove(statusClass);
    button.setAttribute("aria-label", "click to copy code");
  }, 1000);

  button.dataset.timerId = timer;
}
