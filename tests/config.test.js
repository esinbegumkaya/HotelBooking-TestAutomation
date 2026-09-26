const test=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');
test('API fixture includes hotels and bookings arrays',()=>{const db=JSON.parse(fs.readFileSync('api/db.json','utf8'));assert.ok(Array.isArray(db.hotels));assert.ok(Array.isArray(db.bookings));assert.ok(db.hotels.length>0)});
test('Postman collection is present and has test groups',()=>{const c=JSON.parse(fs.readFileSync('postman/Booking API Test Collection.postman_collection.json','utf8'));assert.ok(c.item.length>=4)});
