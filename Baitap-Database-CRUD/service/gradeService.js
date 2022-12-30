const Connection = require('../model/connection')
Connection.connecting1();

class GradeService{
    getProducts() {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`select * from grade`,(err, grades) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(grades)
                }
            })
        })
    }
}

module.exports = new GradeService();