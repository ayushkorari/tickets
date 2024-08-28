import mongoose from "mongoose";
import { createHash } from "../utils/hashing";

interface UserAttrs {
    email: string;
    password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}    
, {
toJSON: {
    transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
    }
}} );

userSchema.pre('save', async function(done) {
    if(this.isModified('password')) {
        const hash = await createHash(this.get('password'));
        this.set('password', hash);
    }
    done();
})

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };