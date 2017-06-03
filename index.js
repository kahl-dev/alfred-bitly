'use strict';

const Bitly = require('bitly');
const Clipboardy = require('clipboardy');


class Alfred  {
	constructor() {
		this.access_token = process.env.BITLY_ACCESS_TOKEN;
		this.clipboard = Clipboardy.readSync();
	}

	isUrl(url) {
		const strRegex = "^((https|http|ftp|rtsp|mms)?://)"
			+ "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
			+ "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
			+ "|" // 允许IP和DOMAIN（域名）
			+ "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
			+ "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
			+ "[a-z]{2,6})" // first level domain- .com or .museum
			+ "(:[0-9]{1,4})?" // 端口- :80
			+ "((/?)|" // a slash isn't required if there is no file name
			+ "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";

		const re=new RegExp(strRegex);
		return re.test(url);
	}

	isAccessToken() {
		return !!this.access_token;
	}

	run() {
		// Check for access token
		if(!this.isAccessToken()) {
			console.log('No access token defined');
			return;
		}

		// Init bitly api
		const bitly = new Bitly(this.access_token);

		// Get url from clipboard and check if is url or return
		if(!this.isUrl(this.clipboard)) {
			console.log('No url to shorten');
			return;
		}

		// Shorten the url and write it to clipboard
		bitly.shorten(this.clipboard)
			.then(function(response) {
				Clipboardy.writeSync(response.data.url);
				console.log('Url was shortened');
				return;
			}, function(error) {
				console.log('Something went wrong');
				return;
			});
	}
}

const wf = new Alfred();
wf.run();
