// importing the environment variables from cypress.config.js file
const url = Cypress.env('baseUrl')
const token = Cypress.env('token')
export class Users{
    getAllUsers(){
        return new Cypress.Promise((resolve, reject) => {
            cy.request({
                method: 'GET',
                url: url + '/users',
                failOnStatusCode: false,
                header:{
                    'authorization': token
                }
            }).then((response) => {
                resolve(response)
            })
        })
    }
    getUserId(id){
        return new Cypress.Promise((resolve, reject) => {
            cy.request({
                method: 'GET',
                url: url + '/users/' + id,
                failOnStatusCode: false,
                header:{
                    'authorization': token
                }
            }).then((response) => {
                resolve(response)
            })
        })
    }
    createNewUser(body){
        return new Cypress.Promise((resolve, reject) => {
            cy.request({
                method: 'POST',
                url: url + '/users',
                failOnStatusCode: false,
                headers: {
                    'authorization': token
                },
                body: body
            }).then((response) => {
                resolve(response)
            })
        })
    }
    updateUser(id, body){
        return new Cypress.Promise((resolve, reject) => {
            cy.request({
                method: 'PUT',
                url: url + '/users/' + id,
                failOnStatusCode: false,
                headers: {
                    'authorization': token
                },
                body: body
            }).then((response) => {
                resolve(response)
            })
        })        
    }
    deleteUser(id){
        return new Cypress.Promise((resolve, reject) => {
            cy.request({
                method: 'DELETE',
                url: url + '/users/' + id,
                failOnStatusCode: false,
                headers: {
                    'authorization': token
                },
            }).then((response) => {
                resolve(response)
            })
        })
    }
    // generates a random string of lowercase letters
    randomName(){
        let randomName = ''
        for(let i=0; i<8; i++){
            const random = Math.floor(Math.random() * 27)
            randomName = randomName + String.fromCharCode(97 + random)
        }
        return randomName;
    }
}