const Product = require('../models/product')
    // To get all the products from the database
const getAllProducts = async(req, res) => {
    try {
        const products = await Product.find({})
        if (products.length < 1) {
            res.status(200).json({
                msg: 'No products found'
            })
            return
        }
        if (products) {
            res.status(200).json({
                data: products
            })
        }
    } catch (error) {
        res.status(404).json({
            msg: "There was an error finding products"
        })

    }

}

// To create a new product in our database
const createNewProduct = async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(201).json({
            data: {
                product
            }
        });
    } catch (error) {
        res.status(400).json({
            data: {
                msg: "There was an error creating new product"
            }
        })
    }
}

// To delete a single product from our database
const deleteProduct = async(req, res) => {
    try {
        const {
            id: productID
        } = req.params
        const product = await Product.findOneAndDelete({
            _id: productID
        })
        if (!product) {
            return
        }
        res.status(200).send({
            data: {
                msg: "Product Deleted"
            }
        })
    } catch (error) {
        res.status(400).send({
            data: {
                msg: error
            }
        })
    }
}

// To update the product quantity in the database
const updateProductQuantity = async(req, res) => {
    try {

        // Destructuring the ProductID and Number query
        const {
            id: productID
        } = req.params
        const {
            number
        } = req.query

        if (!number) {
            res.status(400).json({
                data: {
                    msg: "Error while updating quantity"
                }
            })
            return
        }

        const product = await Product.findOne({
                _id: productID
            })
            // Adding the new numebr from the query params and the previous number of product
        let newQuantity = product.quantity + (+number)

        if (newQuantity > 0) {
            // Updating the data in the database
            const updatedProduct = await Product.findOneAndUpdate({
                _id: productID
            }, {
                quantity: newQuantity
            }, {
                new: true,
                runValidators: true
            })
            res.status(200).json({
                data: {
                    updatedProduct,
                    msg: "Successfully Updated"
                }
            })
        } else {
            res.status(400).json({
                data: {
                    msg: "Product quantity can not be zero or less"
                }
            })
            return
        }
    } catch (error) {
        res.status(400).json({
            data: {
                msg: "Error while updating quantity"
            }
        })
    }
}

module.exports = {
    getAllProducts,
    createNewProduct,
    deleteProduct,
    updateProductQuantity
}