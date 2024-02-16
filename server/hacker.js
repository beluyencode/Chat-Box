const express = require('express');
const app = express();
const port = 4000;
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => {
    console.log(req.headers);
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
