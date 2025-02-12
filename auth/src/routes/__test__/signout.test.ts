import request from 'supertest';
import { app } from '../../app';

it('clears the cookie after signing out', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'ayush@gmail.com',
            password: '12345678'
        })
        .expect(201);   

    const response = await request(app)
        .post('/api/users/signout')
        .send({})
        .expect(200);    
    expect(response.get('Set-Cookie')![0].includes('session=;')).toEqual(true);    
});