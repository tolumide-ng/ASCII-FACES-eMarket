import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

// import Routes from './routes/v1/index';

dotenv.config();

const app = express();

app.use(cors());
app.use(require('morgan')('dev'));

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// Routes(app);

app.use('/', (req, res) => {
  res.status(200).json({
    data: 'Welcome to dygl App',
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    data: 'Page Not Found on dygl',
  });
});

const server = app.listen(process.env.PORT || 3000, () => {
  process.stdout.write(`Listening on port ${server.address().port}`);
});

export default app;
