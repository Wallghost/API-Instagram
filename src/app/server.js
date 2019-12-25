import 'dotenv/config'
import app from './app';

app.listen(process.env.API_PORT, () =>  {
  console.log(`Instagram API is listening on port ${process.env.API_PORT}`);
});
