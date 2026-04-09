const mongoose = require("mongoose");

// Review Schema (Sub-document for Product)
const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
  reviewerName: { type: String, required: true },
  reviewerEmail: { type: String, required: true },
});

// Product Schema
const productSchema = new mongoose.Schema(
  {
    // External ID (Optional if you want to keep the JSON id)
    id: { type: Number },

    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
    },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discountPercentage: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    stock: { type: Number, required: true },
    tags: [{ type: String }],
    brand: { type: String, trim: true },
    sku: { type: String, unique: true },
    weight: { type: Number },

    dimensions: {
      width: { type: Number },
      height: { type: Number },
      depth: { type: Number },
    },

    warrantyInformation: { type: String },
    shippingInformation: { type: String },
    availabilityStatus: {
      type: String,
      enum: ["In Stock", "Low Stock", "Out of Stock"],
      default: "In Stock",
    },

    // Reviews as an array of objects
    reviews: [reviewSchema],

    returnPolicy: { type: String },
    minimumOrderQuantity: { type: Number, default: 1 },

    meta: {
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
      barcode: { type: String },
      qrCode: { type: String },
    },

    images: [{ type: String }], // Array of image URLs
    thumbnail: { type: String, required: true },
  },
  {
    timestamps: true, // Automates createdAt and updatedAt for the whole document
  },
);

// Indexing for faster search
productSchema.index({ title: "text", brand: "text", category: "text" });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
