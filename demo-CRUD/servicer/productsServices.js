const Connection = require('../model/connection');
Connection.connecting();

class ProductsServices {
    static getProducts() {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query('select * from  product', (err, products) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(products);
                }
            })
        })
    }

    static saveProduct(product) {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`insert into product(name, price, description)
                              values ('${product.name}', ${product.price}, '${product.description}
                                      ') `, (err, products) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('Tạo thành công ')
                    resolve(products);
                }
            })
        })
    }

    static findById(id) {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`select *
                              from product
                              where id = ${id}`, (err, products) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(products);
                }
            })
        })
    }

    static editProduct(product, id) {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`update product
                              set name        = '${product.name}',
                                  price       = ${product.price},
                                  description = '${product.description}'
                              where id = ${id} `, (err, products) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('sửa thành công ')
                    resolve(products);
                }
            })
        })
    }

    static removeP(id) {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`delete
                              from product
                              where id = ${id}`, (err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('Xóa thành công')
                    resolve(id);
                }
            })
        })
    }
    static searchProduct(search) {
        let connection = Connection.getConnection();
        let sql = `SELECT * FROM product  WHERE name LIKE '%${search}%'`
        return new Promise((resolve, reject) => {
            connection.query(sql,(err, products) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(products);
                }
            })
        })
    }
}

module.exports = ProductsServices;
