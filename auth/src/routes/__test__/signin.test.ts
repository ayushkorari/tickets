import request from 'supertest';
import { app } from '../../app';

it('return a 400 on incorrect password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'ayush@gmail.com',
            password: '12345678'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'ayush@gmail.com',
            password: 'gdjhgdj'
        })
        .expect(400);    
});

it('return a 400 on unavailable email', async () => {
    return request(app)
        .post('/api/users/signin')
        .send({
            email: 'ayush@gmail.com',
            password: '12345678'
        })
        .expect(400);
});

it('responds with a cookie in case of valid creds', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'ayush@gmail.com',
            password: '12345678'
        })
        .expect(201);

    const res = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'ayush@gmail.com',
            password: '12345678'
        })
        .expect(200);  
    expect(res.get('Set-Cookie')).toBeDefined()         
});