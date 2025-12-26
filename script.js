const conversionSelect = document.getElementById("conversion");

const options = {
  currency: [
    { v: "USD-INR", t: "USD → INR" },
    { v: "INR-USD", t: "INR → USD" }
  ],
  length: [
    { v: "m-km", t: "Meters → Kilometers" },
    { v: "km-m", t: "Kilometers → Meters" }
  ],
  weight: [
    { v: "kg-g", t: "Kilograms → Grams" },
    { v: "g-kg", t: "Grams → Kilograms" }
  ],
  temperature: [
    { v: "c-f", t: "Celsius → Fahrenheit" },
    { v: "f-c", t: "Fahrenheit → Celsius" }
  ],
  time: [
    { v: "hr-min", t: "Hours → Minutes" },
    { v: "min-hr", t: "Minutes → Hours" }
  ]
};

let cachedRate = null;

updateOptions();

function updateOptions() {
  const cat = document.getElementById("category").value;
  conversionSelect.innerHTML = "";
  options[cat].forEach(o => {
    const opt = document.createElement("option");
    opt.value = o.v;
    opt.textContent = o.t;
    conversionSelect.appendChild(opt);
  });
}

async function getRate() {
  if (cachedRate) return cachedRate;
  const res = await fetch("https://api.frankfurter.app/latest?from=USD&to=INR");
  const data = await res.json();
  cachedRate = data.rates.INR;
  return cachedRate;
}

async function convert() {
  const val = parseFloat(document.getElementById("value").value);
  const cat = document.getElementById("category").value;
  const type = conversionSelect.value;
  const out = document.getElementById("output");
  const rate = document.getElementById("rate");
  const time = document.getElementById("time");

  if (isNaN(val)) {
    out.textContent = "Invalid input";
    return;
  }

  let result = "";

  if (cat === "currency") {
    const r = await getRate();
    if (type === "USD-INR") result = `${(val * r).toFixed(2)} INR`;
    else result = `${(val / r).toFixed(4)} USD`;
    rate.textContent = `Live USD–INR rate`;
  }

  if (cat === "length") {
    result = type === "m-km"
      ? `${val / 1000} km`
      : `${val * 1000} m`;
  }

  if (cat === "weight") {
    result = type === "kg-g"
      ? `${val * 1000} g`
      : `${val / 1000} kg`;
  }

  if (cat === "temperature") {
    result = type === "c-f"
      ? `${(val * 9/5 + 32).toFixed(2)} °F`
      : `${((val - 32) * 5/9).toFixed(2)} °C`;
  }

  if (cat === "time") {
    result = type === "hr-min"
      ? `${val * 60} min`
      : `${val / 60} hr`;
  }

  out.textContent = result;
  time.textContent = `Updated at ${new Date().toLocaleTimeString()}`;
}
