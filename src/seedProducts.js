const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const Product = require("./models/Product");

require("dotenv").config();

const categories = [
  "Electronics",
  "Fashion",
  "Books",
  "Home",
  "Sports",
  "Beauty",
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    // Remove old products
    await Product.deleteMany({});

    const products = [];

    for (let i = 1; i <= 100; i++) {
      products.push({
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: Number(faker.commerce.price({ min: 100, max: 5000 })),
        image: `https://picsum.photos/400/400?random=${i}`,
        category: faker.helpers.arrayElement(categories),
        stock: faker.number.int({ min: 0, max: 100 }),
        rating: faker.number.float({
          min: 1,
          max: 5,
          fractionDigits: 1,
        }),
      });
    }

    await Product.insertMany(products);

    console.log("100 Products Inserted Successfully");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedProducts();