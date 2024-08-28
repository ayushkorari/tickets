import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
    if(!process.env.JWT_KEY) {
        throw new Error('No JWT Key found');
    }
    if(!process.env.MONGO_URI) {
        throw new Error('No mongo url found');
    }
    try {
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