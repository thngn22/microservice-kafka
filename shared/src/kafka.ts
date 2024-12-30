import { Kafka, Producer } from "kafkajs";

export const kafka = new Kafka({
  brokers: ["kafka:9092"], // Đảm bảo sử dụng tên dịch vụ 'kafka' thay vì 'localhost'
});

export const createProducer = async (): Promise<Producer> => {
  const producer = kafka.producer();
  await producer.connect();
  return producer;
};

export const createConsumer = async (groupId: string) => {
  const consumer = kafka.consumer({ groupId });
  await consumer.connect();
  return consumer;
};
