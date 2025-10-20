const taxableRate = 0.78;
const inpsRate = 0.26;
const irpefRate = 0.15;

function calc(gross) {
  let taxableIncome = gross * taxableRate;
  let inps = taxableIncome * inpsRate;
  let irpef = taxableIncome * irpefRate;
  let taxes = inps + irpef;
  let net = gross - taxes;
  let storeMonthly = `Each month you should store away: ${Math.ceil(
    taxes / 12
  )}€`;
  return {
    net,
    storeMonthly,
    taxes,
    inps,
    irpef,
  };
}

// This function handles ALL display updates
function updateDisplay(gross) {
  // Use the gross parameter that's passed in, not a hardcoded number
  let result = calc(gross);
  
  // Format all the numbers - do this INSIDE the function
  let message = result.storeMonthly;
  let netNumber = result.net.toLocaleString('it-IT', {
    style: 'currency',
    currency: 'EUR',
  });
  let taxesNumber = result.taxes.toLocaleString('it-IT', {
    style: 'currency',
    currency: 'EUR',
  });
  let inpsNumber = result.inps.toLocaleString('it-IT', {
    style: 'currency',
    currency: 'EUR',
  });
  let irpefNumber = result.irpef.toLocaleString('it-IT', {
    style: 'currency',
    currency: 'EUR',
  });
  
  // Update the DOM - also INSIDE the function
  document.querySelector('#header').innerHTML = message;
  document.querySelector('#net').innerHTML = netNumber;
  document.querySelector('#taxes').innerHTML = taxesNumber;
  document.querySelector('#inps').innerHTML = inpsNumber;
  document.querySelector('#irpef').innerHTML = irpefNumber;
}

// Get the input element (make sure your HTML has id="input-field")
const input = document.querySelector('#input-field');

// Display initial calculation
updateDisplay(30000);

// Listen for changes and recalculate
input.addEventListener('input', function(e) {
  const grossValue = parseFloat(e.target.value);
  updateDisplay(grossValue);
});