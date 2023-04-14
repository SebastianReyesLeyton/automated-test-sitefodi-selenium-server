import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
});

io.on("connection", (socket) => {
    console.log(socket.id)

    socket.on("join_therapy_session", (idTherapy) => {
        socket.join(idTherapy);
        console.log("User joined Room: " + idTherapy);
    })

    socket.on("next", (data) => {
        socket.to(data.therapy).emit("next", data);
        console.log("Action next question room: " + data.therapy);
    })

    socket.on("disconnect", () => {
        console.log('USER DISCONNECT');
    })
})

export default httpServer;