//Import Mongoose
const mongoose = require("mongoose");
//Set URI
const MONGO_URL = process.env.REACT_APP_MONGO_URL;
//Store Connection Object
const db = mongoose.connection;
//Config Object to Avoid Deprecation Warnings
const config = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.set("strictQuery", false);
mongoose.connect(MONGO_URL, config);

//CONNECTION EVENTS
db.on("open", () => {
    console.log(`Connect successfully!`);
})
    .on("error", (err) => {
        console.log(err);
    })
    .on("close", () => {
        console.log(`You are no longer connected to Mongo`);
    });

module.exports = mongoose