const cmd = document.getElementById("cmd-text");
const copyBtn = document.getElementById("copy");
const statusEl = document.getElementById("copy-status");

copyBtn.addEventListener("click", async () => {
  const text = cmd.textContent;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.left = "-999px";
      document.body.append(field);
      field.select();
      const ok = document.execCommand("copy");
      field.remove();
      if (!ok) throw new Error("copy");
    }
    statusEl.textContent = "Copied.";
    copyBtn.textContent = "Copied";
  } catch {
    statusEl.textContent = "Copy failed. Select the command.";
  }
});
