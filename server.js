const express = require('express')
const cors = require('cors')
const apiRouter = require('./routes/shopifyapi.js')
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Set up router to api file
app.use('/api', apiRouter);

app.listen(port, ()=> {
    console.log(`Server listening on port ${port}`);
});