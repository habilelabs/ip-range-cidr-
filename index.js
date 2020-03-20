"use strict";

var ip = require('ip');

class IP4CIDR {
    constructor(startIPRange, endIPRange) {
        this.ipStartRange = startIPRange;
        this.ipEndRange = endIPRange;
    }

    isValid(){
        if((ip.isV4Format(this.ipStartRange) && ip.isV4Format(this.ipEndRange))){
           return true;
        }else{
            return false;
        }
    }

    iprange2cidr() {
        let cnt = 32;
        //check if valid ipv4 else return empty array
        if(!this.isValid){
            return [];
        }
        let $start =  this.ip2long(this.ipStartRange);
        let $end = this.ip2long(this.ipEndRange);
        let $result = [];
        while ($end >= $start) {
            let $maxSize = cnt;
            while ($maxSize > 0) {
                let $mask = this.hexToDec(this.iMask($maxSize - 1, cnt));
                let $maskBase = $start & $mask;
                if ($maskBase != $start) break;
                $maxSize--;
            }
            let $x = Math.log($end - $start + 1) / Math.log(2);
            let $maxDiff = Math.floor(cnt - Math.floor($x));

            if ($maxSize < $maxDiff) {
                $maxSize = $maxDiff;
            }

            let $ip = this.long2ip($start);
            $result.push($ip + '/' + $maxSize);
            $start += Math.pow(2, (cnt - $maxSize));

        }
        return $result;
    }

    iMask($s, cnt) {
        return this.base_convert((Math.pow(2, cnt) - Math.pow(2, (cnt - $s))), 10, 16);
    }
    // convert ip to long
    ip2long(ip_address) {
        let output = false;
        let parts = [];
        if (ip_address.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)) {
            parts = ip_address.split('.');
            output = (parts[0] * 16777216 +
                (parts[1] * 65536) +
                (parts[2] * 256) +
                (parts[3] * 1));
        }

        return output;
    }

    // convert long back to ip address
    long2ip(proper_address) {
        let output = false;

        if (!isNaN(proper_address) && (proper_address >= 0 || proper_address <= 4294967295)) {
            output = Math.floor(proper_address / Math.pow(256, 3)) + '.' +
                Math.floor((proper_address % Math.pow(256, 3)) / Math.pow(256, 2)) + '.' +
                Math.floor(((proper_address % Math.pow(256, 3)) % Math.pow(256, 2)) / Math.pow(256, 1)) + '.' +
                Math.floor((((proper_address % Math.pow(256, 3)) % Math.pow(256, 2)) % Math.pow(256, 1)) / Math.pow(256, 0));
        }

        return output;
    }

    // convert hexdec to decimal
    hexToDec(hex) {
        let result = 0, digitValue;
        hex = hex.toLowerCase();
        for (let i = 0; i < hex.length; i++) {
            digitValue = '0123456789abcdefgh'.indexOf(hex[i]);
            result = result * 16 + digitValue;
        }
        return result;
    }

    base_convert(number, initial_base, change_base) {
        if ((initial_base && change_base) < 2 || (initial_base && change_base) > 36)
            return 'Base between 2 and 36';

        return parseInt(number + '', initial_base)
            .toString(change_base);
    }

}

module.exports = IP4CIDR;