'use strict'

require('dotenv').config({ path: __dirname + '/variables.env' })

const accessToken = process.env.BITLY_ACCESS_TOKEN || BITLY_ACCESS_TOKEN
if (!Boolean(accessToken)) {
	console.log('No access token defined')
	return
}

// Get url from clipboard and check if is url or return
const Clipboardy = require('clipboardy')
const validUrl = require('valid-url')
const clipboard = Clipboardy.readSync()
if (!validUrl.isUri(clipboard)) {
	console.log('No url to shorten')
	return
}

const { BitlyClient } = require('bitly')
const bitly = new BitlyClient(accessToken)

bitly
	.shorten(clipboard)
	.then(function(result) {
		const shortenUrl = result.url
		Clipboardy.writeSync(shortenUrl)
		console.log(shortenUrl)
	})
	.catch(function(error) {
		console.error(error)
	})
