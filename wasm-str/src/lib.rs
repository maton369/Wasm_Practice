use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn to_upper_case(input: &str) -> String {
    input.to_uppercase()
}
