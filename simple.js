// 方法①：instantiateStreaming（推奨・高速）
const { instance: streamingInstance } = await WebAssembly.instantiateStreaming(
  fetch("./simple.wasm")
);

const valueA = document.querySelector("#value-a");
const valueB = document.querySelector("#value-b");

document.querySelector("#action-calculate")?.addEventListener("click", () => {
  const a = parseInt(valueA?.value) || 0;
  const b = parseInt(valueB?.value) || 0;
  const result = streamingInstance?.exports?.add(a, b);
  alert(`${a} + ${b} = ${result}`);
});

// 方法②：fetch + compile + instantiate（代替手段、キャッシュや圧縮に有効）
const response = await fetch("./simple.wasm"); // ロード
const module = await WebAssembly.compile(await response.arrayBuffer()); // モジュールに変換
const instance = await WebAssembly.instantiate(module); // インスタンスに変換

// インスタンスが必要ならこちらも使える
console.log("Compiled instance:", instance.exports);
