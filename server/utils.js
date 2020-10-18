const emailValidationRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordValidationRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;

const checkEmailID = (email) => {
    if (!emailValidationRegEx.test(email)) {
        throw new Error("Email ID is invalid");
    }
    return true;
}

const checkPassword = (password) => {
    if (!passwordValidationRegEx.test(password)) {
        throw new Error("Password  does not meet minimum requirements");
    }
    return true;
}

module.exports = {
    checkEmailID,
    checkPassword,
};
