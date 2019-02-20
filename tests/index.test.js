// Created tests will appear immediately after the console log message "Server is starting on port 3000"
require("dotenv").load();

const request = require('supertest');
const expect = require('expect');

const app = require('../index.js').app;

describe('POST /api/auth/signin', () => {

    // it('should signin user and return status code of 200', (done) => {
    //     request(app)
    //         .post('/api/auth/signin')
    //         .send({
    //             email: `${process.env.TEST_SIGNIN_EMAIL}`,
    //             password: `${process.env.TEST_SIGNIN_PASSWORD}`
    //         })
    //         .expect(200)
    //         .end(done);
    // });

    it('should reject invalid login', (done) => {
        request(app)
            .post('/api/auth/signin')
            .send({
                email: `wwww@test.com`,
                password: 'wwwwww'
            })
            .expect(400)
            .expect((res) => {
                expect(res.body).toEqual({
                  error: {
                    message: "Invalid Email/Password"
                  }
                });
            })
            .end(done());
    });
});


describe('GET /api/messages', () => {
    it('should return a status code of 401, and a response body with the correct error message', (done) => {
        request(app)
            .get('/api/messages')
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({
                    error: {
                        message: 'Please log in first.'
                    }
                })
            })
            .end(done);
    });

});