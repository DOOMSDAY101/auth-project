require('dotenv').config();
const express = require('express');
const { AppDataSource } = require("./ormconfig")
const authRouter = require("./src/routes/authRoutes")
const adminRouter = require("./src/routes/adminRoutes")

const app = express()
const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello world!");
})

app.use('/', authRouter);
app.use('/', adminRouter)

AppDataSource.initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`app listening on port ${PORT}`)
        });
    })
    .catch(err => console.error(err))
