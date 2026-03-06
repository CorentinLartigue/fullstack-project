const users = require('../data/users');

const userModel = {
    getAll: () => {
        return users;
    },
    getById: (id) => {
        return users.find(user => user.id === id);
    },
    create: (data) => {
        const newUser = {
            id: users.length + 1,
            ...data,
            createdAt: new Date().toISOString().split('T')[0]
        };
        users.push(newUser);
        return newUser;
    },
    update: (id, data) => {
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex === -1) return null;
        
        const {name, email, role} = data;
        
        if (name !== undefined) users[userIndex].name = name;
        if (email !== undefined) users[userIndex].email = email;
        if (role !== undefined) users[userIndex].role = role;

        return users[userIndex];
    },
    remove: (id) => {
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex === -1) return null;
        const deletedUser = users.splice(userIndex, 1);
        return deletedUser[0];
    }
};

module.exports = userModel;