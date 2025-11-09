const convertBtn = document.getElementById("convert");
const valueInput = document.getElementById("value");
const typeSelect = document.getElementById("type");
const resultDiv = document.getElementById("result");

let usdToInr = 83; // default rate

// 🪙 Fetch live currency rate
async function updateLiveRate() {
  try {
    const res = await fetch("https://api.frankfurter.app/latest?from=USD&to=INR");
    const data = await res.json();
    usdToInr = data.rates.INR;
    console.log(`💱 Live rate loaded: 1 USD = ₹${usdToInr}`);
  } catch (err) {
    console.warn("⚠️ Could not fetch live rate, using default 83.");
  }
}

updateLiveRate();

convertBtn.addEventListener("click", () => {
  const val = parseFloat(valueInput.value);
  const type = typeSelect.value;

  if (isNaN(val)) {
    resultDiv.textContent = "⚠️ Please enter a valid number!";
    return;
  }

  let result = "";

  switch (type) {
    case "km-miles": result = `${val} km = ${(val * 0.621371).toFixed(4)} miles`; break;
    case "miles-km": result = `${val} miles = ${(val / 0.621371).toFixed(4)} km`; break;
    case "m-cm": result = `${val} m = ${(val * 100).toFixed(2)} cm`; break;
    case "cm-m": result = `${val} cm = ${(val / 100).toFixed(2)} m`; break;
    case "kg-lbs": result = `${val} kg = ${(val * 2.20462).toFixed(4)} lbs`; break;
    case "lbs-kg": result = `${val} lbs = ${(val / 2.20462).toFixed(4)} kg`; break;
    case "c-f": result = `${val}°C = ${((val * 9/5) + 32).toFixed(2)}°F`; break;
    case "f-c": result = `${val}°F = ${((val - 32) * 5/9).toFixed(2)}°C`; break;
    case "inr-usd": result = `₹${val} = $${(val / usdToInr).toFixed(4)} USD`; break;
    case "usd-inr": result = `$${val} = ₹${(val * usdToInr).toFixed(2)} INR`; break;
    default: result = "❌ Conversion not supported.";
  }

  resultDiv.textContent = result;
});


