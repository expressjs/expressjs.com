const blocks = document.querySelectorAll("pre:has(code)");
const copyButtonLabel = "Copy Code";


blocks.forEach((block) => {
  // only add button if browser supports Clipboard API
  if (navigator.clipboard) {
    const button = document.createElement("button");
    button.innerText = copyButtonLabel;
    block.appendChild(button);
    block.setAttribute("tabindex", 0); //add keyboard a11y for pre 

    button.addEventListener("click", async () => {
      await copyCode(block, button);
    });
  }
});

async function copyCode(block, button) {
    const code = block.querySelector("code");
    const text = code.innerText;
  
    await navigator.clipboard.writeText(text);
  
    // visual feedback that task is completed
    button.innerText = "✔ Copied!";
    button.setAttribute("aria-live", "polite"); // screen reader will  announce text is copied to clipboard
  
    const timer = setTimeout(() => {
      button.innerText = copyButtonLabel;
    }, 1000);

    // remove previous timer on multiple clicks
    button.dataset.timerId && clearTimeout(button.dataset.timerId); 
    button.dataset.timerId = timer;
  };