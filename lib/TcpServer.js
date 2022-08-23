import {Server} from 'net';
import jsonSocket from 'json-socket';
import TcpSocket from "./TcpSocket.js";

export default class TcpServer
{
    host;

    port;

    server;

    constructor(host, port)
    {
        this.host = host;

        this.port = port;

        this.server = Server();
    }

    listen()
    {
        this.server.listen( this.port, this.host );
    }

    onConnect(callback)
    {
        this.server.on( 'connection', socket => {
            callback( new TcpSocket( new jsonSocket( socket ) ) );
        } );
    }
}