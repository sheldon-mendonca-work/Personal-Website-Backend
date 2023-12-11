import dotenv from 'dotenv';
import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import path from 'path';
import ExpressError from '../../ExpressError.js';
import sendMail from '../../sendMail.js';

dotenv.config({path: path.join(path.resolve(), './.env'), debug: true});

const app = express();

app.use(cors({
    origin: "*",
    methods: ['GET', 'PUT', "DELETE", "POST"],
    credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.json({"Hello": "Hello"});
});

app.post("/mail", async (req, res, next) => {
    try {
        const { name, email, message } = req.body;
        const response = await sendMail(name, email, message);

        if(response){
            res.status(200).json({"response": "Mail sent successfully " + response});
        }else{
            throw new ExpressError(402, "Failed to send mail");
        }
    } catch (error) {
        next(error);
    }
})

app.all('*', async (req, res, next) => {
    next(new ExpressError(404, "Page not Found"));
  })
  
app.use((err, req, res, next) => {
    const { message = "Something went wrong.", statusCode = 500 } = err;
    res.status(statusCode).json({ error: message });
});

app.listen(3005, ()=> {
    console.log("Listenting on port 3005");
})

// export const handler = serverless(app);
