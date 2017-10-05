var IOTA    = require('iota.lib.js') // https://github.com/iotaledger/iota.lib.js
var IOTAP   = require('iotap')       // https://github.com/jimthedev/iotap

const iota  = new IOTA({ host: 'http://node02.iotatoken.nl', port: 14265 })
const iotap = IOTAP.create(iota) // promisified iota library

// var info = iotap.getNodeInfo();
// info.then(info=>{console.log(info)})

// generate publicAddresses
var seed = "BQIYTZINTTX9ZDVMUHI9Z9SOPQSDPSQQPPBGMELFGSXFVLPJRNZDONYGPCS9BTQBRPKEBWETJLRANJAKL";
var seedEncoded = iota.utils.toTrytes(seed);

var securitylevel = 1;

// new adresses
var options = {
  start: 0,
  end: 9,
//  security: securitylevel,
  threshold: 0
}
iotap.getAccountData(seedEncoded, options).then(data=>{
    console.log('--------- got inputs');
    console.log(JSON.stringify(data));

  //  iotap.getBalances(publicAddresses, 100).then(json => {
  //   // console.log(json)
  //   const balances = []
  //   for (const balance of json.balances) {
  //     // if (balance <= 0.00000) continue
  //     // console.log(balance)
  //     balances.push([balance / 10**6, 'IOT'])
  //   }
  //
  //   console.log(balances);
  // })
});


// new adresses
var options = {
//  checksum: false,
  total: 10,
//  security: securitylevel,
  returnAll: true
}

iotap.getNewAddress(seedEncoded, options).then(publicAddresses=>{
    console.log('--------- got all addresses');
    console.log(publicAddresses);

    console.log('--------- check balances addresses');
   iotap.getBalances(publicAddresses, 100).then(json => {
    // console.log(json)
    const balances = []
    for (const balance of json.balances) {
      // if (balance <= 0.00000) continue
      // console.log(balance)
      balances.push([balance / 10**6, 'IOT'])
    }

    console.log(balances);
  })
});

// var publicAddresses = ['SJMBZORRFQYBVNIBFETF9LBVKYNAIFFIKHCJRYYIPKIIFEYJIIM9WZLLLGGLRRACXMEXUDAGIKJBFOIN9SHUHJI9YW',
//                       'WDEYHTHCDMX9CQHUDMDAVJYZDQWGKODWOJVCFHDSDDCUOCRM9SRWVLBZSWHVHZHDOHSJPJYULTAOXXLECKEQHWFVFC'];
//
//
//  iotap.getBalances(publicAddresses, 100).then(json => {
//   // console.log(json)
//   const balances = []
//   for (const balance of json.balances) {
//     // if (balance <= 0.00000) continue
//     // console.log(balance)
//     balances.push([balance / 10**6, 'IOT'])
//   }
//
//   console.log(balances);
// })
