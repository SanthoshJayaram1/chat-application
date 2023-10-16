const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const SocketServer = require('./SocketServer')
const path = require('path')
const { ExpressPeerServer } = require('peer');
const http=require('http');

dotenv.config();

const app = express()

const server = http.createServer(app)

const io = require('socket.io')(server, {
  cors: {
    origin: "https://wechat-web.vercel.app", 
    // origin: "http://localhost:3000", 
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], 
    credentials: true,
  },
});


io.on('connection', (socket) => {
  console.log("user connected : "+socket.id);
  SocketServer(socket)
})

ExpressPeerServer(server, { path: '/' })

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const corsOptions = {
  origin: 'https://wechat-web.vercel.app',
  // origin: 'http:localhost:3000',
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], 
  credentials: true, 
};

app.use(cors(corsOptions));
app.options("*",cors(corsOptions))

app.use(cookieParser())
app.use(morgan('dev'))

app.use('/api/v1/auth', require('./routes/auth.route'))
app.use('/api/v1/user', require('./routes/user.route'))
app.use('/api/v1/message', require('./routes/message.route'))

connectDB()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}

server.listen(process.env.PORT, () => console.log(`Server is running on PORT ${process.env.PORT}.`))
