const productRouting = require('./handler/productRouter')
const notFoundRouting = require('./handler/notFoundRouting')
const handler = {
    "home" : productRouting.showHome,
    "product/create": productRouting.showFormCreate,
    "product/edit" : productRouting.showFormEdit,
    "product/delete" : productRouting.deleteProduct

}
module.exports = handler;
