import { randomBytes } from 'crypto';
import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
});

stan.on('connect', () => {
    console.log('Publisher....');
    const data = {
        id: '123',
        title: 'concert',
        price: 20
    };
    const publisher = new TicketCreatedPublisher(stan);
    publisher.publish(data);
})