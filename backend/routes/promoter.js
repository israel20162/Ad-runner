import express from "express";
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post('/promoter-signup', async (req, res) => {
    try {
        const { userId, fullName, contactInfo, bio, profilePicture, promotionMethods, targetAudience, paymentMethod } = req.body;
        const savedPromoter = await prisma.promoter.create({
            data: {
                userId,
                fullName,
                contactInfo,
                bio,
                profilePicture,
                promotionMethods,
                targetAudience,
                paymentMethod,

            },
            include: {
                user: true // Include related user data in the response
            },
        })
        // Respond with the saved promoter data
        res.json(savedPromoter);
    } catch (error) {
        console.error('Error saving promoter data:', error);
        res.status(500).json({ error: 'An error occurred while saving promoter data' });
    }

})
router.get('/promoters/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // Fetch user data with associated promoter info using Prisma
        const userData = await prisma.user.findUnique({
            where: { id: parseInt(userId) },
            include: { promoter: true },
        });

        // Respond with the user data
        res.json(userData);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'An error occurred while fetching user data' });
    }
})


export default router;