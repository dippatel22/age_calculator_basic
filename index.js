
document.addEventListener('DOMContentLoaded', () => {
    const birthDateInput = document.getElementById('birthDate');
    const currentDateInput = document.getElementById('currentDate');
    const calculateBtn = document.querySelector('.calculate-btn');
    const ageDisplay = document.getElementById('age');
    const errorDisplay = document.getElementById('error');

    calculateBtn.addEventListener('click', calculateAge);

    function calculateAge() {
        // Clear previous results and errors
        ageDisplay.textContent = '--';
        errorDisplay.textContent = '';

        const birthDateValue = birthDateInput.value;
        const currentDateValue = currentDateInput.value;

        // Validate input
        if (!birthDateValue || !currentDateValue) {
            displayError('Please select both birth date and current date.');
            return;
        }

        const birthDate = new Date(birthDateValue);
        const currentDate = new Date(currentDateValue);

        // Check for invalid dates
        if (isNaN(birthDate) || isNaN(currentDate)) {
            displayError('Please enter valid dates.');
            return;
        }

        // Check if birth date is in the future
        if (birthDate > currentDate) {
            displayError('Birth date cannot be in the future.');
            return;
        }

        // Calculate age
        let years = currentDate.getFullYear() - birthDate.getFullYear();
        let months = currentDate.getMonth() - birthDate.getMonth();
        let days = currentDate.getDate() - birthDate.getDate();

        // Adjust months and years if necessary
        if (days < 0) {
            months--;
            const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
            days += previousMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        // Final validation
        if (years < 0) {
            displayError('Please enter a valid birth date.');
            return;
        }

        // Display the result
        ageDisplay.textContent = `${years} years, ${months} months, ${days} days`;
    }

    function displayError(message) {
        errorDisplay.textContent = message;
    }
});
