const mysql = require('mysql');

class Connection {
  static  configToMySQL = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'democase',
        charset: 'utf8_general_ci'
    }

   static getConnection() {
        return mysql.createConnection(Connection.configToMySQL);
    }
    static connecting(){
      Connection.getConnection().connect(err=>{
          if(err){
              console.log(err);
          }else {
              console.log('Kết nối thành công')
          }
      })
    }
}
module.exports = Connection;
