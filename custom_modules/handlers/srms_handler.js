const fs = require('fs');

function retrieveStudents(res) {
    const classes = fs.readdirSync('./classes');
    res.render('srms', { classes });
}

module.exports = { retrieveStudents };