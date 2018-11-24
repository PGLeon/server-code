var bcrypt = require('bcrypt');


module.exports = {
    change: function(req, res, next) {
        var saltRounds = 10;
        console.log(req.body);
        bcrypt.hash(req.body.passsword, saltRounds, function (err, encryptedPassword) {
            console.log(err);
            console.log(encryptedPassword);
            req.body.passsword = encryptedPassword;
            next();
        });
    },
    
}