function toUppterCase(str: string): string {
    let newStr = "";
    let start = 0;
    let end = 16;

    while (end <= str.length) {
        const chunk = str.slice(start, end)
            .split('')
            .map(c => {
                const code = c.charCodeAt(0);
                // ASCII小文字(a〜z)なら32とのXORで大文字に
                return String.fromCharCode(
                    ((code >= 97 && code <= 122) ? 32 : 0) ^ code
                );
            })
            .join('');

        newStr += chunk;
        start = end;
        end += 16;
    }

    return newStr;
}

console.log(
    toUppterCase("hello 世界 hello 世界 hello 世界 hello 世界 hello 世界 hello 世界 hello 世界 hello 世界 hello 世界 hello 世界")
);