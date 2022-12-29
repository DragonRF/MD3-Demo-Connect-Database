const fs = require('fs');
const productServices = require('C:\\Users\\Nitro\\WebstormProjects\\MD3-Demo-Connect-Database\\ChuaBai\\servicer\\productsServices.js');
const qs = require('qs')
const categoryService = require('C:\\Users\\Nitro\\WebstormProjects\\MD3-Demo-Connect-Database\\demo-CRUD\\servicer\\categoryService.js')
class ProductRouting {
    static getHtmlProducts(products, indexHtml) {
        let tbody = '';
        products.map((product, index) => {
            tbody += ` <tr>

                <th scope="row">${index}</th>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.nameCategory}</td>
                <td><a href="product/edit/${product.id}" class="btn btn-danger">Edit</a></td>
                <td><a href="product/delete/${product.id}" class="btn btn-danger">Delete</a></td>
            </tr>`
        });
        indexHtml = indexHtml.replace('{products}', tbody);
        return indexHtml;
    }

    static showHome(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./view/index.html', 'utf-8', async (err, indexHtml) => {
                if (err) {
                    console.log(err)
                } else {
                    let products = await productServices.getProducts();
                    indexHtml = ProductRouting.getHtmlProducts(products, indexHtml);
                    res.writeHead(200, 'text/html');
                    res.write(indexHtml);
                    res.end();
                }
            })
        } else {
            let data = '';
            req.on('data', chuck => {
                data += chuck;
            })
            req.on('end',async (err) => {
                if (err) {
                    console.log(err)
                } else {
                    let search = qs.parse(data)
                    console.log(search.search)
                    fs.readFile('./view/index.html', 'utf-8', async (err, indexHtml) => {
                        if (err) {
                            console.log(err)
                        } else {
                            let products = await productServices.searchProduct(search.search)
                            indexHtml = ProductRouting.getHtmlProducts(products, indexHtml);
                            res.writeHead(200, 'text/html');
                            res.write(indexHtml);
                            res.end();
                        }
                    })
                }
            })
        }
    }

    static showFormCreate(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./view/product/create.html', 'utf-8', async (err, indexHtml) => {
                if (err) {
                    console.log(err);
                } else {
                    let categories = categoryService.findAll()
                    let options = ''
                    categories.map(category =>{
                        console.log(category)
                        options += `
                        <option value=${category.idCategory}>${category.nameCategory}</option>
                         `
                    })
                    indexHtml = indexHtml.replace('{categories}', options)

                    res.writeHead(200, 'text/html');
                    res.write(indexHtml)
                    res.end()
                }
            });
        } else {
            let productChunk = ''
            req.on('data', chunk => {
                productChunk += chunk;
            });
            req.on('end', async (err) => {
                if (err) {
                    console.log(err)
                } else {
                    let products = qs.parse(productChunk);
                    await productServices.saveProduct(products);
                    res.writeHead(301, {'location': '/home'})
                    res.end()
                }
            });

        }
    }

    static showFormEdit(req, res, id) {
        if (req.method === 'GET') {
            fs.readFile('./view/product/edit.html', 'utf-8', async (err, editHtml) => {
                if (err) {
                    console.log(err);
                } else {
                    let product = await productServices.findById(id);
                    editHtml = editHtml.replace('{name}', product[0].name);
                    editHtml = editHtml.replace('{price}', product[0].price);
                    editHtml = editHtml.replace('{description}', product[0].description);
                    res.writeHead(200, 'text/html');
                    res.write(editHtml)
                    res.end()
                }
            });
        } else {
            let productChunk = ''
            req.on('data', chunk => {
                productChunk += chunk;
            });
            req.on('end', async (err) => {
                if (err) {
                    console.log(err)
                } else {
                    let products = qs.parse(productChunk);
                    await productServices.editProduct(products, id);
                    res.writeHead(301, {'location': '/home'})
                    res.end()
                }
            });
        }
    }

    static deleteProduct(req, res, id) {
        if (req.method === 'GET') {
            fs.readFile('./view/product/delete.html', 'utf-8', async (err, deleteHtml) => {
                if (err) {
                    console.log(err);
                } else {

                    res.writeHead(200, 'text/html');
                    deleteHtml = deleteHtml.replace('{id}', id)
                    res.write(deleteHtml)
                    res.end()
                }
            });
        } else {
            productServices.removeP(id).then(()=>{
                res.writeHead(301, {'location': '/home'})
                res.end();
            }
            )

        }
    }

}

module.exports = ProductRouting;
