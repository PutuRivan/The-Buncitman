import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  // Beans Product
  {
    id: 1,
    name: "Arabica",
    description:
      "The species of Arabica from the genus Coffea. This species is believed to be the first cultivated species of coffee, and it is the dominant cultivar, representing about 0% of global coffee production.",
    price: 95000,
    imageUrl:
      "https://res.cloudinary.com/dadbyegpl/image/upload/v1731460311/TheBuncitman/Arabica.jpg",
  },
  {
    id: 2,
    name: "Robusta",
    description:
      "Robusta is a plant native to Africa, including the regions of the Congo, Sudan, Liberia, and Uganda. Coffee Robusta began to be developed on a large scale in the early 20th century by the colonial governments of the Netherlands in Indonesia.",
    price: 78000,
    imageUrl:
      "https://res.cloudinary.com/dadbyegpl/image/upload/v1731459916/TheBuncitman/Robusta.jpg",
  },
  {
    id: 3,
    name: "Liberica",
    description:
      "This coffee is known for its large and unusual seeds. Characteristics: Liberica has a diverse flavor, ranging from fruity to slightly woody.",
    price: 55000,
    imageUrl:
      "https://res.cloudinary.com/dadbyegpl/image/upload/v1731460310/TheBuncitman/Liberica.jpg",
  },
  {
    id: 4,
    name: "Excelsa",
    description:
      "The seeds of coffee Excelsa are a unique variety known for their fruit flavor to wine flavor and unique shape. Coffee Excelsa is part of the Liberica family and was first found in Africa before being cultivated in Asia and India.",
    price: 85000,
    imageUrl:
      "https://res.cloudinary.com/dadbyegpl/image/upload/v1731460308/TheBuncitman/Excelsa.jpg",
  },
  {
    id: 5,
    name: "Decaf",
    description:
      "Decaf coffee is coffee that contains almost no caffeine. The coffee has undergone a special process in which its caffeine content has been reduced to the maximum.",
    price: 58000,
    imageUrl:
      "https://res.cloudinary.com/dadbyegpl/image/upload/v1731460307/TheBuncitman/Decaf.jpg",
  },
  {
    id: 6,
    name: "Luwak Coffee",
    description:
      "Coffee brewing using coffee beans taken from the remains of a civet/musang (a type of small mammal)",
    price: 50000,
    imageUrl:
      "https://res.cloudinary.com/dadbyegpl/image/upload/v1731460309/TheBuncitman/Luwak.webp",
  },
  {
    id: 7,
    name: "Catimor",
    description:
      "This is a hybrid of Arabica and Robusta coffee. Uniquely, in terms of shape, this coffee resembles Arabica, while in terms of taste, it resembles Robusta.",
    price: 100000,
    imageUrl:
      "https://res.cloudinary.com/dadbyegpl/image/upload/v1731645459/TheBuncitman/Catimor.jpg",
  },
  {
    id: 8,
    name: "Kolombia",
    description:
      "This type of coffee falls under the category of Arabica coffee. However, this coffee is only developed in Colombia.",
    price: 98000,
    imageUrl:
      "https://res.cloudinary.com/dadbyegpl/image/upload/v1731645459/TheBuncitman/Kolombia.jpg",
  },
  {
    id: 9,
    name: "Gayo",
    description:
      "This coffee originates from high-altitude coffee plants in Indonesia and is popular in countries like the United States and Europe.",
    price: 65000,
    imageUrl:
      "https://res.cloudinary.com/dadbyegpl/image/upload/v1731645459/TheBuncitman/Gayo.jpg",
  },
  {
    id: 10,
    name: "Jamaica",
    description:
      "This Jamaican coffee has a light, creamy, and non-bitter taste. It is known for its premium flavor, which justifies its high price.",
    price: 137500,
    imageUrl:
      "https://res.cloudinary.com/dadbyegpl/image/upload/v1731645459/TheBuncitman/Jamaica.jpg",
  },
  {
    id: 11,
    name: "Toraja",
    description:
      "This coffee also originates from Indonesia, specifically from Tanah Toraja, Sulawesi. It has a fruity and spicy flavor.",
    price: 73000,
    imageUrl:
      "https://res.cloudinary.com/dadbyegpl/image/upload/v1731645459/TheBuncitman/Toraja.jpg",
  },
  {
    id: 12,
    name: "Geisha",
    description:
      "Toppers is a unique and interesting coffee variant. According to coffee enthusiasts, this type of coffee has an exceptional and amazing flavor.",
    price: 99000,
    imageUrl:
      "https://res.cloudinary.com/dadbyegpl/image/upload/v1731645458/TheBuncitman/Geisha.jpg",
  },
  {
    id: 13,
    name: "Catuai",
    description:
      "Toppers has elements of Robusta coffee. Its acidity level is not too high. Although it is bitter, it has a strong fruity and floral flavor.",
    price: 85000,
    imageUrl:
      "https://res.cloudinary.com/dadbyegpl/image/upload/v1731645459/TheBuncitman/Catuai.jpg",
  },
  {
    id: 14,
    name: "Pacamara",
    description:
      "This coffee has an amazing flavor. It has a unique taste profile, with flavors of sweet chocolate, butterscotch, and sweet citrus.",
    price: 585000,
    imageUrl:
      "https://res.cloudinary.com/dadbyegpl/image/upload/v1731645459/TheBuncitman/Pacamara.jpg",
  },

  // Drink Product
  {
    id: 15,
    name: "Milk Coffee",
    description:
      "Coffee milk has a long and rich history. This drink was first found in the Arab world in the 15th century. At that time, coffee milk was served as a warm drink to warm the body.",
    price: 22000,
    imageUrl:
      "https://res.cloudinary.com/dadbyegpl/image/upload/v1731460309/TheBuncitman/Milk%20Coffe.png",
  },
  {
    id: 16,
    name: "Americano",
    description:
      "An Americano is espresso with hot water added. In terms of taste, it is naturally lighter than espresso.",
    price: 18000,
    imageUrl:
      "https://res.cloudinary.com/dadbyegpl/image/upload/v1731460311/TheBuncitman/Americano.jpg",
  },
  {
    id: 17,
    name: "Moccacino",
    description:
      "A drink made from a mixture of espresso, milk, and chocolate. This drink is also known as a mocha and is a variation of latte with added chocolate.",
    price: 24000,
    imageUrl:
      "https://res.cloudinary.com/dadbyegpl/image/upload/v1731460310/TheBuncitman/Moccacino.jpg",
  },
  {
    id: 18,
    name: "Espresso",
    description:
      "Espresso is a type of coffee made by extracting ground coffee beans with hot water under high pressure.",
    price: 12000,
    imageUrl:
      "https://res.cloudinary.com/dadbyegpl/image/upload/v1731460307/TheBuncitman/Espresso.jpg",
  },
  {
    id: 19,
    name: "Macchiato",
    description:
      "A drink made from espresso with a small amount of frothed or condensed milk.",
    price: 24000,
    imageUrl:
      "https://res.cloudinary.com/dadbyegpl/image/upload/v1731460309/TheBuncitman/Macchiato.jpg",
  },
  {
    id: 20,
    name: "Coffee Latte",
    description:
      "An Italian coffee drink made from espresso, steamed milk, and a thin layer of foam on top.",
    price: 22000,
    imageUrl:
      "https://res.cloudinary.com/dadbyegpl/image/upload/v1731460309/TheBuncitman/Latte.jpg",
  },
  {
    id: 21,
    name: "Cappucino",
    description:
      "This drink is made from a combination of 1/3 espresso, 1/3 hot milk, and 1/3 milk foam or milk foam. This type of coffee is suitable for those who like a creamy texture.",
    price: 23000,
    imageUrl:
      "https://res.cloudinary.com/dadbyegpl/image/upload/v1731460311/TheBuncitman/Cappucino.jpg",
  },
  {
    id: 22,
    name: "Affogato",
    description:
      "This type of coffee drink is often considered a dessert or end dish by some people. Because Affogato is made with a glass of hot espresso added to one scoop of vanilla ice cream.",
    price: 26000,
    imageUrl:
      "https://res.cloudinary.com/dadbyegpl/image/upload/v1731460310/TheBuncitman/Affogato.jpg",
  },
  {
    id: 23,
    name: "Cold Brew",
    description:
      "This cold brew coffee has a slightly acidic and sweet flavor.",
    price: 20000,
    imageUrl:
      "https://res.cloudinary.com/dadbyegpl/image/upload/v1731460311/TheBuncitman/Cold%20Brew.jpg",
  },
  {
    id: 24,
    name: "Long Black",
    description:
      "Long Black is often compared to Americano. Indeed, Long Black is a type of coffee drink that also uses a combination of water and espresso, but the preparation method is different from Americano",
    price: 18000,
    imageUrl:
      "https://res.cloudinary.com/dadbyegpl/image/upload/v1731460308/TheBuncitman/Long%20Black.jpg",
  },
  {
    id: 25,
    name: "Mocha Latte",
    description:
      "A mocha latte is a drink made from a combination of espresso and chocolate syrup or powder.",
    price: 22000,
    imageUrl:
      "https://res.cloudinary.com/dadbyegpl/image/upload/v1731460310/TheBuncitman/Mocca%20Latte.jpg",
  },
];

async function main() {
  console.log("Start Seeding...");
  const CoffeeBeans = await prisma.categories.create({
    data: {
      name: "Coffee Beans",
    },
  });

  const CoffeeDrinks = await prisma.categories.create({
    data: {
      name: "Coffee Drinks",
    },
  });

  for (const item of products) {
    const product = await prisma.product.create({
      data: {
        name: item.name,
        description: item.description,
        price: item.price,
        imageUrl: item.imageUrl,
      },
    });

    console.log(`Seeding product: ${item.name} dan id: ${product.id}`);

    if (item.id < 15) {
      await prisma.productCategories.create({
        data: {
          product: {
            connect: {
              id: product.id,
            },
          },
          category: {
            connect: {
              id: CoffeeBeans.id,
            },
          },
        },
      });
    }

    if (item.id > 14 && item.id < 26) {
      await prisma.productCategories.create({
        data: {
          product: {
            connect: {
              id: product.id,
            },
          },
          category: {
            connect: {
              id: CoffeeDrinks.id,
            },
          },
        },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
