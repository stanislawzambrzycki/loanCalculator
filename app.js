// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    // Hide Results
    document.getElementById('results').style.display = 'none';
    // Show Loader 
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculeteResults, 1000);
    e.preventDefault();
});

// Calculate Results
function calculeteResults(){
    // UI Vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('intrest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = (((monthly * calculatedPayments)- principal.toFixed(2)).toFixed(2));
        //Show Results & Hide Loader
        document.getElementById('loading').style.display = 'none';
        document.getElementById('results').style.display = 'block';
    } else {
        showError('Please check your numbers')
        document.getElementById('loading').style.display = 'none';
    }
    
    
}

// Show Error
function showError(error){
    // Create a div
    const errorDiv = document.createElement('div');

    //Get elements
    const btnParent = document.getElementById('btnParent');
    // const btn = document.querySelector('.btn-dark');
    
    // Add class 
    errorDiv.className = 'alert alert-danger mt-4';

    // Create tex node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error under button
    // btnParent.insertBefore(errorDiv, btn);
    btnParent.appendChild(errorDiv);

    // Clear error message after 1.5s(1500 miliseconds)
    setTimeout(clearError, 1500);
}

// Clear Error
function clearError(){
    document.querySelector('.alert').remove();
}