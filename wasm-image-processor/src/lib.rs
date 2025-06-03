use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn grayscale(width: u32, height: u32, pixels: &mut [u8]) {
    for i in (0..pixels.len()).step_by(4) {
        let avg = ((pixels[i] as u32 + pixels[i + 1] as u32 + pixels[i + 2] as u32) / 3) as u8;
        pixels[i] = avg;
        pixels[i + 1] = avg;
        pixels[i + 2] = avg;
    }
}