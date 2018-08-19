# alfred-bitly

> Shorten URL with bit.ly

<img src="https://raw.githubusercontent.com/patrickkahl/alfred-bitly/master/media/usage.gif" width="600">

## Install

```
$ npm install --global alfred-bitly
```

_Requires [Node.js](https://nodejs.org) 4+ and the Alfred [Powerpack](https://www.alfredapp.com/powerpack/)._

_I defaulting to `npm` but you can also download the `bitly.alfredworkflow` and double-click the file._

## First Run

Before running the workflow you need to set your Bit.ly **GENERIC ACCESS TOKEN**:

First [login to your Bitly Account](https://bitly.com/a/sign_in) and then create [here](https://bitly.com/a/sign_in?rd=%2Fa%2Foauth_apps) your **GENERIC ACCESS TOKEN**. Be sure to use the **GENERIC ACCESS TOKEN** and not the **API KEY**.

To enter it open Alfred Preferences > Workflows then select Bit.ly, finally click in Configure Workflow and Variables (as seen below):

<img src="https://raw.githubusercontent.com/patrickkahl/alfred-bitly/master/media/alfred_preferences.jpg" width="600">

## Usage

Copy URL to clipboard. Type `bit.ly` in Alfred and <kbd>Enter</kbd>. Now the shorten URL should be in your clipboard.

## License

MIT © [Patrick Kahl](https://github.com/patrickkahl)
