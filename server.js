const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const  dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//Routes
const alumniProfileRoutes = require('./routes/alumniProfileRoutes');
const authRoutes = require('./routes/authRoutes');

//Use Routes
app.use('/api/auth',authRoutes);
app.use('/api/alumni',alumniProfileRoutes);


//Mongo Db connection
mongoose.connect(process.env.MONGO_URI)
.then(() => app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`);
}))
.catch(err => console.error(err.message));