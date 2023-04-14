import app, { PORT, HOST } from './app';
import socketIO from './socket.io';

app.listen( PORT, HOST, () => {
    console.log(`\x1b[33m[+] Server status: Running. Link: http://localhost:${PORT} \x1b[0m`);
} )

socketIO.listen( 5000, HOST, () => {
    console.log(`\x1b[33m[+] Server status: Running. Link: http://localhost:${5000} \x1b[0m`);
});