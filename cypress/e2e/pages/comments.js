const url = Cypress.env('baseUrl')
const token = Cypress.env('token')
export class Comments{
    getAllComments(){
        return new Cypress.Promise((resolve, reject) => {
            cy.request({
                method: 'GET',
                url: url + '/comments',
                failOnStatusCode: false,
                headers: {
                    'authorization': token
                }
            }).then((response) => {
                resolve(response)
            })
        })
    }
    getOneComment(commentId){
        return new Cypress.Promise((resolve, reject) => {
            cy.request({
                method: 'GET',
                url: url + '/comments/' + commentId,
                failOnStatusCode: false,
                headers: {
                    'authorization': token
                }
            }).then((response) => {
                resolve(response)
            })
        })
    }
    createComment(body){
        return new Cypress.Promise((resolve, reject) => {
            cy.request({
                method: 'POST',
                url: url + '/comments',
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
}