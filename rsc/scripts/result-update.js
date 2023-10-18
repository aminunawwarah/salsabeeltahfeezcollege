function fetchResult() {
    const studentName = nameField.value.toLowerCase();
    const examinationYear = yearField.value;
    const examinationTerm = termField.value;
    
    fetch('result_fetch', {
        method: 'POST',
        body: JSON.stringify({ studentName, examinationYear, examinationTerm }),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).then(({ found, resultData }) => {
        if (!found)
            alert('The result is not found.')
        else {
            resultUpdate.style.display = 'block';
            showResultData(resultData);
        }
    }).catch(err => alert('Something went wrong and the operation did not complete successfully.'));
}

function showResultData(data) {
    studentText.textContent = data.studentName.toUpperCase();
    yearText.textContent = data.examinationYear;
    termText.textContent = data.examinationTerm;

    updateTable.innerHTML = data.selectedSubjects.map((subject, index) => {
        return `
            <tr>
                <td>${subject}</td>
                <td><input type="number" class="edit-field test" readonly value="${data.testScores[index]}"><button class="edit-btn test">Edit</button></td>
                <td><input type="number" class="edit-field exam" readonly value="${data.examScores[index]}"><button class="edit-btn exam">Edit</button></td>
                <td>${data.totalScores[index]}</td>
                <td>${data.grades[index]}</td>
            </tr>`
    }).join('');
}

const nameField = document.getElementById('name');
const yearField = document.getElementById('exam-year');
const termField = document.getElementById('exam-term');
const fetchResultButton = document.querySelector('[fetch-result]');
const updateResultButton = document.querySelector('[update-result]');
const resultUpdate = document.querySelector('.result-update');
const updateTable = document.querySelector('[update-table]');
const studentText = document.querySelector('.student-name-text');
const yearText = document.querySelector('.examination-year-text');
const termText = document.querySelector('.examination-term-text');
var result;

fetchResultButton.addEventListener('click', () => {
    fetchResultButton.style.pointerEvents = 'none';
    fetchResult();
    fetchResultButton.style.pointerEvents = 'all';

});