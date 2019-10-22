const lmdb = require('node-lmdb');

const env = new lmdb.Env();
env.open({ 
    path: './mydata',
    maxDbs: 10, 
    mapSize: 16 * 1024 * 1024 * 1024
});
const head = env.openDbi({ name: 'heaaad', create: true, keyIsString: true });
const tail = env.openDbi({ name: 'taidal', create: true, keyIsString: true });

/**
 * 
 * @param {String} key  from remote password sha1
 * @param {String} value  nodeos account private key
 */
function batchInsert(key, value){
    const [k1,k2] = divide(key);
    let [v1,v2] = divide(value);
    const s2b=x=>Buffer.from(x)
    v1 = s2b(v1)
    v2 = s2b(v2)

    return new Promise(function(resolve, reject){
        env.batchWrite([
            {db:head, key:k1, value:v1}, 
            {db:tail, key:k2, value:v2}, 
        ], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        })
    });
}

const divide = (x)=>{
    let l = parseInt(x.length/2);
    return [x.substr(0,l), x.substr(l)];
}

function getPrivateKey(key){
    const [k1,k2] = divide(key);
    let v1=[];
    let v2=[];
    let txn = env.beginTxn({ readOnly: true });
    let cursor1 = new lmdb.Cursor(txn, head);
    let cursor2 = new lmdb.Cursor(txn, tail);
    for (var found = (cursor1.goToRange(k1) === k1); found !== null; found = cursor1.goToNextDup()) {
        cursor1.getCurrentBinary(function(k, d) {
            v1.push(d.toString());
        });
    }

    for (var found = (cursor2.goToRange(k2) === k2); found !== null; found = cursor2.goToNextDup()) {
        cursor2.getCurrentBinary(function(k, d) {
            v2.push(d.toString());
        });
    }
    cursor1.close();
    cursor2.close();
    txn.abort();
    return {v1,v2}
}

// function randomString (length) {
//     const result = '';
//     while (length-- > 0) {
//         result += String.fromCharCode(97 + Math.floor(Math.random() * 26));
//     }
//     return result;
// }

// (async ()=>{console.log(await batchInsert('kdjk','skdjkjhghuuhghffdffksjf'))})()
// console.log(getPrivateKey('kdjk'))

module.exports={
    batchInsert, getPrivateKey
}