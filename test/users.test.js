const { validateNewUsers,
    userValidationForSignUp,
    employeeValidation } = require('../controllers/userInputValidation.controller')


const http = require('http')
const { app } = require('../index.js')
const request = require('supertest')

// create mock function

// jest.mock('../controllers/userInputValidation.controller.js', () => ({
//     ...jest.requireActual(),
//     validateNewUsers: jest.fn(),
//     userValidationForSignUp: jest.fn(),
//     employeeValidation: jest.fn()
// }))



let server;


beforeAll((done) => {
    server = http.createServer(app)
    server.listen(3001, done)
})


afterAll((done) => {
    server.close(done)
})


// describe validation endpoint

describe('validation enndpoint', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })


    // user validation
    it('should return 200 status code for valid user input', async () => {
        const userInput = { id: 1, name: 'Sandeep Dhanwate', email: 'sandeep@gmail.com' }
        const res = await request(server).post('/api/users/new').send({ name: 'Sandeep Dhanwate', email: 'sandeep@gmail.com' })
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual(userInput)
    })

    // should return 400 status code for invalid user input, if email is not provided
    it('POST /api/users/new, should return 400 status code for invalid user input', async () => {

        const res = await request(server).post('/api/users/new').send({ name: 'Sandeep Dhanwate' })
        expect(res.statusCode).toBe(400)
        expect(res.body.message).toEqual("Email is required and should be a string")
    })

    // should return 400 status code for invalid user input, if name is not provided
    it('POST /api/users/new, should return 400 status code for invalid user input', async () => {

        const res = await request(server).post('/api/users/new').send({ email: 'sandeep@gmail.com' })
        expect(res.statusCode).toBe(400)
        expect(res.body.message).toEqual("Name is required and should be a string")
    })


    // should return 400 status code for invalid user input, if name and email are not provided
    it('POST /api/users/new, should return 400 status code for invalid user input', async () => {

        const res = await request(server).post('/api/users/new').send({ name: "", email: "" })
        expect(res.statusCode).toBe(400)
        expect(res.body.message).toEqual("Both name and email are required")
    })


    // sign up validation username, email, password
    it('POST /api/users/signup, should return 201 status code for valid user input', async () => {
        let userSignup = { id: 1, username: "sandeep12", email: "sandeep@gmail.com", password: 12345 }
        const res = await request(server).post('/api/users/new/signup').send({
            username: "sandeep12",
            email: "sandeep@gmail.com",
            password: 12345
        })
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual(userSignup)
    })


    // if username is not provide and should return 400 status code
    it('POST /api/users/signup, should return 400 status code for invalid user input',async ()=>{
        const res = await request(server).post('/api/users/new/signup').send({email : 'sandeep@gmail.com', password : 12345})
        expect(res.statusCode).toBe(400)
        expect(res.text).toEqual("username must be required and should be a string")
    })

    // if email is not provide and should return 400 status code
    it('POST /api/users/signup, should return 400 status code for invalid user input',async ()=>{
        const res = await request(server).post('/api/users/new/signup').send({username : 'sandeep12', password : 12345})
        expect(res.statusCode).toBe(400)
        expect(res.text).toEqual("Email must be required and should be a string")
    })

    // if password is not provide and should return 400 status code
    it('POST /api/users/signup, should return 400 status code for invalid user input',async ()=>{
        const res = await request(server).post('/api/users/new/signup').send({username : 'sandeep12', email : 'sandeep@gmail.com'})
        expect(res.statusCode).toBe(400)
        expect(res.text).toEqual("Password must be required and should be a number")
    })


    // employee detail testing
    it('POST /api/employees/new, should return 200 status code for valid employee data', async () => {
        let employees = {
            id: 1,
            name: "sandeep",
            email: "sandeep@gmail.com",
            age: 30,
            salary: 100000,
            department: "HR"
        }
        const res = await request(server).post('/api/employees/new').send({ name: "sandeep", email: "sandeep@gmail.com", age: 30, salary: 100000, department: "HR" })
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual(employees)
    })

    it('POST /api/employees/new, should return 400 status code for if department invalid', async () => {
        let employees = {
            id: 1,
            name: "sandeep",
            email: "sandeep@gmail.com",
            age: 30,
            salary: 100000,
            department: ""
        }
        const res = await request(server).post('/api/employees/new').send({
            name: "sandeep",
            email: "sandeep@gmail.com",
            age: 30,
            salary: 100000,
        })
        expect(res.statusCode).toBe(400)
        expect(res.text).toEqual("department must be required and should be a string")
    })

    // if name is not provide and should return 400 status code
    it('POST /api/employees/new, should return 400 status code for invalid employee data', async ()=>{
        let employees = {
            id: 1,
            name: "",
            email: "sandeep@gmail.com",
            age: 30,
            salary: 100000,
            department: "HR"
            }
            const res = await request(server).post('/api/employees/new').send({
                email: "sandeep@gmail.com",
                age: 30,
                })
                expect(res.statusCode).toBe(400)
                expect(res.text).toEqual("name must be required and should be a string")     
    })
    // if email is not provide and should return 400 status code
    it('POST /api/employees/new, should return 400 status code for invalid employee data',async ()=>{
        let employees = {
            id: 1,
            name: "sandeep",
            email: "",
            age: 30,
            salary: 100000,
            department: "HR"
            }
            const res = await request(server).post('/api/employees/new').send({
                name: "sandeep",
                age: 30,
                })
                expect(res.statusCode).toBe(400)
                expect(res.text).toEqual("email must be required and should be a string")
    })
})