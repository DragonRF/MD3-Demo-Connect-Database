const Connection = require('../model/connection')
Connection.connecting1();

class ProductService {
    static getProducts() {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`select p.id ,p.price, p.name , p.image , p.description, p.idGrade, t.graded  from products p join grade t on p.idGrade = t.id`,(err, product) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(product)
                }
            })
        })
    }
    static finById(id) {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM products WHERE id = ${id}`,(err, product) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(product)
                }
            })
        })
    }
    static editProduct(product, id) {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE products SET name = '${product.name}', image = '${product.image}',price = ${product.price},\`description\` = '${product.description}', idGrade = ${product.grade}  WHERE id = ${id}`,(err, product) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(product)
                }
            })
        })
    }
    static createProduct(product) {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO products(name, image, price, description,idGrade) VALUE ('${product.name}','abc',${product.price},'${product.description}',${product.grade})`,(err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }
    static editImage(image, id) {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE products SET image = '${image}' WHERE id = ${id}`,(err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }
    static deleteProduct(id) {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM products WHERE id = ${id}`,(err) => {
                if (err) {
                    reject(err)
                } else {
                    console.log('Xoa Thanh Cong !!!')
                }
            })
        })
    }
    static searchProduct(search) {
        let connection = Connection.getConnection();
        let sql = `SELECT * FROM products  WHERE name LIKE '%${search}%'`
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
module.exports = ProductService;