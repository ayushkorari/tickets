import request from 'supertest';
import { app } from '../../app';

const createTicket = async(payload: any) => {
    await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send(payload);
    return;
}

it('can fetch a list of tickets', async () => {
    await createTicket({ title: 'Title 1', price: 20 });
    await createTicket({ title: 'Title 2', price: 30 });
    await createTicket({ title: 'Title 3', price: 40 });
    const ticketResponse = await request(app)
        .get('/api/tickets')
        .send()
        .expect(200);
    expect(ticketResponse.body?.length).toEqual(3);    
})