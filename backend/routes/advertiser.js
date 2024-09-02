import express from "express";
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post('/advertiser-signup', async (req, res) => {
    try {
        const { firstName, userId, lastName, companyName, companyEmail, contactInfo, businessType, companyWebsite } = req.body;

        const savedAdvertiser = await prisma.advertiser.create({
            data: {
                userId,
                password: 'default',
                advertiserId: userId,
                firstName,
                lastName,
                companyName,
                companyEmail,
                contact: contactInfo,
                business_type: businessType,
                companyWebsite
            },
            include: {
                user: true // Include related user data in the response
            },
        })
        // Respond with the saved promoter data
        res.status(201).json({ savedAdvertiser, message: 'Advertiser created successfully!' });
    } catch (error) {
        console.error('Error saving advertiser data:', error);
        res.status(500).json({ error: 'An error occurred while saving advertiser data' });
    }

})
router.get('/advertiser/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // Fetch user data with associated promoter info using Prisma
        const userData = await prisma.user.findUnique({
            where: { id: parseInt(userId) },
            //  include: {  },
        });

        // Respond with the use r data
        res.json(userData);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'An error occurred while fetching user data' });
    }
})

router.post('/campaign/create', async (req, res) => {
    try {
        const {
            name,
            startDate,
            endDate,
            imageUrl,
            videoUrl,
            promotionMethods,
            targetAudience,
            description,
            pricePerMetric,
            creatorId,
            promoterLimit,
            status
        } = req.body

        const campaign = await prisma.campaign.create({
            data: {
                name,
                startDate: new Date(startDate), 
                endDate: new Date(endDate),
                status: status,
                creatorId,
                platform: promotionMethods,
                pricesPerMetric: pricePerMetric,
                description,
                imageUrl,
                videoUrl,
                promoterLimit,
                targetAudience

            }
        })
        res.status(200).json({ message: 'campaign created successfully', campaign })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Failed to create campaign' });
    }

})
router.get('/campaign/all', async (req, res) => {
    try {
        const campaigns = await prisma.campaign.findMany({
            include: { creator: true }
        })
       
        res.status(200).json(campaigns)
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Failed to get campaign' });
    }

})
export default router;  