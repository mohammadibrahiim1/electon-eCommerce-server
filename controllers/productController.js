// controllers/productController.js
import Product from "../models/Product.js";

// Get all products
export const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      brand,
      minPrice,
      maxPrice,
      search,
      sort,
    } = req.query;

    const query = {};

    if (category) query.category = category;
    if (brand) query.brand = brand;

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    let sortOptions = { createdAt: -1 }; // ডিফল্ট: নতুন প্রোডাক্ট আগে
    if (sort === "price_low") sortOptions = { price: 1 };
    if (sort === "price_high") sortOptions = { price: -1 };

    const skip = (Number(page) - 1) * Number(limit);

    const [products, totalCount] = await Promise.all([
      Product.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      Product.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        totalItems: totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: Number(page),
        limit: Number(limit),
        hasNextPage: skip + products.length < totalCount,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Create a product
export const createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const product = new Product({ name, price, description });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
