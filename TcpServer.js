import net from 'net';
import jsonSocket from 'json-socket';
import TcpSocket from "./TcpSocket.js";

export default class TcpServer {
    constructor()
    {
        this.server = net.Server();
    }

    listen(host, port)
    {
        this.server.listen( port, host );
    }

    onConnect(callback)
    {
        this.server.on( 'connection', socket => {
            callback( new TcpSocket( new jsonSocket( socket ) ) );
        } );
    }
}