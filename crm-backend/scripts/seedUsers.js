const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
require('dotenv').config();

const usersToSeed = [
    { username: 'kesaven', password: 'minister1234', role: 'admin' },
    { username: 'dawood', password: 'lobster1234', role: 'admin' },
    { username: 'tanish', password: 'pandas1234', role: 'user' },
    { username: 'ayush', password: 'tiger1234', role: 'user' }
];

const seedUsers = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        console.log('Clearing existing users...');
        await User.deleteMany({});
        console.log('Users cleared.');

        console.log('Seeding new users...');
        for (const user of usersToSeed) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            await new User({
                username: user.username,
                password: hashedPassword
            }).save();
            console.log(`User ${user.username} created.`);
        }

        console.log('All users seeded successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding users:', error);
        process.exit(1);
    }
};

seedUsers();
