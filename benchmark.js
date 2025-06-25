const wasm1 = await (async () => {
  const file = "./string.wasm";
  const { instance } =
    typeof Deno !== "undefined"
      ? await WebAssembly.instantiate(await Deno.readFile(file))
      : await WebAssembly.instantiateStreaming(fetch(file));
  return instance.exports;
})();
const wasm1Memory = new Uint8Array(wasm1.memory.buffer);
const wasm2 = await (async () => {
  const file = "./simd.wasm";
  const { instance } =
    typeof Deno !== "undefined"
      ? await WebAssembly.instantiate(await Deno.readFile(file))
      : await WebAssembly.instantiateStreaming(fetch(file));
  return instance.exports;
})();
const wasm2Memory = new Uint8Array(wasm2.memory.buffer);
const encoder = new TextEncoder();
const decoder = new TextDecoder();
const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
function testdata(length) {
  let result = "";
  while (length--) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}
async function runtest(fn, n) {
  function test(data) {
    return new Promise((resolve) => {
      const start = Date.now();
      const result = fn(data);
      const end = Date.now();
      resolve({ result, time: end - start });
    });
  }
  const results = [];
  while (n--) {
    const data = testdata(2 ** 16);
    results.push(await test(data));
  }
  return {
    sample: results[0]?.result,
    time:
      results.map(({ time }) => time).reduce((a, b) => a + b) / results.length,
  };
}
function test1(data) {
  const newdata = [];
  for (const c of data) {
    const code = c.charCodeAt(0);
    newdata.push(
      String.fromCharCode((code >= 97 && code <= 122 ? 32 : 0) ^ code)
    );
  }
  return newdata.join("");
}
function test2(data) {
  const ptr = 0;
  const len = (() => {
    const { written } = encoder.encodeInto(data, wasm1Memory.subarray(ptr));
    return written;
  })();
  wasm1.toUpperCase(ptr, len);
  return decoder.decode(wasm1Memory.subarray(ptr, ptr + len));
}
function test3(data) {
  const ptr = 0;
  const len = (() => {
    const { written } = encoder.encodeInto(data, wasm2Memory.subarray(ptr));
    return written;
  })();
  wasm2.toUpperCase(ptr, len);
  return decoder.decode(wasm2Memory.subarray(ptr, ptr + len));
}
function test4(data) {
  return data.toUpperCase();
}
console.log(await runtest(test1, 2 ** 12));
console.log(await runtest(test2, 2 ** 12));
console.log(await runtest(test3, 2 ** 12));
console.log(await runtest(test4, 2 ** 12));
