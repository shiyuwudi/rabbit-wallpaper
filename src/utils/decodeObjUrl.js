export function decodeObjUrl(url) {
    let res = '';
    const c = ['_z2C$q', '_z&e3B', 'AzdH3F']
    const d= {'w':'a', 'k':'b', 'v':'c', '1':'d', 'j':'e', 'u':'f', '2':'g', 'i':'h', 't':'i', '3':'j', 'h':'k', 's':'l', '4':'m', 'g':'n', '5':'o', 'r':'p', 'q':'q', '6':'r', 'f':'s', 'p':'t', '7':'u', 'e':'v', 'o':'w', '8':'1', 'd':'2', 'n':'3', '9':'4', 'c':'5', 'm':'6', '0':'7', 'b':'8', 'l':'9', 'a':'0', '_z2C$q':':', '_z&e3B':'.', 'AzdH3F':'/'}
    if (!url || url.includes('http')) {
        return url;
    }
    let j = url;
    for (const m of c) {
        while (j.includes(m)) {
            j = j.replace(m, d[m]);
        }
    }
    for (let char of j) {
        if (/^[a-w\d]+$/.test(char)) {
            char = d[char];
        }
        res += char;
    }
    return res;
}
