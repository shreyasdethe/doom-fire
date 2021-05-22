let colors = [];
let framebuffer = [];

function setup() {
    // color array of the flame (appx) from the original doom game
    colors = [7, 7, 7,
            31, 7, 7,
            47, 15, 7,
            71, 15, 7,
            87, 23, 7,
            103, 31, 7,
            119, 31, 7,
            143, 39, 7,
            159, 47, 7,
            175, 63, 7,
            191, 71, 7,
            199, 71, 7,
            223, 79, 7,
            223, 87, 7,
            223, 87, 7,
            215, 95, 7,
            215, 103, 15,
            207, 111, 15,
            207, 119, 15,
            207, 127, 15,
            207, 135, 23,
            199, 135, 23,
            199, 143, 23,
            199, 151, 31,
            191, 159, 31,
            191, 159, 31,
            191, 167, 39,
            191, 167, 39,
            191, 175, 47,
            183, 175, 47,
            183, 183, 47,
            183, 183, 55,
            207, 207, 111,
            223, 223, 159,
            239, 239, 199,
            255, 255, 255];

    createCanvas(100, 150);

    // pixelDensity in p5.js accounts for how many actual pixels
    // are there in one "pixel" of animation
    // setting it to 1 is ignoring the real value
    pixelDensity(1);

    // create the frambuffer with all 0s
    // the 0 indicates the index of the color in the colors array
    for(let i = 0; i < width*height; i++) {
        framebuffer[i] = 0;
    }

    // one line of pixels at the bottom as the "source" of fire
    for(let i = width*(height-1); i < width*height; i++){
        framebuffer[i] = 35;
    }

    frameRate(24);
}

function draw() {
    background(0);

    loadPixels();
    doFire();
    updatePixels();
}

function doFire() {
    for(let i = 0; i < framebuffer.length; i++) {
        let rn = ceil(random(1) * 2);

        // adding randomness side to side
        let to = i - width - rn + 2;

        // updating the pixel above the current pixel
        // updating -> reducing the value in framebuffer[i]
        // so that the colour progresses from white to dark
        // also adding randomness
        framebuffer[to] = 
            constrain(framebuffer[i] - (rn & 0x1), 0, 35);
        
        // set colours of every pixel according to
        // its corresponding value in framebuffer[]    
        let idx = framebuffer[i];
        pixels[i*4]     = colors[idx*3];
        pixels[i*4 + 1] = colors[idx*3 + 1];
        pixels[i*4 + 2] = colors[idx*3 + 2];
        pixels[i*4 + 3] = 255;
    }
}