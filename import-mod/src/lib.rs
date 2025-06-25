#[link(wasm_import_module = "js")]
extern "C" {
    fn result(n: i64);
}
#[link(wasm_import_module = "wasm")]
extern "C" {
    fn add(a: i64, b: i64) -> i64;
}
#[export_name = "calc"]
pub fn calc(a: i64, b: i64) {
    unsafe {
        result(add(a, b));
    }
}
