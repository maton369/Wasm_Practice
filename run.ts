type Exports = {
    calc(a: bigint, b: bigint): void;
};

const a = BigInt(Deno.args[0] || 0);
const b = BigInt(Deno.args[1] || 0);

// 外部モジュール hello_rust.wasm を読み込み
const wasm = await(async () => {
    const { instance } = await WebAssembly.instantiate(
        await Deno.readFile("../hello-rust/target/wasm32-unknown-unknown/release/hello_rust.wasm")
    );
    return instance.exports;
})();

// JavaScript 側の import オブジェクト
const js = {
    result(r: bigint) {
        console.log(`${a} + ${b} = ${r}`);
    },
};

// import_mod.wasm を instantiate し、wasm / js を import として渡す
const importMod = await(async () => {
    const { instance } = await WebAssembly.instantiate(
        await Deno.readFile("./target/wasm32-unknown-unknown/release/import_mod.wasm"),
        { wasm, js }
    );
    return instance.exports as Exports;
})();

// 呼び出し
importMod.calc(a, b);