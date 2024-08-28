import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { natsWrapper } from '../../nats-wrapper';

it('return 404 if ticket is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put('/api/tickets/'+id)
        .set('Cookie', global.signin())
        .send({title: 'title', price: 20})
})

it('return 401 if user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put('/api/tickets/'+id)
        .send({title: 'title', price: 20})
        .expect(401);   
});

it('return 401 if user does not own the ticket', async () => {
   const res = await request(app)
   .post('/api/tickets')
   .set('Cookie', global.signin())
   .send({ title: 'Title', price: 20 })
   .expect(201); 

   await request(app)
        .put('/api/tickets/'+res.body.id)
        .set('Cookie', global.signin())
        .send({title: 'title', price: 20})
        .expect(401);
});

it('return 400 in case of invalid title or price', async () => {
    const cookie = global.signin();
    const res = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({ title: 'Title', price: 20 })
    .expect(201); 
    await request(app)
        .put('/api/tickets/'+res.body.id)
        .set('Cookie', cookie)
        .send({title: '', price: 0})
        .expect(400);
});

it('update the ticket provided valid details', async () => {
    const cookie = global.signin();

    const res = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({ title: 'Title', price: 20 })
    .expect(201); 

    await request(app)
        .put('/api/tickets/'+res.body.id)
        .set('Cookie', cookie)
        .send({title: 'New Title', price: 30})
        .expect(200); 

    expect(natsWrapper.client.publish).toHaveBeenCalled(); 
    
    const ticketResponse = await request(app)
        .get('/api/tickets/'+res.body.id)
        .send()
        .expect(200);
        
    expect(ticketResponse.body.title).toEqual('New Title');        
});
