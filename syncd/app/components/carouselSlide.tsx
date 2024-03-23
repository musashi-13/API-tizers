"use state"
import { useState, useEffect } from "react";

type RGBColor = [number, number, number];
type Palette = RGBColor[];

const getDarkestColor = (palette: Palette): RGBColor => {
    return palette.reduce((minArray: RGBColor, currentArray: RGBColor) => {
        return currentArray[0] < minArray[0] ? currentArray : minArray;
    }, palette[0]);
};

export default function CarouselSlide() {
    const ColorThief = require('colorthief');
    const [mainColor, setMainColor] = useState('#f0f0f0');

    useEffect(() => {
        const colorThief = new ColorThief();

        const img = new Image();
        img.src = item.eventImage;

        img.addEventListener('load', () => {
            const palette = colorThief.getPalette(img, 4);
            console.log(palette)
            const darkestColor = getDarkestColor(palette)
            const rgbColor = `rgb(${darkestColor.join(', ')})`;
            setMainColor(rgbColor);
        });
    }, [item.eventImage]);
    return (

    )
}