const newman=require('newman'),path=require('node:path'),fs=require('node:fs');
const root=path.resolve(__dirname,'..');const collection=path.join(root,'postman','Booking API Test Collection.postman_collection.json');
const env=JSON.parse(fs.readFileSync(path.join(root,'postman','HotelBooking.postman_environment.json'),'utf8'));
const url=(process.env.API_URL||'http://localhost:3001').replace(/\/$/,'');
const base=env.values.find(v=>v.key==='baseUrl');base.value=url;
const out=path.join(root,'artifacts');fs.mkdirSync(out,{recursive:true});
newman.run({collection,environment:env,reporters:['cli','junit'],reporter:{junit:{export:path.join(out,'postman-junit.xml')}},timeoutRequest:30000},(err,summary)=>{
 if(err||summary.run.failures.length){console.error('Postman collection failed:',err||summary.run.failures.map(f=>f.error.message));process.exitCode=1}
 else console.log('Postman collection passed against '+url);
});
