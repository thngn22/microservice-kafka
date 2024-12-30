import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { createConsumer } from "./kafka";

const app = express();
app.use(bodyParser.json());

interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

const listenForOrders = async () => {
  const consumer = await createConsumer("user-group"); // Kafka consumer nhóm
  await consumer.subscribe({ topic: "order_created", fromBeginning: true });

  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const order = JSON.parse(message.value.toString());
      const user = users.find((u) => u.id === order.userId);

      if (user) {
        console.log(
          `User ${user.name} has placed an order for product ID ${order.productId}`
        );
      } else {
        console.log(`User ID ${order.userId} not found.`);
      }
    },
  });
};

listenForOrders();

app.get("/users/:id", (req: Request, res: Response) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  user ? res.json(user) : res.status(404).json({ error: "User not found" });
});

const PORT = 5001;
app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));
