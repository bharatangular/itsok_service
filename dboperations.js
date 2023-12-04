var config = require('./dbconfig');
const sql = require('mysql');
const pool=sql.createPool(config)
async function getusers() {
   
        pool.getConnection((err,connection)=>{
            if(err) throw err;
            console.log('connection as id ${connection.threadId}')
            connection.query("SELECT * from login_user",(err,rows)=>{
                connection.release();
                if(!err)
                {
                    // console.log(rows)
                    return rows
                }
            })
        }
       
        // let pool = await sql.connect(config);
        // let users = await pool.request().query("SELECT * from login_user");
        // return users.recordsets;
      )

}
async function getuserspost(){
   
        try {
           
            let  user = await  pool.request().query("SELECT * from login_user");
            return  user.recordsets;
          }
          catch (error) {
            console.log(error);
          }
        // connection.query("SELECT * from login_user",(err,rows)=>{
        //     connection.release();
        //     if(!err)
        //     {
        //         // console.log(rows)
        //         return 
        //     }
        // })
    }
   
  
  


module.exports = {
    getusers: getusers,
    getuserspost:getuserspost    
}