const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const user = require('./Routers/User');
const recipe = require('./Routers/Recipe');
const comment = require('./Routers/Comment');
const search = require('./Routers/RecipeSearch');
const reply = require('./Routers/Reply');
const mail = require('./Routers/Mail');
require('./services');

app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: '/tmp/'
	})
);
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/user', user);
app.use('/recipe', recipe);
app.use('/post', comment);
app.use('/search', search);
app.use('/comment', reply);
// app.use('/mail', mail);

module.exports = app;
