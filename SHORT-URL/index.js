const express = require('express')
const path = require('path')
const app = express()
const connectToDb = require('./connection.js')
const URL = require('./models/url.js')
const cookieParser = require('cookie-parser')

// const { restrictToLoggedInUser,checkAuth } = require('./middlewares/auth')
const {checkForAuthentication,restrictToUser} = require('./middlewares/auth.js')

const urlRoute = require('./routes/urls.js')
const staticRout = require('./routes/staticRoute.js');
const userRoute = require('./routes/user.js')

app.set('view engine','ejs');
app.set('views', path.resolve("./views"))

connectToDb('mongodb://localhost:27017/practiceDB').then(() => {
    console.log('MongoDb Connected');
})

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(checkForAuthentication);

app.use('/url', restrictToUser(["NORMAL","ADMIN"]) , urlRoute); //app.use('/url', restrictToLoggedInUser , urlRoute);
app.use('/user',userRoute);
app.use('/',staticRout); //app.use('/',checkAuth,staticRout);

app.get('/:shortId', async (req, res) => {
    let Id = req.params.shortId;
    
    let entry = await URL.findOneAndUpdate({ shortId:Id }, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    })

    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }
    res.redirect(entry.redirectUrl)
})



app.listen(3000, () => {
    console.log(`Server Started at http://localhost:8000`);
})