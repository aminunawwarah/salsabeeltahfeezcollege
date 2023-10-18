const radioButtons = document.querySelectorAll('input[type="radio"]');
const recipientField = document.querySelector('[recipient-field]');
const messageTextArea = document.querySelector('textarea');
const sendButton = document.querySelector('[send-message]');
const studentNameField = document.querySelector('[student-name]');
const studentClassField = document.querySelector('[student-class]');
const studentParentField = document.querySelector('[student-parent]');
const removeStudentButton = document.querySelector('[remove-student]');
const viewCalendarButton = document.querySelector('[view-calendar]');
const usernameField = document.querySelector('[username]');
const options = document.querySelector('[options]');
const removeUserButton = document.querySelector('[remove-user]');
const calendarLink = document.createElement('a');

var type;
var selected;

calendarLink.target = '_blank';
calendarLink.href = 'calendars/CALENDAR FOR FIRST TERM (STAFF).pdf';
viewCalendarButton.addEventListener('click', () => {
    calendarLink.click();
});

radioButtons.forEach(button => {
    button.addEventListener('click', (arg) => {
        type = arg.target.value.toLowerCase();
        selected = true;
    });
});

sendButton.addEventListener('click', () => {
    const recipientName = recipientField.value.toLowerCase();
    const message = messageTextArea.value;

    if ((!message) || (!selected) || (!recipientName))
        alert('All the fields are required. Fill them please.');
    else {
        sendButton.style.pointerEvents = 'none';
        
        fetch('message', {
            method: 'POST',
            body: JSON.stringify({ recipientName, type, message }),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        }).then(res => res.json()).then(({ sent }) => {
            if (!sent)
                alert('The message was not sent because the recipient could not be found.');
            else
                alert('Message was sent successfully.');
            sendButton.style.pointerEvents = 'all';
        })
        .catch(err => { throw new Error('Error') });
    }  
});

removeStudentButton.addEventListener('click', () => {
    const studentName = studentNameField.value.toLowerCase();
    const studentClass = studentClassField.value;
    const studentParent = studentParentField.value.toLowerCase();

    if ((!studentName) || (!studentParent))
        alert('All the fields are required. Provide the required information in the fields.');
    else {
        removeStudentButton.style.pointerEvents = 'none';
        fetch('remove_student', {
            method: 'POST',
            body: JSON.stringify({ studentName, studentClass, studentParent }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json()).then(({ exists, text }) => {
            if (!exists)
                alert(text);
            else 
                alert(text);
        }).catch(err => alert(err));
        removeStudentButton.style.pointerEvents = 'all';
    }
});

removeUserButton.addEventListener('click', () => {
    const username = usernameField.value.toLowerCase();
    const option = options.value.toLowerCase();

    removeUserButton.style.pointerEvents = 'none';

    if ((!username))
        alert('Please enter the username.');
    else {
        fetch('remove_user', {
            method: 'POST',
            body: JSON.stringify({ username, option }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json()).then(({ removed }) => {
            if (!removed)
                alert('Removal failed. Check the information you provide.');
            else
                alert('Removal successful!');
        });
    }

    removeUserButton.style.pointerEvents = 'all';
});