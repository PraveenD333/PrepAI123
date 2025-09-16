import http from 'http'
import app from './app.js';
import connectDB from './Database/db.js';


const PORT = process.env.PORT || 3000;

const server=http.createServer(app)

server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})