
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const threadRoutes = require("./routes/threads")

require('dotenv').config();
const CONNECTION_URL = process.env.CONNECTION_STRING_MONGO_DATA_BASE
const PORT = process.env.PORT || process.env.CONNECTION_PORT_MONGO_DATA_BASE;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/threads", threadRoutes)


mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server is running on port:${PORT}`)))
    .catch((error) => console.log(error))

mongoose.set("useFindAndModify", false)

