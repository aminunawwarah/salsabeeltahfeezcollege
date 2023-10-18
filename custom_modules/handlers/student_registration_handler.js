const fs = require('fs');

function registerStudent(req, res) {
    var { studentName, studentClass, parentName, admissionDate } = req.body;

    studentName = studentName.toLowerCase();
    parentName = parentName.toLowerCase();

    if (!fs.existsSync(`./users/parent/${parentName}`))
        res.render('student_registration', { studentExists: false, parentExists: false, done: false });
    else {
        if (fs.existsSync(`./classes/${studentClass}/${studentName}`))
        res.render('student_registration', { studentExists: true, parentExists: true, done: false });
        else {
            fs.mkdir(`./classes/${studentClass}/${studentName}`, (err) => {
                if (err)
                    throw new Error('Failed to create the directory for the student.');
                else {
                    fs.writeFile(`./classes/${studentClass}/${studentName}/student_information.json`, JSON.stringify({
                        studentName, studentClass, parentName
                    }, null, '\t'), (err) => {
                        if (err)
                            throw new Error('Failed to create the student_information.json file.');
                        else {
                            fs.readFile(`./users/parent/${parentName}/children.json`, (err, content) => {
                                if (err)
                                    throw new Error('Failed to read the children.json file.')
                                else {
                                    var children = JSON.parse(content);
                                    children[children.length] = { 
                                        studentName, 
                                        studentClass, 
                                        parentName, 
                                        admissionDate,
                                        payment: '',
                                        paymentMade: ''
                                    };
                                    fs.writeFile(`./users/parent/${parentName}/children.json`, JSON.stringify(children,
                                        null, '\t'), (err) => {
                                            if (err)
                                                throw new Error('Failed to update the children.json file.');
                                            else
                                                res.render('student_registration', { studentExists: false, parentExists: true, done: true });
                                    });
                                }
                            }); 
                        }
                    });
                }
            });
        }
    }
}

module.exports = { registerStudent };