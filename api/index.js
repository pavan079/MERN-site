import express from 'express';
import mongoose from 'mongoose';    
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
mongoose
    .connect('mongodb://127.0.0.1:27017/Rastaestate')
    .then(() =>{
        console.log('connected to Mongodb');
    })
    .catch((err) =>{
        console.log(err);
    });

const app = express();  

app.listen(3000, () => {
    console.log('server is running on port 3000!');
});

app.use('/api/user', userRouter);
app.use('api/auth', authRouter );

// middle ware

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });