import { userService } from '../Services/user.service.js';

export const userController = {
  register: async (req, res) => {
    try {
      const user = await userService.registerUser(req.body);
      res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;

      // Initiate forgot password process and send OTP
      const result = await userService.forgotPassword(email);
      res.status(200).json(result);
      
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { email, otp, newPassword } = req.body;
      await userService.resetPassword(email, otp, newPassword);
      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
