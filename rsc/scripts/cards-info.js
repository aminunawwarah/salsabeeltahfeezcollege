function displayTeachers() {
    details[0].innerHTML = teachers.map(teacher => {
        return `<div class="teacher-info">
                    <p>Teacher name: <span><b>${teacher.teacherName}</b></span>
                    <p>Post: <span><b>${teacher.post}</b></span>
                    <p>Duty: <span><b>${teacher.duty}</b></span>
                </div>`
    }).join('');   
}

function displayClasses() {
    details[1].innerHTML = classes.map((theClass, index)=> {
        return `<p style="margin-bottom: 0.2rem">${index + 1}. ${theClass}</p>`
    }).join('');
}

function openContent(index) {
    infos.forEach(info => {
        info.style.transform = 'scale(0)'
    });
    infos[index].style.transform = 'scale(1)';
}

function closeContent(index) {
    infos[index].style.transform = 'scale(0)';
}

const cards = document.querySelectorAll('.card-content');
const closeCards = document.querySelectorAll('.close-info');
const infos = document.querySelectorAll('.info');
const details = document.querySelectorAll('.details');

cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        switch(index) {
            case 0:
                openContent(index);
                displayTeachers();
                break;
            case 1:
                openContent(index);
                displayClasses();
                break;
            case 2:
                openContent(index);
                displayWorkingHours();
                break;
            case 3:
                openContent(index);
                break;
        }
    })
});

closeCards.forEach((icon, index) => {
    icon.addEventListener('click', () => {
      closeContent(index);
    })
})