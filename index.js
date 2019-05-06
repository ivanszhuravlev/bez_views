const redis = require('redis')
const express = require('express'); 
const app = express(); 
const port = 3001
const connect = require('./Connection')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const cors = require('cors');

  app.use(cors());
  app.get('/views/get/:id', (req, res) => { 
    connect.createConnection().then(client => {
        client.get(req.params.id, (err, results) => {
            if(results){
		var response = results;
		console.log('res',results)
		res.json({views:JSON.parse(results)})
            }else{
                console.log('err',err)
                res.json({views:JSON.parse('0')})
            }
        })
        client.quit((err, reply) => {
            if(!err){
//                console.log(reply)
            }else{
                console.log(err)
            }
        })
    })
  }); 
  app.get('/views/incr/:id', (req, res) => { 
    connect.createConnection().then(client => {
        client.incr(req.params.id, (err, results) => {
            if(results){
//	       res.setHeader('Access-Control-Allow-Origin', '*');
//	       res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
               res.json({views:JSON.parse(results)})
            }else{
                res.send(err)
            }
        })
        client.quit((err, reply) => {
            if(!err){
                console.log(reply)
            }else{
                console.log(err)
            }
        })
    })
   })


 
    

  app.listen(port, () => { 
    console.log('Example app listening on port!'); 
  });
