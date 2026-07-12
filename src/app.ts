import express, {type Express} from 'express';
import routes from './routes/index.js';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1', routes);

export default app;