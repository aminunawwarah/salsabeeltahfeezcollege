const studentNameField = document.querySelector('[student-name]');
const amountFieldField = document.querySelector('[payment-amount]');
const studentClassOptions = document.querySelector('[student-class]');
const radioButtons = document.querySelectorAll('input[type="radio"]');
const paymentButton = document.querySelector('[make-payment]');
const viewCalendarButton = document.querySelector('[view-calendar]');
const calendarLink = document.createElement('a');

var selected;
var paymentChoice;

calendarLink.target = '_blank';
calendarLink.href = 'calendars/CALENDAR FOR FIRST TERM (STAFF).pdf';
viewCalendarButton.addEventListener('click', () => {
    calendarLink.click();
});

radioButtons.forEach(radioButton => {
    radioButton.addEventListener('click', (arg) => {
        paymentChoice = arg.target.value;
        selected = true;
    });
});

paymentButton.addEventListener('click', () => {
    const studentName = studentNameField.value.toLowerCase();
    const amountPaid = amountFieldField.value;
    const studentClass = studentClassOptions.value;

    if ((!studentName) || (!amountPaid) || (!studentClass) || (!selected))
        alert('Please provide all information.');
    else {
        fetch('payment', {
            method: 'POST',
            body: JSON.stringify({ studentName, studentClass, amountPaid, paymentChoice }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json()).then(({ submitted }) => {
            if (submitted)
                alert('Payment successfully updated!');
            else
                alert('Submission failed. Check the information you provided.');
        })
        .catch(() => { throw new Error('Failed to make the payment.') });
    }
});