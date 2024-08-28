import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
    var signin: () => string[];
}

global.signin = () => {
    // Build a JWT payload
    const id = new mongoose.Types.ObjectId().toHexString();
    const payload = {
        id,
        email: 'ayush@gmail.com'
    }

    // Create the JWT token

    const token = jwt.sign(payload, process.env.JWT_KEY!);

    // Build session Object

    const session = { jwt: token }

    // Turn that session into JSON

    const sessionJSON = JSON.stringify(session);

    // Take JSON and encode it as Base64

    const base64 = Buffer.from(sessionJSON).toString('base64');

    // return a string thats the cookie with the encoded data

    return [`session=${base64};path=/; secure; httponly`];
}

jest.mock('../nats-wrapper');

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