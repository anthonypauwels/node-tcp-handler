import net from 'net';
import jsonSocket from 'json-socket';

export default class TcpClient {
    constructor()
    {
        this.client = new jsonSocket( new net.Socket() );
        this.events = {};

        this._on( 'message', request => {
            if (
                request.event !== undefined &&
                this.events[ request.event ] !== undefined )
            {
                this.events[ request.event ](request.data);
            }
        } );
    }

    connect(host, port)
    {
        this.client.connect( port, host );
    }

    emit(event, data)
    {
        this.client.sendMessage( {
            event, data
        } );
    }

    onError(callback)
    {
        this._on( 'error', callback );
    }

    onClose(callback)
    {
        this._on( 'close', callback );
    }

    on(event, callback)
    {
        this.events[ event ] = callback;
    }

    _on(event, callback)
    {
        this.client.on( event, callback );
    }
}