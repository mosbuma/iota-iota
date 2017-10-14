const settings = require('./settings')
const IOTA     = require('iota.lib.js')     // https://github.com/iotaledger/iota.lib.js


const iota  = new IOTA({ host: settings.host, port: settings.port }) // see: http://iotasupport.com/lightwallet.shtml


function sendTransfer(text) {
  console.log('> sendTransfer')

  const message = {
    timestamp: new Date().toString(),
    id: settings.id,
    text: text,
  }
  const transfers = [{
      address: settings.destinationAddress,
      value: 1, // to make transfers a little bit more interesting
      tag: iota.utils.toTrytes('BeWater'),
      message: iota.utils.toTrytes(JSON.stringify(message)),
  }]
  console.log(message)

  iota.api.sendTransfer(settings.seed, settings.depth, settings.minWeightMagnitude, transfers, function(e, bundle) {
    if (e) throw e
    // console.log(bundle)
    console.log(`Transaction https://tangle.tips/tx/${bundle[0].hash}`)
  })
}


let text = process.argv.slice(2).join(' ')
if (!text) text = 'Random text with value ' + Math.random()
sendTransfer(text)
