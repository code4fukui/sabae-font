import { addGlassesToSvgString } from "./addGlassesToSvgString.js";

const txt = await Deno.readTextFile("noto-a.svg");
const txt2 = addGlassesToSvgString(txt);
await Deno.writeTextFile("noto-a-megane.svg", txt2);
