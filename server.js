import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import routes from './routes'

dotenv.config();

let env = process.env;
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

routes(app);

app.listen(env.PORT, (req, res) => {
    console.log(`Express app running on: ${env.PORT}`);
});

