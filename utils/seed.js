const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    await User.deleteMany({});
    await Thought.deleteMany({});

    // You can replace these data with your actual data
    const usersData = [
        {
            username: 'user1',
            email: 'user1@example.com'
        },
        {
            username: 'user2',
            email: 'user2@example.com'
        }
    ];

    const thoughtsData = [
        {
            thoughtText: 'Thought 1',
            username: 'user1'
        },
        {
            thoughtText: 'Thought 2',
            username: 'user2'
        }
    ];

    const reactionsData = [
        {
            reactionBody: 'Reaction 1',
            username: 'user1'
        },
        {
            reactionBody: 'Reaction 2',
            username: 'user2'
        }
    ];

    const users = await User.insertMany(usersData);
    const thoughts = await Thought.insertMany(thoughtsData);

    console.log(users)
    console.info('Seeding complete! 🌱');
    process.exit(0);
});




