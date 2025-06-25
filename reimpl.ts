function toUppterCase(str: string): string {
    let newstr = "";
    const len = str.length;

    for (let ptr = 0; ptr < len; ptr++) {
        const c = str.charCodeAt(ptr);
        newstr += String.fromCharCode(c >= 97 && c <= 122 ? c - 32 : c);
    }

    return newstr;
}

console.log(toUppterCase("hello world"));