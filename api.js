var Db  = require('./dboperations');
var users = require('./users');
const dboperations = require('./dboperations');
var config = require('./dbconfig');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);
const sql = require('mysql');
const pool=sql.createPool(config)

router.use((request,response,next)=>{
   console.log('middleware');
   next();
})

router.route('/users').get((request,response)=>{

    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('connection as id'+connection.threadId)
        connection.query("SELECT * from medicine_list",(err,rows)=>{
            connection.release();
            if(!err)
            {
                // console.log(rows)
                return(response.json(rows));
            }
        })
    }
   
   
  )
})
router.route('/userspost').post((request,response)=>{

    let user = {...request.body}
    
let query="SELECT * from login_user where user_id="+user?.userId;
console.log(query)
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('connection as id: '+connection.threadId)
        connection.query(query,(err,rows)=>{
            connection.release();
            if(!err)
            {
                // console.log(rows)
                return(response.json(rows));
            }
        })
    }
   
   
  )

})
router.route('/userssp').post((request,response)=>{

    let user = {...request.body}
    
let callsp="CALL SP_GET_DATA()";
console.log(callsp)
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('connection as id: '+connection.threadId)
        connection.query(callsp,(err,rows)=>{
            connection.release();
            if(!err)
            {
                // console.log(rows)
                return(response.json(rows));
            }else{
                return(err);
            }
        })
    }
   
   
  )

})
router.route('/userspost1').post((request,response)=>{

    let user = {...request.body}
    Db.getuserspost().then(data  => {
        console.log("data")
        response.status(200).json(data);
      })

})
var port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is runnning at ' + port);