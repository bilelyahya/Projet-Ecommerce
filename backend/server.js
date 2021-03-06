import express from "express";
import mongoose from "mongoose";
import productRouter from './routers/productRouter.js';
import userRouter from "./routers/userRouter.js";
import dotenv from 'dotenv';

dotenv.config();


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect( process.env.MONGOURL||"mongodb://localhost:27017/amazona", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
},console.log("DB connected")

).catch(error => console.log(error) );

app.use("/api/users", userRouter);
app.use('/api/products', productRouter);

app.get("/", (req, res) => {
  res.send("Server is ready");
});
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server at http://localhost: ${port}`);
});
