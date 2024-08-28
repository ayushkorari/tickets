import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('return 404 if ticket is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .get('/api/tickets/'+id)
        .send()
        .expect(404);
})

it('return the ticket if found', async () => {
    const payload = { title: 'Title', price: 20 };
    const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send(payload)
    .expect(201);
    const ticketResponse = await request(app)
        .get('/api/tickets/'+response.body.id)
        .send()
        .expect(200);
    expect(+ticketResponse.body.price).toEqual(payload.price);    
})