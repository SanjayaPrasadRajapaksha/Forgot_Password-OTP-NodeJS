import { userRepository } from '../Repositories/user.repo.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

// Business logic for User
export const userService = {
    registerUser: async (userData) => {

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        return await userRepository.createUser({ ...userData, password: hashedPassword });
    },

    generateOTP: () => {
        return crypto.randomBytes(3).toString('hex'); // Generate a 6-digit OTP
    },

    sendOTP: async (email, otp) => {
        // Create a transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // You can use other services like Yahoo, Outlook, etc.
            auth: {
                user: process.env.EMAIL_USER, // Your email address
                pass: process.env.EMAIL_PASS, // Your email password or app-specific password
            },
        });

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender address
            to: email, // List of receivers
            subject: 'Your OTP for Password Reset', // Subject line
            text: `Your OTP is: ${otp}`, // Plain text body
        };

        // Send the email
        await transporter.sendMail(mailOptions);
    },

    forgotPassword: async (email) => {
        const user = await userRepository.getUserByEmail(email);

        if (!user) throw new Error('User not found');

        const otp = userService.generateOTP();
        const otpExpiry = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes

        // Save OTP and expiry time in the user's record
        await userRepository.updateUser(user.id, { otp, otpExpiry });

        // Send OTP via email
        await userService.sendOTP(email, otp);

        return { message: 'OTP sent to your email address' };
    },

    resetPassword: async (email, otp, newPassword) => {
        const user = await userRepository.getUserByEmail(email);

        if (!user || user.otp !== otp || user.otpExpiry < new Date()) {
            throw new Error('Invalid OTP or OTP expired');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await userRepository.updateUser(user.id, { password: hashedPassword, otp: null, otpExpiry: null });

        return { message: 'Password reset successfully' };
    },
};
