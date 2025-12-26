function convertUnit() {
  const value = parseFloat(document.getElementById("inputValue").value);
  const type = document.getElementById("conversionType").value;
  const result = document.getElementById("resultValue");

  if (isNaN(value)) {
    result.innerText = "Enter a valid number";
    return;
  }

  let output;

  switch (type) {

    /* Length */
    case "km-m":
      output = value * 1000 + " meters";
      break;
    case "km-mi":
      output = (value * 0.621371).toFixed(3) + " miles";
      break;
    case "m-km":
      output = (value / 1000).toFixed(3) + " km";
      break;

    /* Weight */
    case "kg-g":
      output = value * 1000 + " grams";
      break;
    case "kg-lb":
      output = (value * 2.20462).toFixed(2) + " lbs";
      break;
    case "lb-kg":
      output = (value / 2.20462).toFixed(2) + " kg";
      break;

    /* Temperature */
    case "c-f":
      output = ((value * 9/5) + 32).toFixed(1) + " °F";
      break;
    case "f-c":
      output = ((value - 32) * 5/9).toFixed(1) + " °C";
      break;

    /* Currency (static rate) */
    case "usd-inr":
      output = "₹ " + (value * 83.0).toFixed(2);
      break;
    case "inr-usd":
      output = "$ " + (value / 83.0).toFixed(2);
      break;

    /* Time */
    case "hr-min":
      output = value * 60 + " minutes";
      break;
    case "min-sec":
      output = value * 60 + " seconds";
      break;

    default:
      output = "Conversion not supported";
  }

  result.innerText = output;
}
