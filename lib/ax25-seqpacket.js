// Copyright 2018-2020 Steven R. Loomis
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


const bindings = require('bindings')('addon.node');

const EventEmitter = require('events');

class SeqAddress {

}

/**
 * An AX25 Address
 */
class AX25Address extends SeqAddress {
    /**
     * 
     * @param {Object} o 
     * @param {String} o.callsign callsign to call
     * @param {String} o.mycall My callsign (optional)
     * @param {String} o.digis Array of digipeaters to call, from first to last
     */
    constructor(o) {
        const {mycall, callsign, digis} = o;
        if(callsign) {
            this.callsign = callsign;
        } else {
            throw Error('Need at least {callsign}');
        }
        if(mycall) this.mycall = mycall;
        if(digis) this.digis = digis;
    }
    /**
     * Validate callsign semantics
     * @param {String} callsign 
     */
    static validateCall(callsign) {
        if(!callsign) throw Error('validateCall: missing callsign');
        return; //TODO
    }

    /** Address Family */
    get af() {
        return 'AF_AX25';
    }

    get mycall() {
        return this._mycall;
    }
    set mycall(c) {
        validateCall(c);
        this._mycall = c;
    }
    get digis() {
        return this._digis;
    }
    set digis(d) {
        d.forEach(element => validateCall(element));
        this._digis = d;
    }
}

/**
 * Modelled after https://nodejs.org/api/dgram.html socket
 * This is a `SOCK_SEQPACKET` packet, see socket(2)
 */
class SeqSocket extends EventEmitter {
    /**
     * Create socket, and bind to address
     * We need to know the address family before
     * creating the socket.
     * @param {SeqAddress} addr 
     * @param {Object} opt 
     * @param {Function} callback
     */
    constructor(addr, opt, callback) {
        if(!callback) {
            callback = opt;
            opt = null;
        } else if(!opt) {
            opt = {};
        }
        this._address = addr;
        this._socket = bindings.createAndBind(addr, opt);
    }

    address() {
        return this._address;
    }

}

module.exports = {
    bindings, // Exported only for test
    AX25Address,
    SeqSocket,
    SeqAddress
};
