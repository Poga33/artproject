const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')

const Product = require('../models/product')
const errorHandler = require('../helpers/dbErrorHandler')

// everytime there is ':productId' in products routes, this method runs and makes availaible on the request the 'product'
exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      res.status(400).json({ error: 'Product not found!' })
    }

    req.product = product
    next()
  })
}

exports.create = (req, res) => {
  let form = new formidable.IncomingForm()

  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: 'Image could not be uploaded' })
    }

    // check for all fields
    const { name, description, price, category, quantity, shipping } = fields
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: 'All fields are required!'
      })
    }

    let product = new Product(fields)

    if (files.photo) {
      // 1mb = 1000000
      if (files.photo.size > 5000000) {
        return res
          .status(400)
          .json({ error: 'Image size too big! Max file size is 5MB!' })
      }
      product.photo.data = fs.readFileSync(files.photo.path)
      product.photo.contentType = files.photo.type
    }

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) })
      }

      res.json(result)
    })
  })
}

exports.read = (req, res) => {
  req.product.photo = undefined

  return res.json(req.product)
}

exports.remove = (req, res) => {
  let product = req.product
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) })
    }

    res.json({ message: 'Product deleted successfully!' })
  })
}

exports.update = (req, res) => {
  let form = new formidable.IncomingForm()

  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: 'Image could not be uploaded' })
    }

    // check for all fields
    const { name, description, price, category, quantity, shipping } = fields
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: 'All fields are required!'
      })
    }

    let product = req.product
    product = _.extend(product, fields)

    if (files.photo) {
      // 1mb = 1000000
      if (files.photo.size > 5000000) {
        return res
          .status(400)
          .json({ error: 'Image size too big! Max file size is 5MB!' })
      }
      product.photo.data = fs.readFileSync(files.photo.path)
      product.photo.contentType = files.photo.type
    }

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) })
      }

      res.json(result)
    })
  })
}

/**
 * display products based on sell and arrival (new products)
 * by sell = /products?sortBy=sold&order=desc&limit=4
 * by arrival = /products?sortBy=createdAt&order=desc&limit=4
 *
 * if no params are sent from FE, then all products are returned
 */

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : 'asc'
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
  let limit = req.query.limit ? parseInt(req.query.limit) : 6

  Product.find()
    .select('-photo')
    .populate('category')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({ error: 'Products not found!' })
      }

      res.json(products)
    })
}

/**
 * it will find the product based on the request product's category
 * 'cuz when you create a product, that product is associated with a category based on category ID
 * other products that have the same category ID will be returned
 */
exports.listRelated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6

  Product.find({
    _id: { $ne: req.product },
    category: req.product.category
  })
    .limit(limit)
    .populate('category', '_id name')
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({ error: 'Products not found!' })
      }

      res.json(products)
    })
}
