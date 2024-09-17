import mongoose from 'mongoose';

let isConnected = false;  // track the connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('mongoDB is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = true;
        console.log('mongoDB is connected');
    } catch (error) {
        console.error('mongoDB connection failed', error);
        throw new Error('Database connection failed');
    }
};
