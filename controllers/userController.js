const { User, Thought } = require('../models');

module.exports = {
    // get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // get one user by id
    async getUserById(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })

            if(!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.status(200).json(user);
        } catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(200).json(user);
        } catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // update user by id
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                req.body,
                { new: true,}
            );

            if(!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.status(200).json(user);
        } catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // delete user by id
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if(!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.status(200).json({ message: 'User and associated thoughts deleted' });
        } catch(err) {
            res.status(500).json(err);
        }
    },
    // add a new friend
    async addUserFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );

            if(!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.status(200).json(user);
        } catch(err) {
            res.status(500).json(err);
        }
    },
    // remove a friend
    async removeUserFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );

            if(!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.status(200).json(user);
        } catch(err) {
            res.status(500).json(err);
        }
    }
};
