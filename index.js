'use strict';

require('dotenv').config({path: __dirname + '/variables.env'});
const Bitly = require('bitly');
const Clipboardy = require('clipboardy');

class Alfred {
  constructor() {
    this.accessToken = process.env.BITLY_ACCESS_TOKEN;
    this.clipboard = Clipboardy.readSync();
  }

  isUrl(url) {
    const strRegex =
      '^((https|http|ftp|rtsp|mms)?://)' +
      "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" +
      '(([0-9]{1,3}.){3}[0-9]{1,3}' +
      '|' +
      "([0-9a-z_!~*'()-]+.)*" +
      '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' +
      '[a-z]{2,6})' +
      '(:[0-9]{1,4})?' +
      '((/?)|' +
      "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";

    const re = new RegExp(strRegex);
    return re.test(url);
  }

  isAccessToken() {
    return Boolean(this.accessToken);
  }

  run() {
    // Check for access token
    if (!this.isAccessToken()) {
      console.log('No access token defined');
      return;
    }

    // Init bitly api
    const bitly = new Bitly(this.accessToken);

    // Get url from clipboard and check if is url or return
    if (!this.isUrl(this.clipboard)) {
      console.log('No url to shorten');
      return;
    }

    // Shorten the url and write it to clipboard
    bitly.shorten(this.clipboard).then(
      function(response) {
        Clipboardy.writeSync(response.data.url);
        console.log('Url was shortened');
        return;
      },
      function() {
        console.log('Something went wrong');
        return;
      }
    );
  }
}

const wf = new Alfred();
wf.run();
