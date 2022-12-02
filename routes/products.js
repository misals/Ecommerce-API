const express = require('express')
const router = express.Router()

const { getAllProducts, deleteProduct, createNewProduct, updateProductQuantity, } = require('../controllers/productsController')

router.route('/').get(getAllProducts)
router.route('/create').post(createNewProduct)
router.route('/:id/update_quantity').post(updateProductQuantity)
router.route('/:id').delete(deleteProduct)

module.exports = router