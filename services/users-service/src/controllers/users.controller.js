const User = require('../models/user.model');

const addUser = async (userData) => {
    const { id, first_name, last_name, birthday } = userData; //put the data into variables

    if (!id || !first_name || !last_name || !birthday) {
        throw new Error('Missing required user fields');
    }

    const existingUser = await User.findOne({ id }); //find if this id exist

    if (existingUser) {
        throw new Error('User with this id already exists');
    }

    const user = new User({
        id,
        first_name,
        last_name,
        birthday
    });

    await user.save(); //saving the user in DB

    return user; //returning the object
};

const getUserDetails = async (userId) => {

    if (!userId) {
        throw new Error('User Id is required');
    }

    const user = await User.findOne ({id :userId});

    const total = 0;

    return {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        birthday: user.birthday,
        total
    };

}

const getAllUsers = async () => {
    return await User.find({}, {
        _id: 0,
        __v: 0
    });
};


module.exports = {
    addUser , getUserDetails , getAllUsers
};
