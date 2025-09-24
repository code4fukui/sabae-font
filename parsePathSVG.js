import { DOMParser } from "https://js.sabae.cc/DOMParser.js";

export const parsePathSVG = (svg) => {
  const dom = new DOMParser().parseFromString(svg, "text/html");
  const as = dom.querySelectorAll("path");
  //console.log(as);
  //if (as.length != 1) throw new Error("including multi path");
  //const d = as[0].getAttribute("d");
  const d = as.map(i => i.getAttribute("d")).join(" ");
  const dsvg = dom.querySelector("svg");
  const names = ["x", "y", "width", "height"];
  const vbox = dsvg.getAttribute("viewBox").split(" ").map(i => parseFloat(i));
  const res = {};
  res.path = d;
  names.forEach((i, idx) => res[i] = vbox[idx])
  //console.log(res);
  return res;
};

if (import.meta.main) {
  //const fn = "./src/sabaefont_alphabet_a.svg";
  const fn = "./src_split_svg/4.svg";
  const svg = await Deno.readTextFile(fn);
  const res = parsePathSVG(svg);
  console.log(res);
}
