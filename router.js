const router = require('koa-router')();
const {batchInsert, getPrivateKey} = require('./db');
const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');      // development only
const fetch = require('node-fetch');                                    // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util');                   // node only; native TextEncoder/Decoder
const { TextEncoder, TextDecoder } = require('text-encoding');          // React Native, IE11, and Edge Browsers only

async function sendTrasaction(private_key, nodeos_ip, transact_data){
    const signatureProvider = new JsSignatureProvider([private_key]);
    const rpc = new JsonRpc(nodeos_ip, { fetch });
    const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
    // const result = await api.transact({
    //     actions: [{
    //       account: 'eosio.token',
    //       name: 'transfer',
    //       authorization: [{
    //         actor: 'useraaaaaaaa',
    //         permission: 'active',
    //       }],
    //       data: {
    //         from: 'useraaaaaaaa',
    //         to: 'useraaaaaaab',
    //         quantity: '0.0001 SYS',
    //         memo: '',
    //       },
    //     }]
    //   }, {
    //     blocksBehind: 3,
    //     expireSeconds: 30,
    //   })
    return await api.transact(transact_data);
}
///////////////////////////////////////////////////

router.get('/', async (ctx, next) => {
    ctx.body = 'hello'
});

router.post('/setprivatekey', async (ctx, next) => {
    const {key ,value} = ctx.request.body;
    let res = await batchInsert(key,value);
    return ctx.body = {
        result: res
    }
});

router.post('/sigtransact', async (ctx, next) => {
    const {key, transact_data} = ctx.request.body;
    let pk = getPrivateKey(key);
    try {
        let result = await sendTrasaction(pk.v1+pk.v2, 'http://127.0.0.1:8888', transact_data);
    } catch (e) {
        console.log('\nCaught exception: ' + e);
        if (e instanceof RpcError)
          console.log(JSON.stringify(e.json, null, 2));
          result = e.json;
    }      
    return ctx.body = result;
});

module.exports = router;