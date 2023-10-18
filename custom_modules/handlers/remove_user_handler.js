const fs = require('fs');

function removeUserFromFile(dir, element) {
    fs.readFile(dir, (err, content) => {
        if (err)
            throw new Error('Failed to read the users.json file.');
        var users = JSON.parse(content);
        var updatedUsers = users.filter(user => user.username !== element);
        
        fs.writeFile(dir, JSON.stringify(updatedUsers, null, '\t'), (err) => {
            if (err)
                throw new Error('Failed to update the users.json file.');
        });
    });
}

function removeDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (var i = 0; i < files.length; i++) {
        fs.unlink(`${dir}/${files[i]}`, (err) => {
            if (err)
                throw new Error('The file could not be removed.');
        });
    }

    fs.rmdir(dir, (err) => {
        if (err)
            throw new Error('The directory could not be removed.');
    });
}

function removeUser(req, res) {
    const { username, option } = req.body;

    if (!fs.existsSync(`./users/${option}/${username}`))
        res.send(JSON.stringify({ removed: false }));
    else if (option === 'staff') {
        removeUserFromFile('./users/users.json', username);
        removeDirectory(`./users/staff/${username}`);
        res.send(JSON.stringify({ removed: true }));
    } else {
        fs.readFile(`./users/parent/${username}/children.json`, (err, content) => {
            if (err)
                throw new Error('Failed to read the children.json file.');
            const children = JSON.parse(content);

            if (children.length > 0) {
                for (var i = 0; i < children.length; i++) {
                    removeDirectory(`./classes/${children[i].studentClass}/${children[i].studentName}`);
                }
            }   

            removeUserFromFile('./users/users.json', username);
            removeDirectory(`./users/parent/${username}`);
            res.send(JSON.stringify({ removed: true }));
        });
    }
}

module.exports = { removeUser };