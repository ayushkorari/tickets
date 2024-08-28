import request from 'supertest';
import { app } from '../../app';

it('return a 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'ayush@gmail.com',
            password: '12345678'
        })
        .expect(201);
});

it('return a 400 on invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'ayushgmail.com',
            password: '12345678'
        })
        .expect(400);
});

it('return a 400 on invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'ayush1@gmail.com',
            password: ''
        })
        .expect(400);
});

it('return a 400 on missing email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            password: '12345678'
        })
        .expect(400);
});

it('sets cookie after successful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'ayush@gmail.com',
            password: '12345678'
        }); 
    expect(response.get('Set-Cookie')).toBeDefined()    
});


it('return a 400 on missing password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'ayush@gmail.com'
        })
        .expect(400);
});


it('Disallows duplicate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'ayush@gmail.com',
            password: '12345678'
        })
        .expect(201);
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'ayush@gmail.com',
            password: '12345678'
        })
        .expect(400);
});