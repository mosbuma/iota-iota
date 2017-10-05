const rp    = require('request-promise') // https://github.com/request/request-promise
const IOTA  = require('iota.lib.js')     // https://github.com/iotaledger/iota.lib.js
const IOTAP = require('iotap')           // https://github.com/jimthedev/iotap

// function findIOTAnode() {
//   let latestMilestoneIndex = 0
//   let bestIOTAnode = undefined
//   //...
//   rp('https://iotasupport.com/providers.json?' + (new Date().getTime())).then(html => {
//     const json = JSON.parse(html) // convert to internal data structures to make sure we received valid data
//     // console.log(json.length)
//     // console.log(json)
//     for (const hostport of json) {
//       let [protocol, hostname, port] = hostport.split(':')
//       hostname = hostname.slice(2)
//       host = `${protocol}://${hostname}`
//       // console.log(host, port)
//       const _iota  = new IOTA({host: host, port: port})
//       const _iotap = IOTAP.create(_iota) // promisified iota library
//       _iotap.getNodeInfo().then(info => {
//         if (info.latestMilestoneIndex == 227885) return
//         console.log(info.latestMilestoneIndex, info.latestMilestone)
//       })
//     }
//   })
// }


const iota  = new IOTA({ host: 'http://node02.iotatoken.nl', port: 14265 })
const iotap = IOTAP.create(iota) // promisified iota library


//
const seed = "BQIYTZINTTX9ZDVMUHI9Z9SOPQSDPSQQPPBGMELFGSXFVLPJRNZDONYGPCS9BTQBRPKEBWETJLRANJAKL";
const seedEncoded = iota.utils.toTrytes(seed);

const securitylevel = 1;
const nAddresses = 10;


function getAccountData() {
  console.log('> getAccountData')
  const options = {
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
}


function getNewAddress() {
  console.log('> getNewAddress')
  const options = {
    // checksum: false,
    total: nAddresses,
    // security: securitylevel,
    returnAll: true
  }
  iotap.getNewAddress(seedEncoded, options).then(publicAddresses => {
    console.log('--------- getNewAddress publicAddresses');
    console.log(publicAddresses);

    iotap.getBalances(publicAddresses, 100).then(json => {
      console.log('--------- getNewAddress -> getBalances json');
      console.log(json)
    })
  });
}


function getBalances() {
  console.log('> getBalances')
  const publicAddresses = [
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
    console.log('--------- getBalances totalBalance', totalBalance, balances)
  })
}


function getInputs() {
  iotap.getInputs(seed).then(result => {
    console.log(result)
    // console.log(result.totalBalance)
  })
}

getInputs()
// getAccountData()
// getNewAddress()
// getBalances()
