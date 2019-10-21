const lmdb = require('node-lmdb');

const env = new lmdb.Env();
env.open({ 
    path: './mydata',
    maxDbs: 10, 
    mapSize: 16 * 1024 * 1024 * 1024,
    noMetaSync: true,
    noSync: true 
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
    let txn = env.beginTxn({ readOnly: true });
    console.log(txn.getString(head,'kd'));
    let v1 = txn.getString(head, k1);
    let v2 = txn.getString(tail, k2)
    txn.commit();
    return {v1, v2}
}

// function randomString (length) {
//     const result = '';
//     while (length-- > 0) {
//         result += String.fromCharCode(97 + Math.floor(Math.random() * 26));
//     }
//     return result;
// }

(async ()=>{console.log(await batchInsert('kdjk','skdjkhgghffdffksjf'))})()
console.log(getPrivateKey('kdpk'))

module.exports={
    batchInsert, getPrivateKey
}