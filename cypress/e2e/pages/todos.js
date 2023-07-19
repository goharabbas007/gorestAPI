const url = Cypress.env('baseUrl')
const token = Cypress.env('token')
export class Todos{
    getAllTodos(){
        return new Cypress.Promise((resolve, reject) => {
            cy.request({
                method: 'GET',
                url: url + '/todos',
                failOnStatusCode: false,
                headers:{
                    'authorization': token
                }
            }).then((response) => {
                resolve(response)
            })
        })
    }
    getOneTodos(id){
        return new Cypress.Promise((resolve, reject) => {
            cy.request({
                method: 'GET',
                url: url + '/todos/' + id,
                failOnStatusCode: false,
                headers: {
                    'authorization': token
                }
            }).then((response) => {
                resolve(response)
            })
        })
    }
    createTodos(body){
        return new Cypress.Promise((resolve, reject) => {
            cy.request({
                method: 'POST',
                url: url + '/todos',
                failOnStatusCode: false,
                headers:{
                    'authorization': token
                },
                body: body
            }).then((response) => {
                resolve(response)
            })
        })
    }
    updateTodos(id, body){
        return new Cypress.Promise((resolve, reject) => {
            cy.request({
                method: 'PUT',
                url: url + '/todos/' + id,
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
    deleteTodos(id){
        return new Cypress.Promise((resolve, reject) => {
            cy.request({
                method: 'DELETE',
                url: url + '/todos/' + id,
                failOnStatusCode: false,
                headers: {
                    'authorization': token
                }
            }).then((response) => {
                resolve(response)
            })
        })
    }
}