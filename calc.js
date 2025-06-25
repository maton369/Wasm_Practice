const imports = {
  wasm: (await WebAssembly.instantiateStreaming(fetch("./import.wasm")))
    .instance?.exports,
  js: {
    result(v) {
      alert(`${getValueA()} + ${getValueB()} = ${v}`);
    },
  },
};
const wasm = await (async () => {
  const { instance } = await WebAssembly.instantiateStreaming(
    fetch("./calc.wasm"),
    imports
  );
  return instance?.exports;
})();
const valueA = document.querySelector("#value-a");
function getValueA() {
  return parseInt(valueA?.value) || 0;
}
const valueB = document.querySelector("#value-b");
function getValueB() {
  return parseInt(valueB?.value) || 0;
}
document
  .querySelector("#action-calculate")
  ?.addEventListener("click", () => wasm?.calc(getValueA(), getValueB()));
