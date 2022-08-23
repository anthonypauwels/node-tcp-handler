import {TcpClient} from "node-tcp-handler";

const client = new TcpClient( '127.0.0.1', 1337, {
    retryDelay: 5000, // delay between attempts
    retryAlways: true, // always try even if the connection was intentionally closed
} );

client.connect();

client.emit( 'foo', { a: 5, b: 7 } );

client.on( 'bar', data => {
    console.log( 'BAR => ', data ); // print { lorem: 'ipsum' }
} );