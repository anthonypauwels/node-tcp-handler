import net from 'net';
import TcpSocket from "./TcpSocket";

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
            callback( new TcpSocket( socket ) );
        } );
    }
}