// Most of this code is Vatsa's code merged together with the official webminer code, I just tied them together and wrote some custom functions

// Import hash solver code
importScripts("hashes.js");

// Modified function to get current time and convert it to 12-hr format
function getTime() {
    let date = new Date();
    let h = date.getHours();
    var AmOrPm = h >= 12 ? 'PM' : 'AM';
    h = (h % 12) || 12;
    let m = date.getMinutes();
    let s = date.getSeconds();

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    return `${h}:${m}:${s}${AmOrPm}`;
}

// Custom function to convert the hash to kH and mH to make it easier to read.
function formatHash(bytes, decimals = 2) {
    if (bytes === 0) return 'No hashrate';

    const k = 1000;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['H/s', 'kH/s', 'MH/s', 'GH/s', 'TH/s'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// When message from HTMl file is sent, read it and parse variables from it
onmessage = function(event) {
    if (event.data.startsWith("Start")) {
        let getData = event.data.split(",");
        let result = 0;
        let username = getData[1];
        let rigid = getData[2];
        let workerVer = getData[3];
        let wallet_id = getData[4];
        let difficulty = getData[5];
        
        // Connect to mining server
        function connect() {
            var socket = new WebSocket("wss://magi.duinocoin.com:14808");

            // Read server message, parse it and output info to console
            socket.onmessage = function(event) {
                var serverMessage = event.data;
                if (serverMessage.includes("3.")) {
                    console.log(`${getTime()} | ` + "CPU" + workerVer + ": Connected to DUCO server as " + rigid + ". Server is on version " + serverMessage);
                    socket.send("JOB," + username + "," + difficulty);
                } else if (serverMessage.includes("GOOD")) {
                    console.log(`${getTime()} | ` + "CPU" + workerVer + ": Share accepted: " + result);
                    postMessage("GoodShare");
                    socket.send("JOB," + username + "," + difficulty);
                } else if (serverMessage.includes("BAD")) {
                    console.log(`${getTime()} | ` + "CPU" + workerVer + ": Share rejected: " + result);
                    postMessage("BadShare");
                    socket.send("JOB," + username + "," + difficulty);
                } else if (serverMessage.includes("This user doesn't exist")) {
                    console.log(`${getTime()} | ` + "CPU" + workerVer + ": User not found!");
                    postMessage("Error");
                } else if (serverMessage.includes("Too many workers")) {
                    console.log(`${getTime()} | ` + "CPU" + workerVer + ": Too many workers");
                    postMessage("Error");
                } else if (serverMessage.length > 40) {
                    console.log(`${getTime()} | ` + "CPU" + workerVer + ": Job received: " + serverMessage);
                    job = serverMessage.split(",");
                    difficulty = job[2];
                    postMessage("UpdateDiff," + difficulty + "," + workerVer);

                    // Process job with function from hashes.js
                    startingTime = performance.now();
                    for (result = 0; result < 100 * difficulty + 1; result++) {
                        let ducos1 = new Hashes.SHA1().hex(job[0] + result);
                        if (job[1] === ducos1) {
                            endingTime = performance.now();
                            timeDifference = (endingTime - startingTime) / 1000;
                            hashrate = (result / timeDifference).toFixed(2);

                            postMessage("UpdateLog," + `${getTime()} | ` + "CPU" + workerVer + ": Nonce found: " + result + " Time: " + Math.round(timeDifference) + "s Hashrate: " + Math.round(hashrate / 1000) + " kH/s<br>");
                            console.log(`${getTime()} | ` + "CPU" + workerVer + ": Nonce found: " + result + " Time: " + Math.round(timeDifference) + "s Hashrate: " + formatHash(hashrate));
                            postMessage("UpdateHashrate," + timeDifference + "," + hashrate + "," + workerVer);

                            socket.send(result + "," + hashrate + ",Duinotize," + rigid + ",," + wallet_id);
                        }
                    }
                } else {
                    console.log(`${getTime()} | ` + "CPU" + workerVer + ": " + serverMessage);
                    postMessage("Error");
                }
            }

            socket.onerror = function(event) {
                console.error("CPU" + workerVer + "WebSocket error observed, trying to reconnect: ", event);
                socket.close(1000, "Reason: Error occured in WebWorker.");
            }

            socket.onclose = function(event) {
                console.error("CPU" + workerVer + ": WebSocket close observed, trying to reconnect: ", event);
                setTimeout(function() {
                    connect();
                }, 15000);
            }
        }
        connect();
    }
}
