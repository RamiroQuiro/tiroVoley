import React from "react";
import { Card } from "../common/Card";

/**
 * Gallery component
 */
export default function Galleria() {
  const imgs = [
    "https://pub-cdn.sider.ai/u/U0W8H74RGY3/web-coder/6932db26d9e33362d27b375d/resource/15f1d9cf-2533-47b8-87da-c68cb36d52f8.jpg",
    "https://pub-cdn.sider.ai/u/U0W8H74RGY3/web-coder/6932db26d9e33362d27b375d/resource/6e4e3a51-186c-4ec1-ae1a-99822f60d5ec.jpg",
    "https://pub-cdn.sider.ai/u/U0W8H74RGY3/web-coder/6932db26d9e33362d27b375d/resource/c7515354-63c3-4738-a06f-7fed817a9f46.jpg",
    "https://pub-cdn.sider.ai/u/U0W8H74RGY3/web-coder/6932db26d9e33362d27b375d/resource/c768980e-56c5-4950-ae5e-4117eead3bf4.jpg",
    "https://pub-cdn.sider.ai/u/U0W8H74RGY3/web-coder/6932db26d9e33362d27b375d/resource/15f1d9cf-2533-47b8-87da-c68cb36d52f8.jpg",
    "https://pub-cdn.sider.ai/u/U0W8H74RGY3/web-coder/6932db26d9e33362d27b375d/resource/6e4e3a51-186c-4ec1-ae1a-99822f60d5ec.jpg",
    "https://pub-cdn.sider.ai/u/U0W8H74RGY3/web-coder/6932db26d9e33362d27b375d/resource/c7515354-63c3-4738-a06f-7fed817a9f46.jpg",
    "https://pub-cdn.sider.ai/u/U0W8H74RGY3/web-coder/6932db26d9e33362d27b375d/resource/c768980e-56c5-4950-ae5e-4117eead3bf4.jpg",
  ];

  return (
    <Card className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 md:p-6">
      {imgs.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`galeria-${i}`}
          className="w-full h-48 md:h-64 lg:h-96 object-cover rounded"
        />
      ))}
    </Card>
  );
}
