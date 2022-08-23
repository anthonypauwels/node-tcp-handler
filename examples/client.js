import {TcpClient} from "node-tcp-handler";

const client = new TcpClient( '127.0.0.1', 1337 );

client.connect();

client.emit( 'foo', { a: 5, b: 7 } );

client.on( 'bar', data => {
    console.log( 'BAR => ', data ); // print { lorem: 'ipsum' }
} );