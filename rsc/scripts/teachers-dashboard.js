const calendarLink = document.createElement('a');
const filenameText = document.querySelector('[filename]');
const uploadFileButton = document.querySelector('[upload-file]');
const selectFileButton = document.querySelector('[select-file]');
const uploadField = document.querySelector('[upload-field]');
const viewCalendarButton = document.querySelector('[view-calendar]');
var selectedFile;

calendarLink.target = '_blank';
calendarLink.href = 'calendars/CALENDAR FOR FIRST TERM (STAFF).pdf';
viewCalendarButton.addEventListener('click', () => {
    calendarLink.click();
});

selectFileButton.addEventListener('click', () => {
    uploadField.click();
});

uploadFileButton.addEventListener('click', () => {
    if (!selectedFile)
        alert('Please select a file.');
    else {
        const formData = new FormData();

        uploadFileButton.g
        formData.append('uploadedFile', selectedFile)
        fetch('file_upload', {
            method: 'POST',
            body: formData
        }).then(res => res.json()).then(({ uploaded }) => {
            
        })
    }
});

uploadField.addEventListener('change', () => {
    selectedFile = uploadField.files[0];
    filenameText.innerHTML = `Filename: <b>${selectedFile.name}</b>`;
});