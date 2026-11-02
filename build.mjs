import sharp from "sharp";import fs from "fs";
fs.mkdirSync("img/t",{recursive:true});fs.mkdirSync("img/f",{recursive:true});
for(const f of fs.readdirSync("img").filter(x=>x.endsWith(".webp"))){
await sharp("img/"+f).rotate().resize(600).webp({quality:72}).toFile("img/t/"+f);
await sharp("img/"+f).rotate().resize({width:1400,height:1800,fit:"inside",withoutEnlargement:true}).webp({quality:78}).toFile("img/f/"+f+".tmp");
fs.renameSync("img/f/"+f+".tmp","img/f/"+f);fs.unlinkSync("img/"+f);}
const svg=fs.readFileSync("icons/emordes_logo_white.svg");
async function icon(size,logoW,out){const lg=await sharp(svg,{density:150}).resize({width:Math.round(size*logoW)}).png().toBuffer();
await sharp({create:{width:size,height:size,channels:4,background:"#0b0b0b"}}).composite([{input:lg,gravity:"center"}]).png().toFile(out)}
await icon(180,.86,"icons/apple-touch-icon.png");await icon(192,.86,"icons/icon-192.png");await icon(512,.86,"icons/icon-512.png");await icon(512,.62,"icons/icon-maskable-512.png");
