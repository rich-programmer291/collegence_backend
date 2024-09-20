import Express  from "express";
import colors from "colors";
import morgan from "morgan";
import env from "dotenv";
import connectDB from './config/config.js';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import userRoute from './routes/userRoutes.js';
import articleRoute from './routes/articleRoutes.js';


env.config();

const app = Express();
const port = process.env.PORT || 3002;
const server = http.createServer(app);


connectDB();

app.use(Express.json());
app.use('/api/users',userRoute);
app.use('/api/articles',articleRoute);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', // React frontend URL
        methods: ['GET', 'POST']
    }
});
app.use(cors());

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Listen for a chat message
    socket.on('sendMessage', async (data) => {
        const { sender, receiver, content } = data;
        const newMessage = new Message({ sender, receiver, content });
        await newMessage.save();
        io.emit('receiveMessage', newMessage);
    });

    // Disconnect the user
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

app.get("/",(req, res)=>{;

    res.send("Welcome to the Home Page.");
});

app.listen(port,()=>{
    console.log(`Server running on ${port}`.bgMagenta.white);
})
