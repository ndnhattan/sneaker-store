const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
    brand: {
      type: String,
      required: true,
      lowercase: true,
    },
    model: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
    sizes: [
      {
        type: Number,
        required: true,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    salePrice: {
      type: Number,
      default: function () {
        return this.price;
      },
    },
    discount: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    imagesUrl: [
      {
        type: String,
        required: true,
      },
    ],
    code: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  if (this.isModified("title"))
    this.slug = slugify(this.title, {
      remove: /[*+~.()'"!:@/]/g, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: false, // strip special characters except replacement, defaults to `false`
      trim: true,
    });

  if (this.isModified("salePrice") || this.isModified("price")) {
    this.discount = Math.round((1 - this.salePrice / this.price) * 100);
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
