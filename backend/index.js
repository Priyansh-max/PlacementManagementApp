const express = require("express")
const app = express();
const rootRouter = require("./routes/index")
const cors = require('cors');

app.use(cors());
app.use(express.json({ limit: '50mb' }))


app.use("/api/v1" , rootRouter)

app.listen(3000,()=>{
    console.log("Backend running")
})