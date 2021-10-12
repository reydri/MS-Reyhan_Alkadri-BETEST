const mongoose = require('mongoose');

mongoose.model("User", {
    //userName, accountNumber, emailAddress, identityNumber
    userName: {
        type: String,
        require: true
    },
    accountNumber: {
        type: String,
        require: true
    },
    emailAddress: {
        type: String,
        require: true
    },
    identityNumber: {
        type: String,
        require: true
    }
})
