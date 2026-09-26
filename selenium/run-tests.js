const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process');
const folder=path.join(__dirname,'tests');const tests=fs.readdirSync(folder).filter(f=>/^\d+_.*\.test\.js$/.test(f)).sort();
const artifacts=path.join(__dirname,'artifacts');fs.mkdirSync(artifacts,{recursive:true});
const results=[];
for(const name of tests){const begin=Date.now();console.log('\nRUN '+name);
 const p=spawnSync(process.execPath,[path.join(folder,name)],{stdio:'inherit',env:process.env});
 results.push({name,passed:p.status===0,durationMs:Date.now()-begin});}
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
fs.writeFileSync(path.join(artifacts,'results.json'),JSON.stringify(results,null,2));
fs.writeFileSync(path.join(artifacts,'junit.xml'),`<?xml version="1.0" encoding="UTF-8"?><testsuite name="Selenium" tests="${results.length}" failures="${results.filter(r=>!r.passed).length}">${results.map(r=>`<testcase name="${escape(r.name)}" time="${r.durationMs/1000}">${r.passed?'':`<failure message="Test failed; see console and screenshots"/>`}</testcase>`).join('')}</testsuite>`);
fs.writeFileSync(path.join(artifacts,'report.html'),`<!doctype html><html><head><meta charset="utf-8"><title>Hotel Booking Test Report</title><style>body{font:16px system-ui;max-width:900px;margin:50px auto}table{border-collapse:collapse;width:100%}td,th{padding:12px;border-bottom:1px solid #ddd;text-align:left}.pass{color:green}.fail{color:#c22}</style></head><body><h1>Hotel Booking · Selenium Report</h1><p>${results.filter(r=>r.passed).length}/${results.length} passed</p><table><tr><th>Test</th><th>Status</th><th>Duration</th></tr>${results.map(r=>`<tr><td>${escape(r.name)}</td><td class="${r.passed?'pass':'fail'}">${r.passed?'PASS':'FAIL'}</td><td>${r.durationMs} ms</td></tr>`).join('')}</table></body></html>`);
console.log(`\n${results.filter(r=>r.passed).length}/${results.length} tests passed. Report: selenium/artifacts/report.html`);
if(results.some(r=>!r.passed))process.exitCode=1;
