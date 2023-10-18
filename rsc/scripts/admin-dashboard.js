const sendMessageButton = document.querySelector('[send-message]');
const messageBox = document.querySelector('textarea');
const user = document.querySelector('[user]');
const recipientField = document.querySelector('[recipient-field]');
const radioButtons = document.querySelectorAll('input[type="radio"]');

var type;
var selected;

radioButtons.forEach(button => {
    button.addEventListener('click', (arg) => {
        type = arg.target.value;
        selected = true;
    });
});

sendMessageButton.addEventListener('click', () => {
    const message = messageBox.value;
    const recipientName = recipientField.value.toLowerCase();
    
    if ((!message) || (!selected) || (!recipientName))
        alert('All the fields are required. Fill them please.');
    else {
        sendMessageButton.style.pointerEvents = 'none';
        
        fetch('message', {
            method: 'POST',
            body: JSON.stringify({ recipientName, type, message }),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        }).then(res => res.json()).then(({ sent }) => {
            if (!sent)
                alert('The message was not sent because the recipient could not be found.');
            else
                alert('Message was sent successfully.');
            sendMessageButton.style.pointerEvents = 'all';
        })
        .catch(() => { throw new Error('Error') });
    }
})