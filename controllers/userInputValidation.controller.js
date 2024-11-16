// use custum input validation

function validateNewUsers(newuser) {
    // if both name and email are empty retur with error message
    if (newuser.name === '' & newuser.email === '') {
        return "Both name and email are required"
    }

    // if name is empty and not string return error message
    if (!newuser.name || typeof newuser.name !== 'string') {
        return "Name is required and should be a string"
    }

    if (!newuser.email || typeof newuser.email !== 'string') {
        return "Email is required and should be a string"
    }

    return null

}


// sign up validation
function userValidationForSignUp(validuser) {
    if (!validuser.username || typeof validuser.username !== 'string') {
        return "username must be required and should be a string"
    }
    if (!validuser.email || typeof validuser.email !== 'string') {
        return "Email must be required and should be a string"
    }
    if (!validuser.password || typeof validuser.password !== 'number') {
        return "Password must be required and should be a number"
    }

    return null
}



// employee details 
function employeeValidation(newEmployee) {
    // name, email, age, salary, department

    // name 
    if (!newEmployee.name || typeof newEmployee.name !== 'string') {
        return "name must be required and should be a string"
    }
    // email
    if (!newEmployee.email || typeof newEmployee.email !== 'string') {
        return "email must be required and should be a string"
    }
    // age
    if (!newEmployee.age || typeof newEmployee.age !== 'number') {
        return "age must be required and should be a number"
    }
    // salary
    if (!newEmployee.salary || typeof newEmployee.salary !== 'number') {
        return "salary must be required and should be a number"
    }
    // department
    if (!newEmployee.department || typeof newEmployee.department !== 'string') {
        return "department must be required and should be a string"
    }

    return null
}

module.exports = { validateNewUsers, userValidationForSignUp, employeeValidation }