const request = require('supertest');

let host = process.env.host

describe('Test the root path', () => {

    test('Should respond with the specified player data', async () => {
        const response = await request(host).get("/");

        expect(response.statusCode).toBe(200)
    });

});