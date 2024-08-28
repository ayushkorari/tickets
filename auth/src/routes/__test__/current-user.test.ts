import request from 'supertest';
import { app } from '../../app';

it('responds with current user details', async () => {
    const cookie = await signin();    
    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie!)
        .send()
        .expect(200);
    expect(response.body.currentUser.email).toEqual('ayush@gmail.com');        
});

it('responds with 401 if not signed in', async () => {   
    await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(401);       
});