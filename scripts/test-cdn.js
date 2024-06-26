const fs = require('fs');
const path = require('path');
const { createHash } = require('blake3');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);
require('dotenv').config();

const csvFilePath = path.join(__dirname, 'blake3.csv');
const CDNURLS = process.env.CDNURLS.split(',');

const axios = require('axios')

async function getReleaseFiles() {
    try {
        const releaseApi = 'https://api.github.com/repos/GopeedLab/gopeed/releases/latest';
        const response = await axios.get(releaseApi);
        return response.data.assets.map(asset => asset.browser_download_url);
    } catch (error) {
        console.error('Failed to get release files:', error);
    }
}

async function downloadAndComputeHash(url, isGithub) {
    try {
        const response = await axios.get(url, {
            responseType: 'stream'

        });
        const hasher = createHash();
        return new Promise((resolve, reject) => {
            response.data.on('data', (chunk) => hasher.update(chunk));
            response.data.on('end', () => {
                const hash = hasher.digest('hex');
                fs.appendFileSync(csvFilePath, `${isGithub ? 'github' : 'cdn'}${url},${hash}\n`);
                resolve(hash);
            });
            response.data.on('error', reject);
        });
    } catch (error) {
        console.error(`Error downloading or computing hash for ${url}:`, error);
    }
}

async function processFiles() {
    let existingHashes = [];
    try {
        const csvContent = fs.readFileSync(csvFilePath, 'utf8');
        const lines = csvContent.split('\n');
        existingHashes = lines.map(line => {
            const [source, url, hash] = line.split(',');
            return { source, url, hash };
        });
    } catch (error) {
        console.log('blake3.csv not found or invalid, creating a new one.');
    }

    const releaseFiles = await getReleaseFiles();

    const cdnReleaseFiles = [];
    for (const cdnUrl of CDNURLS) {
        for (const releaseFile of releaseFiles) {
            cdnReleaseFiles.push(releaseFile.replace('https://github.com', cdnUrl));
        }
    }


    const promises = releaseFiles.map(async (url) => {
        if (!existingHashes.some(entry => entry.url === url)) {
            console.log(`Processing ${url}`);
            await downloadAndComputeHash(url, true);

        }
    });
    const cdnPromises = cdnReleaseFiles.map(async (url) => {
        if (!existingHashes.some(entry => entry.url === url)) {
            console.log(`Processing ${url}`);
            await downloadAndComputeHash(url, false);

        }
    });

    await Promise.all([...promises, ...cdnPromises]);
}

//verifyCDNHashes
async function verifyCDNHashes() {

    await processFiles();
    const csvContent = fs.readFileSync(csvFilePath, 'utf8');
    const lines = csvContent.split('\n');
    const infos = lines.map(line => {
        const [source, url, hash] = line.split(',');
        return { source, url, hash };
    });

    const githubInfos = infos.reduce((acc, info) => {
        if (info.source === 'github') {
            acc[info.hash] = info;
        }
        return acc;
    }, {});

    for (const info of infos) {
        if (info.source === 'cdn') {
            const githubInfo = githubInfos[info.hash];
            if (!githubInfo) {
                console.error(`No github hash found for ${info.url}`);
                continue;
            }
        }
    }
}


(async () => {
    try {
        await verifyCDNHashes();
        console.log("All hashes matched.");
        process.exit(0);
    } catch (error) {
        console.error("Error verifying CDN hashes:", error);
        process.exit(1);
    }
})();
