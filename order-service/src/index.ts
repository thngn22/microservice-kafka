import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { createProducer } from "./kafka"; // Kafka producer trong service này

const app = express();
app.use(bodyParser.json());

app.post("/orders", async (req: Request, res: Response) => {
  const { userId, productId } = req.body;

  try {
    const producer = await createProducer(); // Tạo Kafka producer
    const result = await producer.send({
      topic: "order_created", // Tên Kafka topic
      messages: [
        {
          value: JSON.stringify({ userId, productId }), // Nội dung sự kiện
        },
      ],
    });

    // Log kết quả gửi message
    console.log("Message sent to Kafka:", result);

    res.status(201).json({
      message: "Order created successfully",
      userId,
      productId,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating order" });
  }
});

const PORT = 5003;
app.listen(PORT, () => console.log(`Order Service running on port ${PORT}`));
