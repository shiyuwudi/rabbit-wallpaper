const Fs = window.require('fs');
const Path = window.require('path');
const Axios = window.require('axios');

export async function downloadImage (url, filename) {

    const parentDir = Path.resolve('.', 'images');
    if (!Fs.existsSync(parentDir)) {
        Fs.mkdirSync(parentDir);
    }
    const path = Path.resolve(parentDir, filename);

    // axios image download with response type "stream"
    const response = await Axios({
        method: 'GET',
        url: url,
        responseType: 'stream',
        onDownloadProgress: (e) => {
            console.log(e.loaded, e.total);
        },
    });

    // pipe the result stream into a file on disc
    response.data.pipe(Fs.createWriteStream(path));

    // return a promise and resolve when download finishes
    return new Promise((resolve, reject) => {
        response.data.on('end', () => {
            resolve(path)
        });
        response.data.on('error', (e) => {
            reject(e);
        });
    })

}
