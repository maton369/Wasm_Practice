document.querySelector("#exec")?.addEventListener("click", () => {
  const json = document.querySelector("#input")?.value || "{}";
  const command = document.querySelector("#query")?.value ?? "";
  const output = document.querySelector("#output");
  if (output) output.value = jq.raw(json, command);
});
