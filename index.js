'use strict'

require('dotenv').config({ path: __dirname + '/variables.env' })
const Bitly = require('bitly')
const Clipboardy = require('clipboardy')
const validUrl = require('valid-url')

class Alfred {
  constructor() {
    this.accessToken = process.env.BITLY_ACCESS_TOKEN
    this.clipboard = Clipboardy.readSync()
  }

  isAccessToken() {
    return Boolean(this.accessToken)
  }

  run() {
    // Check for access token
    if (!this.isAccessToken()) {
      console.log('No access token defined')
      return
    }

    // Init bitly api
    const bitly = new Bitly(this.accessToken)

    // Get url from clipboard and check if is url or return
    if (!validUrl.isUri(this.clipboard)) {
      console.log('No url to shorten')
      return
    }

    // Shorten the url and write it to clipboard
    bitly.shorten(this.clipboard).then(
      function(response) {
        Clipboardy.writeSync(response.data.url)
        console.log('Url was shortened')
        return
      },
      function() {
        console.log('Something went wrong')
        return
      }
    )
  }
}

const wf = new Alfred()
wf.run()
