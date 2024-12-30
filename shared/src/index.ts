// src/index.ts
import { logger } from "./logger";
import { createConsumer } from "./kafka";

console.log("Shared service is running...");
logger("Service started");

// Khởi tạo consumer và kết nối
createConsumer("my-group")
  .then((consumer) => {
    console.log("Consumer connected");
  })
  .catch((error) => {
    console.error("Error connecting consumer", error);
  });
