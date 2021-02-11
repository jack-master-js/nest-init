import * as protobuf from 'protobufjs';
import { join } from 'path';

class Proto {
    root: any;
    packageName: any;
    msgType: any;

    constructor(path, packageName, messageName) {
        this.root = protobuf.loadSync(path);
        this.packageName = packageName;
        this.msgType = this.root.lookupType(`${packageName}.${messageName}`);
    }

    encode(cmd, msg) {
        let data = { [cmd]: msg };
        return this.msgType.encode(data).finish();
    }

    decode(buff) {
        try {
            let data = this.msgType.decode(buff);
            return {
                cmd: data.cmd,
                msg: data[data.cmd],
            };
        } catch (e) {
            return null;
        }
    }

    getEnum(enumName) {
        let enums = this.root.lookupEnum(`${this.packageName}.${enumName}`);
        let values = enums.values;
        let map = {};
        for (const k in values) {
            let index = values[k];
            map[k] = index;
            map[index] = k;
        }
        return map;
    }
}
const p = join(__dirname, '../..', 'public');
const protoUtil = new Proto(p + '/game.proto', 'stage', 'Body');
export default protoUtil;
