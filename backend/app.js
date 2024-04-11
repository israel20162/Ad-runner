import express, { urlencoded, json } from "express";
import cors from "cors";
import { PrismaClient } from '@prisma/client';
import authRotes from "./routes/auth.js";
import promoterRoutes from './routes/promoter.js'
import advertiserRoutes from './routes/advertiser.js'
import { configDotenv } from "dotenv";




const app = express();

app.use(
    cors({
        origin: "*",
    })
);
configDotenv()
app.use(urlencoded({ extended: true }));
app.use(json())
const port = process.env.PORT || 5000;

  

app.use("/api/auth", authRotes);
app.use('/api/promoter', promoterRoutes)
app.use('/api/advertiser', advertiserRoutes)
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
