const _ = require('lodash');
const fileManager = require('./file-manager');

fileManager.readUsers(function(err, content) {
    if (err) { console.log(err); return; }
    const users = content.split(',');
    console.log(_.chunk(users, 2));
});