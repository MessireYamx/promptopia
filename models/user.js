import {Schema, model, models} from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email is already taken'],
        required: [true, 'Email is required']
    },

    username: {
        type: String,
        unique: [true, 'Username is already taken'],
        required: [true, 'Username is required'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, 'Username invalid, it must be between 8 and 20 characters long, and be unique']
    },
    image: {
        type: String,
    },
})

const User = models.User || model('User', UserSchema)

export default User