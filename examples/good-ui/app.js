const SAMPLE = [
  {
    id: "layout.8pt",
    sev: "error",
    layer: "L1",
    text: "Example: a list with gap: 13px. Nearest 8pt value is 16px.",
  },
  {
    id: "l1.a11y.text-contrast",
    sev: "error",
    layer: "L1",
    text: "Example: helper copy #9a9588 on #f3efe6 is 2.60:1. Body text needs 4.5:1.",
  },
  {
    id: "cta.hierarchy",
    sev: "warning",
    layer: "L2",
    text: "Example: Run and Clear were both filled. Clear should be an outline.",
  },
  {
    id: "control.dropdown-count",
    sev: "warning",
    layer: "L2",
    text: "Example: layer filter was a 4-item dropdown. Four options belong on chips.",
  },
  {
    id: "composition.cardification",
    sev: "warning",
    layer: "L3",
    text: "Example: each finding sat in its own card. A divider is enough.",
  },
];

const form = document.getElementById("scan-form");
const runBtn = document.getElementById("run");
const clearBtn = document.getElementById("clear");
const failBtn = document.getElementById("fail");
const statusEl = document.getElementById("status");
const listEl = document.getElementById("list");
const countEl = document.getElementById("count");
const emptyLayerEl = document.getElementById("empty-layer");
const findingsEl = document.getElementById("findings");

let rows = [];
let ticking = false;

function layerValue() {
  const picked = form.querySelector('input[name="layer"]:checked');
  return picked ? picked.value : "all";
}

function setStatus(text, isError) {
  statusEl.textContent = text;
  statusEl.classList.toggle("is-error", Boolean(isError));
}

function selectedCount() {
  return rows.filter((row) => row.checked).length;
}

function visibleRows() {
  const layer = layerValue();
  return rows.filter((row) => layer === "all" || row.layer === layer);
}

function render() {
  const visible = visibleRows();
  listEl.replaceChildren();

  if (ticking) {
    countEl.hidden = true;
    emptyLayerEl.hidden = true;
    return;
  }

  if (!rows.length) {
    countEl.hidden = true;
    emptyLayerEl.hidden = true;
    return;
  }

  if (!visible.length) {
    countEl.hidden = true;
    emptyLayerEl.hidden = false;
    return;
  }

  emptyLayerEl.hidden = true;

  visible.forEach((row) => {
    const li = document.createElement("li");
    li.className = "finding";
    if (row.checked) li.classList.add("is-checked");

    const label = document.createElement("label");
    const box = document.createElement("input");
    box.type = "checkbox";
    box.checked = row.checked;
    box.addEventListener("change", () => {
      row.checked = box.checked;
      render();
    });

    const num = document.createElement("span");
    num.className = "num";
    num.textContent = String(row.n).padStart(2, "0");

    const text = document.createElement("p");
    text.textContent = row.text;

    const meta = document.createElement("span");
    meta.className = "meta";
    const sev = document.createElement("span");
    sev.className = `sev-${row.sev}`;
    sev.textContent = row.sev;
    meta.append(row.id, " · ", sev, " · ", row.layer);

    label.append(box, num, text, meta);
    li.append(label);
    listEl.append(li);
  });

  const n = selectedCount();
  countEl.hidden = false;
  countEl.textContent =
    n === 0 ? `${visible.length} in this layer` : `${n} selected`;
}

function idle(message) {
  rows = [];
  ticking = false;
  runBtn.disabled = false;
  findingsEl.removeAttribute("aria-busy");
  setStatus(message, false);
  render();
}

function startLoad() {
  rows = [];
  ticking = true;
  runBtn.disabled = true;
  findingsEl.setAttribute("aria-busy", "true");
  setStatus("Loading samples.", false);
  render();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  startLoad();
  window.setTimeout(() => {
    rows = SAMPLE.map((item, index) => ({
      ...item,
      n: index + 1,
      checked: false,
    }));
    ticking = false;
    runBtn.disabled = false;
    findingsEl.removeAttribute("aria-busy");
    setStatus("Samples loaded.");
    render();
  }, 400);
});

clearBtn.addEventListener("click", () => {
  idle("No scan yet.");
});

failBtn.addEventListener("click", () => {
  rows = [];
  ticking = false;
  runBtn.disabled = false;
  findingsEl.removeAttribute("aria-busy");
  setStatus("The sample scan failed. Run it again.", true);
  render();
});

form.addEventListener("change", (event) => {
  if (event.target.name === "layer") render();
});
