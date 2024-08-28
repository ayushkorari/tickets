import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

declare global {
    var signin: () => Promise<string[]>;
}

global.signin = async() => {
    const response = await request(app)
    .post('/api/users/signup')
    .send({
        email: 'ayush@gmail.com',
        password: '12345678'
    })
    .expect(201);
   return response.get('Set-Cookie')!; 
}

let mongo: MongoMemoryServer;
beforeAll(async() => {
    process.env.JWT_KEY = 'jdljld';
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    await mongoose.connect(mongoUri, {});
})

beforeEach(async() => {
    const collections = await mongoose.connection.db.collections();
    for(let collection of collections) {
        collection.deleteMany({});
    }
})

afterAll(async () => {
    if (mongo) {
      await mongo.stop();
    }
    await mongoose.connection.close();
});