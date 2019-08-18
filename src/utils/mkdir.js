//mkdir.js
const fs= window.require('fs');
const dirCache={};
export function mkdir(filepath) {
    const arr=filepath.split('/');
    let dir=arr[0];
    for(let i=1;i<arr.length;i++){
        if(!dirCache[dir]&&!fs.existsSync(dir)){
            dirCache[dir]=true;
            fs.mkdirSync(dir);
        }
        dir=dir+'/'+arr[i];
    }
}
