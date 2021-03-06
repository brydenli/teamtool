const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3008;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once('open', () => {
	console.log('MongoDB database connection established successfully');
});

//add routers
const userRouter = require('./routes/user.routes');
const teamRouter = require('./routes/team.routes');

//use routers
app.use('/users', userRouter);
app.use('/teams', teamRouter);

app.listen(port, () => {
	console.log(`Server is listening at port ${port}`);
});
