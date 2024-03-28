import express from 'express';
import Hello from './Hello.js';
import Lab5 from './Lab5.js';

const app = express();

Lab5(app); // pass reference to the express module
Hello(app);

app.listen(4000);