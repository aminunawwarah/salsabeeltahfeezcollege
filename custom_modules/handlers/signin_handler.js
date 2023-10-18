const fs = require('fs');
const fc = require('./fetch_children');

function validateSigin(req, res) {
    const username = req.body.username.toLowerCase();
    const password = req.body.password;

    fs.readFile('./users/users.json', (err, content) => {
        if (err)
            console.log('Cannot read from the users.json file.');
        else {
            const fileContent = JSON.parse(content);
            const currentUser = fileContent.filter(user => user.username === username);

            if (currentUser.length !== 0) {
                if (currentUser[0].password === password) {
                    fs.readFile(`./users/${currentUser[0].type}/${currentUser[0].username}/messages.json`, (err, content) => {
                        if (err)
                            throw new Error('Failed to read the messages.json file');
                        else {
                            var messages = JSON.parse(content);

                            messages.reverse();
                            fs.readdir('./classes', (err, classes) => {
                                if (err)
                                    throw new Error('Failed to read the classes directory.');
                                else {
                                    switch(currentUser[0].type) {
                                        case 'staff':
                                            res.render('teachers', { 
                                                username, 
                                                messages, 
                                                submissionRequired: true, 
                                                text: 'First term examination questions',
                                                date: '12th October, 2021'
                                             });
                                            break;
                                        case 'parent':
                                            fc.fetchChildren({ username, messages, res });
                                            break;
                                        case 'admin':
                                            res.render('admin', { classes, messages });
                                            break;
                                        case 'finance':
                                            res.render('teachers', { 
                                                username, 
                                                messages, 
                                                submissionRequired: true, 
                                                text: 'First term examination questions',
                                                date: '12th October, 2021'
                                             });
                                            break;
                                        case 'principal':
                                            res.render('principal', { classes });
                                            break;
                                    }
                                }
                            });
                        }
                    });
                } else {
                    res.render('signin', { exists: true, incorrectPassword: true });
                }
            } else {
                res.render('signin', { exists: false, incorrectPassword: false });
            }
        }
    });
}

module.exports = { validateSigin };