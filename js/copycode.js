const codeBlocks = document.querySelectorAll("pre:has(code)");

codeBlocks.forEach((block) => {
  // only add button if browser supports Clipboard API
  if (!navigator.clipboard) return;

  const button = document.createElement("button");
  button.setAttribute("title", "copy code");
  button.setAttribute("aria-label","click to copy code");
  block.appendChild(button);
  block.setAttribute("tabindex", 0); //add keyboard a11y for <pre></pre> 

  button.addEventListener("click", async () => {
    await copyCode(block, button);
  });

});

async function copyCode(block, button) {
    const code = block.querySelector("code");
    const text = code.innerText;

    try {
      // success UI update
      await navigator.clipboard.writeText(text);
      // screen reader will  announce text is copied to clipboard
      button.setAttribute("aria-live", "polite");
      button.setAttribute("aria-label","code is copied!"); 
      button.classList.add("copied");

      // remove previous timer on multiple clicks (data-timer-id)
      if (button.dataset.timerId) clearTimeout(button.dataset.timerId);
      
      const timer = setTimeout(() => {
        button.classList.remove("copied");
        button.setAttribute("aria-label","click to copy code");
      }, 1000);

      button.dataset.timerId = timer;
    }catch{
      //  failed UI update
      // screen reader will  announce text is copied to clipboard
      button.setAttribute("aria-live", "polite");
      button.setAttribute("aria-label","failed!"); 
      button.classList.add("failed");

      // remove previous timer on multiple clicks (data-timer-id)
      if (button.dataset.timerId) clearTimeout(button.dataset.timerId);
      
      const timer = setTimeout(() => {
        button.classList.remove("failed");
        button.setAttribute("aria-label","click to copy code");
      }, 1000);


      button.dataset.timerId = timer;
    }
  };
