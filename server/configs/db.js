import mongoose from 'mongoose';

const conectDB = async () => {
    try {
        let mongodbURI = process.env.MONGO_URI;

        if (!mongodbURI) {
            throw new Error("MONGO_URI environment variable not set");
        }

        if (mongodbURI.endsWith('/')) {
            mongodbURI = mongodbURI.slice(0, -1);
        }

        await mongoose.connect(`${mongodbURI}/resume-builder`);

        console.log("Database connected successfully");

    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};

export default conectDB;