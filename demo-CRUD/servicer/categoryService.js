const Connection = require('../model/connection');
Connection.connecting();

class CategoryService{
    static findAll() {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query('select * from  category', (err, categories) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(categories);
                }
            })
        })
    }
}

module.exports = new CategoryService();