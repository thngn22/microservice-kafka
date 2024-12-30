import { Kafka, Producer, Consumer } from "kafkajs";

// Cấu hình Kafka
const kafka = new Kafka({
  brokers: ["kafka:9092"], // Đảm bảo kết nối đến đúng Kafka broker
});

// Hàm tạo Kafka Producer
export const createProducer = async (): Promise<Producer> => {
  const producer = kafka.producer();
  await producer.connect();
  return producer;
};

// Hàm tạo Kafka Consumer
export const createConsumer = async (groupId: string): Promise<Consumer> => {
  const consumer = kafka.consumer({ groupId });
  await consumer.connect();
  return consumer;
};
