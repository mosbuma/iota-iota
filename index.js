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

// const host = 'http://iota.bitfinex.com'; port = 80;
const host = 'http://node02.iotatoken.nl'; port = 14265;
// const host = 'http://localhost';           port = 15000;
const iota  = new IOTA({ host: host, port: port })
// const iota  = new IOTA({ host: 'http://node02.iotatoken.nl', port: 14265 })
const iotap = IOTAP.create(iota) // promisified iota library


//
const seed = 'BQIYTZINTTX9ZDVMUHI9Z9SOPQSDPSQQPPBGMELFGSXFVLPJRNZDONYGPCS9BTQBRPKEBWETJLRANJAKL'
const seedEncoded = iota.utils.toTrytes(seed)

const destinationAddress = '99VUCXYVWSWHKMH9SUAOGN9TXWLOAKGCTSJHXM9WLJGN9HOXEKITUZFAVZJEDYWAGOATJSIHPHKSCIOXBGOGU9CPKX'

// const securitylevel = 2; // 2 is default
const nAddresses = 25;


function getAccountData() {
  console.log('> getAccountData')
  const options = {
    start: 0,
    end: nAddresses,
    // security: securitylevel,
    threshold: 0
  }
  iotap.getAccountData(seedEncoded, options).then(data => {
  // iotap.getAccountData(seedEncoded).then(data => {
    console.log('--------- getAccountData data');
    console.log(JSON.stringify(data, null, 4)); // XXX why is transfers[] always empty?
    // console.log(data.addresses)

    // iotap.getBalances(data.addresses, 100).then(json => {
    //   console.log('--------- getAccountData -> getBalances json');
    //   console.log(json)
    // })
  });
}


// function getNewAddress() {
//   console.log('> getNewAddress')
//   const options = {
//     // checksum: false,
//     total: nAddresses,
//     // security: securitylevel,
//     returnAll: true
//   }
//   iotap.getNewAddress(seedEncoded, options).then(publicAddresses => {
//     console.log('--------- getNewAddress publicAddresses');
//     console.log(publicAddresses);
//
//     iotap.getBalances(publicAddresses, 100).then(json => {
//       console.log('--------- getNewAddress -> getBalances json');
//       console.log(json)
//     })
//   });
// }


function getNodeInfo() {
  iotap.getNodeInfo().then(data => {
    console.log('--------- getNodeInfo data')
    console.log(JSON.stringify(data, null, 4))
  })
}


function getInputs() {
  iotap.getInputs(seed).then(result => {
    console.log(result)
    // console.log(result.totalBalance)
  })
}


function sendTransfer() {
  const messageToSend = {
      'id': 'JHKSDIUFSDFKJSDFUI',
      'message': new Date().toString()
  }
  const messageStringified = JSON.stringify(messageToSend)
  const messageTrytes = iota.utils.toTrytes(messageStringified)
  // console.log('message', messageTrytes)

  // here we define the transfers object, each entry is an individual transaction
  const transfer = [{
      'address': destinationAddress,
      'value': 3,
      'message': messageTrytes
  }]
  const depth = 4
  const minWeightMagnitude = 14
  console.log('sendTransfer', messageToSend)
  iotap.sendTransfer(seed, depth, minWeightMagnitude, transfer).then(bundle => {
    // console.log(bundle)
    console.log(`Transaction https://tangle.tips/tx/${bundle[0].hash}`)
  })
}


function monitorTransactionMessages() {
  // console.log('monitorTransactionMessages')

  const messageTrytes = 'ODGABDPCADTCGADBGAOBFDXCRCGAQAGAADTCGDGDPCVCTCGADBGAPBXCFDGDHDEARCCDBDHDPCRCHDGAQD99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999'

  let bundle = [{signatureMessageFragment: messageTrytes}]
  const messageStringified = iota.utils.extractJson(bundle)

  console.log(messageStringified)
}


// getNodeInfo(); setInterval(getNodeInfo, 5 * 1000);
// getInputs()
getAccountData(); // setInterval(getAccountData, 5 * 1000);
// getNewAddress()

// sendTransfer()
// monitorTransactionMessages(); // setInterval(monitorTransactionMessages, 5 * 1000);
