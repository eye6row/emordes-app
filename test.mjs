import {chromium,devices} from "playwright";import http from "http";import fs from "fs";import path from "path";
const mt={".html":"text/html",".js":"text/javascript",".css":"text/css",".svg":"image/svg+xml",".webp":"image/webp",".png":"image/png",".webmanifest":"application/manifest+json"};
const srv=http.createServer((q,r)=>{let p=q.url.split("?")[0];if(p=="/")p="/index.html";const f=path.join(process.cwd(),p);fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);r.end()}else{r.writeHead(200,{"content-type":mt[path.extname(f)]||"text/plain"});r.end(d)}})}).listen(45873);
const b=await chromium.launch({executablePath:process.env.CH});const c=await b.newContext({...devices["iPhone 14"]});const pg=await c.newPage();
const errs=[];pg.on("pageerror",e=>errs.push(e.message));pg.on("console",m=>m.type()=="error"&&errs.push(m.text()));pg.on("requestfailed",r=>errs.push("fail "+r.url()));
await pg.goto("http://localhost:45873/");await pg.waitForTimeout(800);
for(const t of ["home","archive","events","drops","contact"]){await pg.click('.tabs [data-go="'+t+'"]');await pg.waitForTimeout(900);await pg.screenshot({path:"screens/"+t+".png"})}
await pg.click('.tabs [data-go="archive"]');await pg.waitForTimeout(500);await pg.click("#grid button");await pg.waitForTimeout(700);await pg.screenshot({path:"screens/lightbox.png"});
await pg.click("#lbnx");await pg.waitForTimeout(300);console.log(await pg.textContent("#lbc"));
const ov=await pg.evaluate(()=>document.documentElement.scrollWidth>innerWidth);console.log("hscroll",ov);
await pg.waitForTimeout(1500);console.log("sw",await pg.evaluate(async()=>{const r=await navigator.serviceWorker.ready;return !!r.active}));
await c.setOffline(true);await pg.goto("http://localhost:45873/");await pg.waitForTimeout(500);console.log("offline title",await pg.title());
console.log("errors",errs);await b.close();srv.close();