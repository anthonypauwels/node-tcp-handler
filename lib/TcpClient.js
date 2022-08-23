import {Socket} from 'net';
import jsonSocket from 'json-socket';

export default class TcpClient
{
    host;

    port;

    config = { retryDelay: 2500, retryAlways: true };

    client;

    events = {};

    tryReconnect = false;

    constructor(host, port, config = {})
    {
        this.host = host;

        this.port = port;

        this.config = Object.assign( this.config, config );

        this.client = new jsonSocket( new Socket() );

        this.onConnect( () => {
            this._stopReconnect();
        } );

        this.onError( () => {
            this._reconnect();
        } );

        this.onClose( () => {
            if ( this.config.retryAlways ) {
                this._reconnect();
            }
        } );

        this.onEnd( () => {
            this._reconnect();
        } );

        this._on( 'message', request => {
            if ( request.event !== undefined && this.events[ request.event ] !== undefined ) {
                this.events[ request.event ]( request.data );
            }
        } );
    }

    connect()
    {
        this.client.connect( this.port, this.host );
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
        this.client.on( event, callback );
    }

    _reconnect()
    {
        if ( this.tryReconnect === false ) {
            this.tryReconnect = setInterval( () => this.connect( this.host, this.port ), this.config.retryDelay );
        }
    }

    _stopReconnect()
    {
        if ( this.tryReconnect !== false ) {
            clearInterval( this.tryReconnect );
            this.tryReconnect = false;
        }
    }
}