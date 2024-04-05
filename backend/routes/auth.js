import express from "express";
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();
router.post("/register", async function (req, res) {
    try {
        const { email, name, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                username: name,
                password: hashedPassword,
            },
        });
        res.json({ user: { 'email': user.email, 'username': user.name, 'id': user.id }, message: 'user created successfully' });
    } catch (error) {
      
        res.status(400).json({ error: 'Registration failed' });
    }
})
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by username or email (assuming email is unique)
        const user = await prisma.user.findFirst({
            where: {
                email
            }, 
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Compare hashed password with provided password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Successful login, send relevant user data (avoid sending password)
      
        const token = Jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        //        
        res.json({
            id: user.id,
            username: user.username,
            token: token
            // Add other relevant user data as needed (excluding password)
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error logging in' });
    }
});
// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await prisma.user.findUnique({
//             where: { email },
           
//         });

//         if (!user) throw new Error();

//         const valid = await bcrypt.compare(password, user.password);
//         if (!valid) throw new Error();

//         const token = Jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.json({ token, user, success: true });
//     } catch (error) {
//         res.status(401).json({ error: 'Login failed', message: error, success: false });
//     }
// });

// Endpoint to check if username exists
router.post('/check-username', async (req, res) => {
    const { username } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            username: username
        }
    });
    res.json( !!user );

});

// Endpoint to check if password exists
router.post('/check-email', async (req, res) => {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    res.json( !!user );
});
export default router;