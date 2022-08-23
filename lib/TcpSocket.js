export default class TcpSocket
{
    socket;

    events = {};

    constructor(socket)
    {
        this.socket = socket;

        this._on( 'message', request => {
            if ( request.event !== undefined && this.events[ request.event ] !== undefined ) {
                this.events[ request.event ]( request.data );
            }
        } );
    }

    emit(event, data)
    {
        this.socket.sendMessage( {
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

    onEnd(callback)
    {
        this._on( 'end', callback );
    }

    onConnect(callback)
    {
        this._on( 'connect', callback );
    }

    on(event, callback)
    {
        this.events[ event ] = callback;
    }

    _on(event, callback)
    {
        this.socket.on( event, callback );
    }
}