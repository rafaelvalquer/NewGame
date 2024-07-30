const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const dbConfig = require("./config/db");

const app = express();

app.use(bodyParser.json());

app.use(cors());

// Conectar ao MongoDB
mongoose.connect(dbConfig.uri, dbConfig.options)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB connection error:", err));

// Usar rotas
app.use("/api/users", userRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
