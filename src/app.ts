import express, {Application} from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth';


const app: Application = express();

// setting
app.set('port', 4000); // define port

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);

export default app;