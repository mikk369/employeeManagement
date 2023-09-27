const express = require('express');
const port = 3000;
const app = express();
require('dotenv').config();
const YAML = require('yamljs');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = YAML.load('./swagger.yaml');
const cookieParser = require("cookie-parser");

const hourRouter = require('./routes/hoursRoutes');
const userRouter = require('./routes/userRoutes');

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

require('dotenv').config();

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

//DB connection
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);
mongoose.connect(DB, {
  useNewUrlParser: true,
}).then;
console.log('DB connection successfull!');

app.use('/hours', hourRouter);
app.use('/', userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
