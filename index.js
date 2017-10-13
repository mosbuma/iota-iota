const IOTA  = require('iota.lib.js')     // https://github.com/iotaledger/iota.lib.js

// const rp    = require('request-promise') // https://github.com/request/request-promise
//
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
//       _iota.api.getNodeInfo(function(e, info) {
//         if (e) throw e;
//         if (info.latestMilestoneIndex == 227885) return
//         console.log(info.latestMilestoneIndex, info.latestMilestone)
//       })
//     }
//   })
// }

// see: http://iotasupport.com/lightwallet.shtml
const host = 'http://node02.iotatoken.nl'; port = 14265;
const iota  = new IOTA({ host: host, port: port })


//
// const seed = iota.utils.toTrytes('BQIYTZINTTX9ZDVMUHI9Z9SOPQSDPSQQPPBGMELFGSXFVLPJRNZDONYGPCS9BTQBRPKEBWETJLRANJAKL')
const seed = 'BQIYTZINTTX9ZDVMUHI9Z9SOPQSDPSQQPPBGMELFGSXFVLPJRNZDONYGPCS9BTQBRPKEBWETJLRANJAKL'

// const destinationAddress = '99VUCXYVWSWHKMH9SUAOGN9TXWLOAKGCTSJHXM9WLJGN9HOXEKITUZFAVZJEDYWAGOATJSIHPHKSCIOXBGOGU9CPKX'
const destinationAddress = 'AHWFSYWK9ECAPUUACJZYVFXZLLXJFAZBAQRUPNOSHFRQWYMDTH9LZMDIEAZYAM9BWCATLAQSSQJWUIMOBHOIXXQVYZ'

// const securitylevel = 2; // 2 is default
const nAddresses = 10;


function getAccountData() {
  console.log('> getAccountData')
  // const options = {
  //   start: 0,
  //   end: nAddresses,
  //   // security: securitylevel,
  //   // threshold: 0
  // }
  // iota.getAccountData(seed, options, function(e, data) {
  iota.api.getAccountData(seed, function(e, data) {
    if (e) throw e;
    console.log('--------- getAccountData data');
    console.log(JSON.stringify(data, null, 4)); // XXX why is transfers[] always empty?
    // console.log(data.addresses)

    // iota.api.getBalances(data.addresses, 100, function(e, json) {
    //   if (e) throw e;
    //   console.log('--------- getAccountData -> getBalances json');
    //   console.log(json)
    // })
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
  iota.api.getNewAddress(seed, options, function(e, publicAddresses) {
  // iota.api.getNewAddress(seed, function(e, publicAddresses) {
    if (e) throw e;
    console.log('--------- getNewAddress publicAddresses');
    console.log(publicAddresses);

    // iota.api.getBalances(publicAddresses, 100, function(e, json) {
    //   if (e) throw e;
    //   console.log('--------- getNewAddress -> getBalances json');
    //   console.log(json)
    // })
  });
}


function getNodeInfo() {
  console.log('> getNodeInfo')
  iota.api.getNodeInfo(function(e, data) {
    if (e) throw e;
    console.log('--------- getNodeInfo data')
    console.log(JSON.stringify(data, null, 4))
  })
}


function getInputs() {
  console.log('> getInputs')
  iota.api.getInputs(seed, function(e, result) {
    if (e) throw e;
    console.log('--------- getInputs result', result)
    // console.log(result.totalBalance)
  })
}


function getTransfers() {
  console.log('> getTransfers')
  iota.api.getTransfers(seed, function(e, result) {
    if (e) throw e;
    console.log('--------- getTransfers result', result)
    // console.log(result.totalBalance)
  })
}


function sendTransfer() {
  const messageToSend = {
      'id': '<id>',
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
  iota.api.sendTransfer(seed, depth, minWeightMagnitude, transfer, function(e, bundle) {
    if (e) throw e;
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


// getNodeInfo(); // setInterval(getNodeInfo, 30 * 1000);
// getNewAddress()

getInputs()
// getTransfers()
// setTimeout(getAccountData, 60*1000); // setInterval(getAccountData, 30 * 1000);

// sendTransfer()
// monitorTransactionMessages(); // setInterval(monitorTransactionMessages, 5 * 1000);
