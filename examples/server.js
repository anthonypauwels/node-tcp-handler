import {TcpServer} from "node-tcp-handler";

const server = new TcpServer( '127.0.0.1', 1337 );

server.listen();

server.onConnect( socket => {
    socket.on('foo', data => {
        console.log( 'FOO => ', data ); // print { a: 5, b: 7 }
    } );

    socket.emit('bar', { lorem: 'ipsum' } );
} );