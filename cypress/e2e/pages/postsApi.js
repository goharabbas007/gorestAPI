const url = Cypress.env('baseUrl')
const token = Cypress.env('token')
export class Posts{
    getAllPosts(){
        return new Cypress.Promise((resolve, reject) => {
            cy.request({
                method: 'GET',
                url: url + '/posts',
                failOnStatusCode: false,
                headers: {
                    'authorization': token
                }
            }).then((response) => {
                resolve(response)
            })
        })
    }
    getOnePost(id){
        return new Cypress.Promise((resolve, reject) => {
            cy.request({
                method: 'GET',
                url: url + '/posts/' + id,
                failOnStatusCode: false,
                headers: {
                    'authorization': token
                }
            }).then((response) => {
                resolve(response)
            })
        })
    }
    createPost(body){
        return new Cypress.Promise((resolve, reject) => {
            cy.request({
                method: 'POST',
                url: url + '/posts',
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
    updatePost(id, body){
        return new Cypress.Promise((resolve, reject) => {
            cy.request({
                method: 'PUT',
                url: url + '/posts/' + id,
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
    deletePost(id){
        return new Cypress.Promise((resolve, reject) => {
            cy.request({
                method: 'DELETE',
                url: url + '/posts/' + id,
                failOnStatusCode: false,
                headers: {
                    'authorization': token
                },
            }).then((response) => {
                resolve(response)
            })
        })
    }
}