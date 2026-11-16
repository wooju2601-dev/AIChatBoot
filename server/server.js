const express = require("express");
const cors = require("cors");
require("dotenv").config();

const OpenAI = require("openai");

const app = express();
const port = 5001;

// OpenAI 연결
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 미들웨어 설정
app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

app.use(express.json());

//서버 상태 확인
app.get("/", (req, res) => {
  res.send("AI Chat Server is running!");
});

// AI 채팅 API
app.post("/api/chat", async (req, res) => {
  try {
    const { userMessage, systemPrompt } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("OpenAI API 오류:", error.message);

    res.status(500).json({
      error: "AI 응답을 가져오지 못했습니다.",
    });
  }
});

// 서버 실행
app.listen(port, () => {
  console.log(`서버 실행 중: http://localhost:${port}`);
});
