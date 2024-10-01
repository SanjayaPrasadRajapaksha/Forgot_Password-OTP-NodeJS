import { User } from '../Models/user.model.js';

export const userRepository = {
  createUser: async (data) => {
    return await User.create(data);
  },

  getUserByEmail: async (email) => {
    return await User.findOne({ where: { email } });
  },

  updateUser: async (id, data) => {
    return await User.update(data, { where: { id } });
  },

  getUserById: async (id) => {
    return await User.findByPk(id);
  }
};
