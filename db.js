const lmdb = require('node-lmdb');

const env = new lmdb.Env();
env.open({ 
    path: './mydata', 
    mapSize: 16 * 1024 * 1024 * 1024,
    noMetaSync: true,
    noSync: true 
});
const head = env.openDbi({ name: 'head', create: true });
const mid = env.openDbi({ name: 'mid', create: true });
const tail = env.openDbi({ name: 'tail', create: true });

function batchInsert(key, value){
    return new Promise(function(resolve, reject){
        env.batchWrite([
            [dbi, key1, Buffer.from("Hello")], 
            [dbi, key2, Buffer.from("World")], 
            [dbi, key3], 
            [dbi, key4, valuePlusOne, oldValue] 
        ], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        })
    });
}

function randomString (length) {
    const result = '';
    while (length-- > 0) {
        result += String.fromCharCode(97 + Math.floor(Math.random() * 26));
    }
    return result;
}

