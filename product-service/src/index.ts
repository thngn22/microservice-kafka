import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { createConsumer } from "./kafka";

const app = express();
app.use(bodyParser.json());

interface Product {
  id: number;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Phone", price: 500 },
];

const listenForOrders = async () => {
  const consumer = await createConsumer("product-group"); // Kafka consumer nhóm
  await consumer.subscribe({ topic: "order_created", fromBeginning: true });

  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const order = JSON.parse(message.value.toString());
      const product = products.find((p) => p.id === order.productId);

      if (product) {
        console.log(
          `Product ${product.name} has been ordered by user ID ${order.userId}`
        );
      } else {
        console.log(`Product ID ${order.productId} not found.`);
      }
    },
  });
};

listenForOrders();

app.get("/products/:id", (req: Request, res: Response) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  product
    ? res.json(product)
    : res.status(404).json({ error: "Product not found" });
});

const PORT = 5002;
app.listen(PORT, () => console.log(`Product Service running on port ${PORT}`));
