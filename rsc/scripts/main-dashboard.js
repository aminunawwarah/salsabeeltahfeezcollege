const sideLinks = document.querySelectorAll('.side-link');
const informations = document.querySelectorAll('.information');
const closeInformationIcons = document.querySelectorAll('.close-information');

sideLinks.forEach((link, index) => {
    link.addEventListener('click', () => {
        informations[index].style.display = 'block';
    });
});

closeInformationIcons.forEach((icon, index) => {
    icon.addEventListener('click', () => {
        informations[index].style.display = 'none';
    });
});