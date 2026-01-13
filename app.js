const express = require('express');
const app = express();
const PORT=3000;
const mongoose= require('mongoose');
const path= require('path');
const methodOverride= require('method-override');
const ejsMate=require('ejs-mate');
const ExpressError = require('./utils/ExpressError.js');

const listings = require('./routes/listing.js');
const reviews=require('./routes/review.js');



const DB_URL = "mongodb://127.0.0.1:27017/ecotourism";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', ejsMate);

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

main().then(() => {
    console.log("connected to database");
})
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(DB_URL);
}

app.get('/', (req, res) => {
    res.send('Server is running....');
});


app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);




app.all(/.*/, (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

//Middleware
app.use((err, req, res, next) => {
    let {statusCode=500, message="Something went wrong"}=err;
    res.status(statusCode).render("error.ejs", {message});
    // res.status(statusCode).send(message);
});

app.listen(PORT, () => {
    console.log(`App is running on port: ${PORT}`);
});