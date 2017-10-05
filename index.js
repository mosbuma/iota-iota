var IOTA    = require('iota.lib.js') // https://github.com/iotaledger/iota.lib.js
var IOTAP   = require('iotap')       // https://github.com/jimthedev/iotap

const iota  = new IOTA({ host: 'http://node02.iotatoken.nl', port: 14265 })
const iotap = IOTAP.create(iota) // promisified iota library

// var info = iotap.getNodeInfo();
// info.then(info=>{console.log(info)})

// seed with checksum PKW
var seed = "BQIYTZINTTX9ZDVMUHI9Z9SOPQSDPSQQPPBGMELFGSXFVLPJRNZDONYGPCS9BTQBRPKEBWETJLRANJAKL";
var seedEncoded = iota.utils.toTrytes(seed);

// var securitylevel = 1;
var nAddresses = 10;

// new adresses
var options = {
  start: 0,
  end: nAddresses-1,
  // security: securitylevel,
  threshold: 0
}
iotap.getAccountData(seedEncoded, options).then(data=>{
  console.log('--------- getAccountData data');
  console.log(JSON.stringify(data));
  // console.log(data.addresses)

  iotap.getBalances(data.addresses, 100).then(json => {
    console.log('--------- getAccountData -> getBalances json');
    console.log(json)
  })
});


// // new adresses
// var options = {
//   // checksum: false,
//   total: nAddresses,
//   // security: securitylevel,
//   returnAll: true
// }
// iotap.getNewAddress(seedEncoded, options).then(publicAddresses => {
//   console.log('--------- getNewAddress publicAddresses');
//   console.log(publicAddresses);
//
//   iotap.getBalances(publicAddresses, 100).then(json => {
//     console.log('--------- getNewAddress -> getBalances json');
//     console.log(json)
//   })
// });


var publicAddresses = [
  'SJMBZORRFQYBVNIBFETF9LBVKYNAIFFIKHCJRYYIPKIIFEYJIIM9WZLLLGGLRRACXMEXUDAGIKJBFOIN9SHUHJI9YW',
  'WDEYHTHCDMX9CQHUDMDAVJYZDQWGKODWOJVCFHDSDDCUOCRM9SRWVLBZSWHVHZHDOHSJPJYULTAOXXLECKEQHWFVFC',
  'M9PGQUOSOKRSIXMBVNBNQVXDWVKAIIRLZUNCIFVWMYBUJUVSHFMQLRUSH9URSCG9OQ9FRRRITCSUPRVRXG9SMU9JXC',
]
iotap.getBalances(publicAddresses, 100).then(json => {
  let totalBalance = 0
  const balances = []
  for (const balance of json.balances) {
    const b = parseInt(balance, 10)
    totalBalance += b
    balances.push(b)
  }
  console.log('--------- totalBalance', totalBalance, balances)
})
