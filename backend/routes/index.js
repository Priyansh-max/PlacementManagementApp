const express = require('express');
const bcrypt = require('bcrypt');
const userRouter = require("./user");
const adminRouter = require("./admin")
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const router = express.Router();
const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET;
const nodemailer = require('nodemailer');
const crypto = require('crypto');

router.use('/users' , userRouter)
router.use('/admin' , adminRouter)

const verificationCodes = new Map();

//zod validation
const signupSchema = z.object({
    email: z.string().regex(/^([a-zA-Z0-9._%+-]+)@jklu\.edu\.in$/, {
        message: "Email must be in the format 'email@jklu.edu.in'",
    }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    role: z.enum(['USER','MODERATOR', 'ADMIN']).optional(),
});

const loginSchema = z.object({
    email: z.string().regex(/^([a-zA-Z0-9._%+-]+)@jklu\.edu\.in$/, {
        message: "Email must be in the format 'email@jklu.edu.in'",
    }),
    password : z.string().min(6 , {message : "Password must be at least 6 characters long"}),
})

const resetSchema = z.object({
    email: z.string().regex(/^([a-zA-Z0-9._%+-]+)@jklu\.edu\.in$/, {
        message: "Email must be in the format 'email@jklu.edu.in'",
    }),
})

const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS  // Your email password or app password
    }
  });

const passwordSchema = z.object({
    password : z.string().min(6 , {error : "Password must be at least 6 characters long"}),
})


router.post('/signup', async (req , res) => {

    try {
        //user exist checkk
        const validatedData = signupSchema.parse(req.body);
        const { email, password , role } = validatedData;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
        }

        //hashing password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const newUser = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            role: role ? role.toUpperCase() : 'USER', // Default to 'USER' if no role is specified
        },
        });
        const userid = newUser.id;
        const token = jwt.sign({userid} , secret);

        // Respond with the new user data (excluding the password)
        res.status(201).json({
            message : "User created successfully",
            token : token,
            user : {
                id: newUser.id,
                email: newUser.email,
                role: newUser.role,
            }
        });
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors.map(err => err.message);
            return res.status(400).json({ error: errorMessages.join(', ') });
        }
        res.status(500).json({ error: error.message });
    }  
})

router.post('/login', async (req , res) => {
    try{
        const validatedData = loginSchema.parse(req.body);
        const { email, password } = validatedData;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          return res.status(400).json({ error: 'User email id is incorrect' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(400).json({ error: 'Password is incorrect' });
        }

        const userid = user.id;

        const token = jwt.sign({userid} , secret);

        res.status(200).json({
            message : "Login successfully",
            token : token,
            user : {
                id: user.id,
                email: user.email,
                role: user.role,
                profile : user.profile

            }
        });
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors.map(err => err.message);
            return res.status(400).json({ error: errorMessages.join(', ') });
        }
        res.status(500).json({ error: error.message });
    }  
})

router.post('/forgetpassword' , async(req,res) => {
    try{
        const validatedData = resetSchema.parse(req.body);
        const { email } = validatedData;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          return res.status(400).json({ error: 'User with email id does not exist' });
        }

        const resetToken = jwt.sign({ email: user.email }, secret, { expiresIn: '1h' });

        const resetLink = `http://localhost:5173/resetpassword?token=${resetToken}`;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset',
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
        });

        res.status(200).json({ message: 'Password reset link has been sent to your email' });

    }
    catch(error){
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors.map(err => err.message);
            return res.status(400).json({ error: errorMessages.join(', ') });
        }
        res.status(500).json({ error: error.message });

    }
})

router.post('/resetpassword' , async(req , res) => {
    try{
        const { token } = req.query;
        if (!token) {
          return res.status(400).json({ error: 'Token is required' });
        }

        const { password } = passwordSchema.parse(req.body);

        const decoded = jwt.verify(token, secret);
        const email = decoded.email;

        //zaruri nai hai ye check krna kyuki hoga he hamesha
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.update({
            where: { email },
            data: { password: hashedPassword },
        });

        res.status(200).json({ message: 'Password has been successfully updated' });
      
    }
    catch(error){
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.errors.map(e => e.message).join(', ') });
        } 
        else if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }
        res.status(500).json({ error: error.message });

    }
})


router.post('/send-verification-email', async (req, res) => {
    try{
        const { email }  = req.body
        const verificationCode = crypto.randomInt(1000, 9999);
        verificationCodes.set(email, verificationCode);

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Email Verification Code',
            text: `Your verification code is: ${verificationCode}`,
        });

        res.status(200).json({ message: 'Verification email sent successfully' });

    }catch(error){
        res.status(500).json({ error: error.message });
    }
})

router.post('/verify-code', (req, res) => {
    try{
        const { email, code } = req.body;

        if (!email || !code) {
            return res.status(400).json({ error: 'Email and code are required' });
        }
        const storedCode = verificationCodes.get(email);
    
        if (storedCode && storedCode.toString() === code) {
            verificationCodes.delete(email);

            return res.status(200).json({ message: 'Email verified successfully' });
        }

        res.status(400).json({ error: 'Invalid verification code' });
    }catch(error){
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;