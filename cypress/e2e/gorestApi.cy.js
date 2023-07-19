/// <reference types = "cypress" />
import { Users } from "./pages/usersApi"
import { Posts } from "./pages/postsApi"
import { Comments } from "./pages/comments"
import { Todos } from "./pages/todos"

const userObj = new Users()
const postObj = new Posts()
const commentObj = new Comments()
const todosObj = new Todos()

let userName = userObj.randomName()
let userEmail = userName + '@gmail.com'
//
// user requests tests started from here
//
let userId = ''
describe('user get requests', () => {
    it('get all users', async () => {
        const res = await userObj.getAllUsers()
        expect(res.status).to.eq(200)
    })
    it('get user by Id', async () => {
        const res = await userObj.getAllUsers()
        userId = res.body[0].id 
        const oneUser = await userObj.getUserId(userId)
        expect(oneUser.status).to.eq(200)
    }) 
    it('get user with invalid id', async () => {
        const res = await userObj.getUserId("asdf")
        expect(res.status).to.eq(404)
    })   
})
describe('user post requests', () => {
    it('create new user', async() => {
        let body = {
            name: userName,
            email: userEmail,
            gender: 'male',
            status: 'inactive'
        }
        const newUser = await userObj.createNewUser(body)
        cy.log(newUser.status)
        expect(newUser.status).eq(201)
        expect(newUser.body.name).eq(userName)
        expect(newUser.body.email).eq(userEmail)
    })
    it('create user without name', async () => {
        let body = {
            email: userEmail,
            gender: 'male',
            status: 'inactive'
        }
        const newUser = await userObj.createNewUser(body)
        cy.log(newUser.status) 
        cy.log(newUser.body[0].message)
        expect(newUser.status).eq(422)
        expect(newUser.body[0].message).to.eq("can't be blank")
    })
})
describe('user put & del request', () => {
    let userName = userObj.randomName()
    let userEmail = userName + '@gmail.com'
    let newCreatedUserId = ''
    it('update user name', async () => {
        let body = {
            name: userName,
            email: userEmail,
            gender: 'male',
            status: 'active'
        }
        const createUser = await userObj.createNewUser(body)
        expect(createUser.status).eq(201)
        expect(createUser.body.name).eq(userName)    
        cy.log(createUser.body.id)
        newCreatedUserId = createUser.body.id
        body = {
            name: 'updatedName',
            email: userEmail,
            gender: 'male',
            status: 'active'
        }
        const updatedUser = await userObj.updateUser(newCreatedUserId, body)
        expect(updatedUser.status).eq(200)
        expect(updatedUser.body.name).eq('updatedName')
    })
    it('delete user', async () => {
        const delUser = await userObj.deleteUser(newCreatedUserId)
        expect(delUser.status).eq(204)
    })
})
//
// posts requests tests started from here
//
let postId = ''
let postUserId = ''
describe('posts get requests', () => {
    it('get all posts', async () => {
        const allPosts = await postObj.getAllPosts()
        expect(allPosts.status).eq(200)
        cy.log(allPosts.body)
    })
    it('get one post', async() => {
        const allPosts = await postObj.getAllPosts()
        postId = allPosts.body[0].id
        const res = await postObj.getOnePost(postId)
        expect(res.status).eq(200)
        expect(res.body.id).eq(postId)
    })
})
describe('posts post request', () => {
    it('create new post', async () => {
        const allPosts = await postObj.getAllPosts()
        postUserId = allPosts.body[0].user_id
        let body = {
            user_id: postUserId,
            title: 'this is title',
            body: 'this is body'
        }
        const res = await postObj.createPost(body)
        expect(res.status).eq(201)
    })
})
describe('posts put & delete requests', () => {
    it('update a post', async () => {
        const allPosts = await postObj.getAllPosts()
        postId = allPosts.body[0].id
        postUserId = allPosts.body[0].user_id
        let body = {
            user_id: postUserId,
            title: 'updated title',
            body: 'updated body',
            id: postId
        }
        const updatedPost = await postObj.updatePost(postId, body)
        expect(updatedPost.status).to.eq(200)
        expect(updatedPost.body.body).eq('updated body')
    })
    it('delete post', async() => {
        const allPosts = await postObj.getAllPosts()
        postId = allPosts.body[0].id
        const res = await postObj.deletePost(postId)
        expect(res.status).to.eq(204)
    })
})
//
// comments request tests started from here
//
let commentId = ''
describe('comments get requests', () => {
    it('get all comments', async () => {
        const res = await commentObj.getAllComments()
        expect(res.status).to.eq(200)
    })
    it('get one comment', async() => {
        const allComments = await commentObj.getAllComments()
        commentId = allComments.body[0].id
        const res = await commentObj.getOneComment(commentId)
        expect(res.status).to.eq(200)
    })
})
describe('comments post request', () => {
    it('create new comment', async () => {
        const allComments = await commentObj.getAllComments()
        postId = allComments.body[0].post_id
        let body = {
            post_id: postId,
            name: 'Hello',
            email: 'email@gmail.com',
            body: 'this is some comment on a post'
        }
        const res = await commentObj.createComment(body)
        expect(res.status).to.eq(201)
        expect(res.body.name).eq('Hello')
    })
})
describe('comments put & delete requests', () => {
    it('update a comment', async () => {
        const allComments = await commentObj.getAllComments()
        commentId = allComments.body[0].id
        postId = allComments.body[0].post_id
        let body = {
            post_id: postId,
            name: 'updated name',
            email: 'updated@email.com',
            body: 'udpated body',
        }
        const res = await commentObj.updateComment(commentId, body)
        expect(res.status).to.eq(200)
    })
    it('delete a commnet', async () => {
        const allComments = await commentObj.getAllComments()
        commentId = allComments.body[0].id
        const res = await commentObj.deleteComment(commentId)
        expect(res.status).to.eq(204)
    })
})
//
// todos requests tests started from here
//
let todosId = ''
describe('todos get requests', () => {
    it('get all todos', async() => {
        const res = await todosObj.getAllTodos()
        expect(res.status).to.eq(200)
    })
    it('get one todos', async () => {
        const allTodos = await todosObj.getAllTodos()
        todosId = allTodos.body[0].id
        const res = await todosObj.getOneTodos(todosId)
        expect(res.status).to.eq(200)
    })  
})
describe('create todos request', () => {
    it('create new todos', async () => {
        const allTodos = await todosObj.getAllTodos()
        userId = allTodos.body[0].user_id
        let body = {
            user_id: userId,
            title: 'newly created',
            due_on: '2023-08-17T00',
            status: 'completed'
        }
        const res = await todosObj.createTodos(body)
        expect(res.status).to.eq(201)
    })
})
describe('todos put & delete requests', () => {
    it('update todos', async () => {
        const allTodos = await todosObj.getAllTodos()
        todosId = allTodos.body[0].id
        userId = allTodos.body[0].user_id
        let body = {
            user_id: userId,
            title: 'updated title',
            due_on: '2023-08-17T00',
            status: 'completed'
        }
        const res = await todosObj.updateTodos(todosId, body)
        expect(res.status).to.eq(200)
    })
    it('delete todos', async () => {
        const allTodos = await todosObj.getAllTodos()
        todosId = allTodos.body[0].id
        const res = await todosObj.deleteTodos(todosId)
        expect(res.status).to.eq(204)
    })
})
