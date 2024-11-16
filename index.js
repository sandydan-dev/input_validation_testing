const express = require('express')
const app = express()
const port = 3000

// controllers
const { validateNewUsers, userValidationForSignUp, employeeValidation } = require('./controllers/userInputValidation.controller')

app.use(express.json())

// put new data in the empty array
let usersData = []

app.post('/api/users/new', async (req, res) => {
    try {
        let newUser = req.body;
        let response = validateNewUsers(newUser)
        if (response) return res.status(400).json({ message: response })

        // push new data with unique id
        let user = { id: usersData.length + 1, ...newUser }
        // push new data to the array
        usersData.push(user)
        return res.status(201).json(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Internal server error' })
    }
})

// function getAllUsers() {
//     return usersData
// }

// get all users with endpoint
// app.get('/api/users', (req, res) => {
//     try {
//         let allUsers = getAllUsers
//         return res.status(200).json({ users: allUsers })
//         // return res.status(200).json(allUsers)
//     } catch (error) {
//         console.log(error.message)
//     }
// })


// username email password
let uservalidate = []

app.post('/api/users/new/signup', async (req, res) => {

    try {
        let validationUser = req.body
        let response = userValidationForSignUp(validationUser)

        if (response) return res.status(400).send(response)

        let uservalid = { id: uservalidate.length + 1, ...validationUser }

        uservalidate.push(uservalid)

        return res.status(201).json(uservalid)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Internal server error" })
    }
})


// employee detaisl
const employeeData = []

app.post('/api/employees/new', async (req, res) => {
    try {
        let employees = req.body
        let response = await employeeValidation(employees)

        if (response) return res.status(400).send(response)

        let employee = { id: employeeData.length + 1, ...employees }

        employeeData.push(employee)

        return res.status(201).json(employee)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Internal server error" })

    }
})


module.exports = { app, port }