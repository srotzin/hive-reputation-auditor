'use strict';
const express=require('express');const cors=require('cors');const app=express();const PORT=process.env.PORT||3025;
app.use(cors());app.use(express.json());app.use('/',require('./routes/health'));app.use('/',require('./routes/reputation'));
app.get('/',(_,r)=>r.json({service:'hive-reputation-auditor',version:'1.0.0',description:'Agent reputation auditing — trust scoring, behavior analysis, reliability metrics',endpoints:{"audit":"POST /v1/reputation/audit","score":"GET /v1/reputation/score/:did","stats":"GET /v1/reputation/stats","records":"GET /v1/reputation/records","health":"GET /health","pulse":"GET /.well-known/hive-pulse.json"}}));
const hc=require('./services/hive-client');
app.listen(PORT,async()=>{console.log(`[hive-reputation-auditor] Listening on port ${PORT}`);try{await hc.registerWithHiveTrust()}catch(e){}try{await hc.registerWithHiveGate()}catch(e){}});
module.exports=app;
