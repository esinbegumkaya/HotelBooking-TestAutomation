// Low-concurrency local-only smoke check. Never run against a public deployment.
const assert=require('node:assert/strict');
const base=(process.env.API_URL||'http://127.0.0.1:3001').replace(/\/$/,'');
const host=new URL(base).hostname;
assert.ok(['localhost','127.0.0.1','::1','[::1]'].includes(host),'Performance smoke tests are restricted to local API hosts');
(async()=>{let failed=0;const times=[];for(let i=0;i<20;i++){
 const begin=performance.now();try{const r=await fetch(base+'/hotels');if(!r.ok)failed++;await r.arrayBuffer()}catch{failed++}
 times.push(performance.now()-begin);await new Promise(r=>setTimeout(r,100));}
 times.sort((a,b)=>a-b);console.log(JSON.stringify({requests:20,failed,p50Ms:Math.round(times[9]),p95Ms:Math.round(times[18])},null,2));if(failed)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
