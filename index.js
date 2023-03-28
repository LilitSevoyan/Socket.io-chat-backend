const express = require ("express")
const app = express()
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const cors = require("cors")
const Router = require("./routes/auth")
const UserRouter = require("./routes/users")
const Conversation = require("./routes/conversation")
const Messenges = require("./routes/messenges")


app.use(express.json());
app.use(cors())


const CONNECTION_URL = process.env.MONGOOSE_CONNECTION_URL

app.use("/",Router)
app.use("/user",UserRouter)
app.use("/conversation",Conversation)
app.use("/messenges",Messenges)

mongoose.connect(
    CONNECTION_URL,
     { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) {
            console.log(err );
        }else{
            console.log("Mongoose is Working!");
        }
    }
 )

 app.listen(8088, () => console.log("server is started"))

