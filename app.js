const express = require('express');
const cors = require('cors');
const exerciseRouter = require('./routes/exercise');
const trainerRouter = require('./routes/trainer');
const app = express();


app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const port = 5000;

app.use('/exercises', exerciseRouter);
app.use('/trainers', trainerRouter);

app.listen(process.env.PORT || port, (err) => {
    if (err)
        console.log('Unable to start the server!');
    else
        console.log('Server started running on : ' + port);
});