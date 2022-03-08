import TcpServer from "./TcpServer";
import TcpClient from "./TcpClient";

const server = new TcpServer();

server.listen( '127.0.0.1', 1337 );

server.onConnect( socket => {
    socket.on('foo', data => {
        console.log( 'FOO => ', data ); // print { a: 5, b: 7 }
    } );

    socket.emit('bar', { lorem: 'ipsum' } );
} );

/** --------- */

const client = new TcpClient();

client.connect( '127.0.0.1', 1337 );

client.emit( 'foo', { a: 5, b: 7 } );

client.on( 'bar', data => {
    console.log( 'BAR => ', data ); // print { lorem: 'ipsum' }
} );