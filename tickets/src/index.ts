import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';
import { randomBytes } from 'crypto';

const start = async () => {
    if(!process.env.JWT_KEY) {
        throw new Error('No JWT Key found');
    }
    if(!process.env.MONGO_URI) {
        throw new Error('No mongo url found');
    }
    if(!process.env.NATS_CLIENT_ID) {
        throw new Error('No NATS_CLIENT_IDl found');
    }
    if(!process.env.NATS_URL) {
        throw new Error('No NATS_URLl found');
    }
    if(!process.env.NATS_CLUSTER_ID) {
        throw new Error('No NATS_CLUSTER_ID found');
    }
    try {
        await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID, 
            process.env.NATS_CLIENT_ID,
            process.env.NATS_URL
        );
        natsWrapper.client.on('close', () => {
            console.log('NATS connection closed');
            process.exit();
        })
        process.on('SIGINT', () => natsWrapper.client.close());
        process.on('SIGTERM', () => natsWrapper.client.close());
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to mongodb...');
    } catch (error) {
        console.error(error);
    }
}

start();

app.listen(3000, () => {
    console.log('Listening on: 3000!!!');
})