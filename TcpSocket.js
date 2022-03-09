export default class TcpSocket {
    constructor(baseSocket)
    {
        this.socket = baseSocket;
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

    emit(event, data)
    {
        this.socket.sendMessage( {
            event, data
        } );
    }

    on(event, callback)
    {
        this.events[ event ] = callback;
    }

    onError(callback)
    {
        this._on( 'error', callback );
    }

    onEnd(callback)
    {
        this._on( 'end', callback );
    }

    _on(event, callback)
    {
        this.socket.on( event, callback );
    }
}