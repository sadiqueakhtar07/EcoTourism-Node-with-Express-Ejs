// initalization logic 

const mongoose = require("mongoose");
const Listing= require("../models/listing.js");
const initData=require('./data.js');

const DB_URL="mongodb://127.0.0.1:27017/ecotourism";

main().then(()=>{
    console.log("connected to database");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(DB_URL);
}

const initDB = async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();

