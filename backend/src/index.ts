import { Hono } from 'hono'
import {userRouter} from './routes/user';
import {blogRouter} from './routes/blog';
import { cors } from 'hono/cors';

export const app = new Hono<{            //to specify the data type of env variables so that typescript does not complain in line 14
  Bindings:{
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()
app.use('/*',cors());
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);

export default app;