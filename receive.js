const settings = require('./settings')
const IOTA     = require('iota.lib.js')     // https://github.com/iotaledger/iota.lib.js


const iota  = new IOTA({ host: settings.host, port: settings.port }) // see: http://iotasupport.com/lightwallet.shtml


function getTransfers() {
  console.log('> getTransfers')
  // TODO: limit to new transfers

  iota.api.getTransfers(settings.seed, function(e, transferBundles) {
    if (e) throw e
    for (const bundle of transferBundles) {
      const messageStringified = iota.utils.extractJson(bundle)
      if (!messageStringified) continue
      const message = JSON.parse(messageStringified)
      if (!message.timestamp || !message.id || !message.text) continue
      // console.log(transfer)
      // TODO keep track of highest transfer index
      console.log(`${message.timestamp} [${message.id}] ${message.text}`)
    } // next transaction bundles
  })
}


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


// function getAccountData() {
//   console.log('> getAccountData')
//
//   iota.api.getAccountData(settings.seed, function(e, data) {
//     if (e) throw e
//     console.log('--------- getAccountData data')
//     console.log(JSON.stringify(data, null, 4)) // XXX why is transfers[] always empty?
//     // console.log(data.addresses)
//   })
// }


// function getNewAddress() {
//   console.log('> getNewAddress')
//
//   iota.api.getNewAddress(settings.seed, function(e, publicAddresses) {
//     if (e) throw e
//     console.log('--------- getNewAddress publicAddresses')
//     console.log(publicAddresses)
//   });
// }


// function getNodeInfo() {
//   console.log('> getNodeInfo')
//
//   iota.api.getNodeInfo(function(e, data) {
//     if (e) throw e
//     console.log('--------- getNodeInfo data')
//     console.log(JSON.stringify(data, null, 4))
//   })
// }


// function getInputs() {
//   console.log('> getInputs')
//
//   iota.api.getInputs(settings.seed, function(e, result) {
//     if (e) throw e
//     console.log('--------- getInputs result', result)
//     // console.log(result.totalBalance)
//   })
// }


// getNodeInfo()
// setInterval(getNodeInfo, 30 * 1000)
// getNewAddress()
// getInputs()
// getAccountData()
// setInterval(getAccountData, 30 * 1000)

getTransfers()
// setInterval(getTransfers, 1 * 1000)
