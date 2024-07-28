const express = require("express");
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const app = express();

// Configurando body-parser
app.use(express.json());

const port = 3000;

// Definindo o esquema do usuário
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware para criptografar a senha antes de salvar
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Criando o modelo do usuário a partir do esquema
const User = mongoose.model('User', userSchema);

app.get("/", async (req, res) => {
    try {
        const users = await User.find();
    res.send(users);
    } catch (error) {
        res.status(500).send('Error fetching users');
    }
});

app.post("/", async (req, res) => {
try {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    const savedUser = await newUser.save();
    res.status(201).send(savedUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Error creating user');
    }
});

app.listen(port, () => {
    mongoose.connect('mongodb+srv://rafaelvalquer:mudar123.@cluster.rysnuzj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Connected to MongoDB');
    console.log(`App running on port ${port}`);
        })
        .catch(err => {
            console.error('Failed to connect to MongoDB', err);
});
});
