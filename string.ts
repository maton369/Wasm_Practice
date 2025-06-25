type Exports = {
    memory: WebAssembly.Memory;
    toUpperCase: (ptr: number, len: number) => number;
};

const wasm: Exports = await(async () => {
    const { instance } = await WebAssembly.instantiate(
        await Deno.readFile("./string.wasm")
    );
    return instance.exports as Exports;
})();

const memory = new Uint8Array(wasm.memory.buffer);
const encoder = new TextEncoder();
const decoder = new TextDecoder();

const toUpperCase = (str: string) => {
    if (!wasm.toUpperCase) return { result: str, count: -1 };

    const ptr = 0;
    const len = (() => {
        const { written } = encoder.encodeInto(str, memory.subarray(ptr));
        return written;
    })();

    const count = wasm.toUpperCase(ptr, len);
    const result = decoder.decode(memory.subarray(ptr, ptr + len));
    return { result, count };
};

console.log(toUpperCase(Deno.args.join(" ")));