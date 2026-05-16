const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  const lastMessage = messages[messages.length - 1].content.toLowerCase();
  
  let reply = "וואו! ספרו לי עוד על זה! 🦉";
  
  if (lastMessage.includes("בעיה") || lastMessage.includes("ציפורים")) {
    reply = "איזו בעיה של ציפורים בחרתם? ספרו לי הכל! 🐦";
  } else if (lastMessage.includes("כוח") || lastMessage.includes("על")) {
    reply = "אילו כוחות מיוחדים תרצו שהגיבור יהיה? ✨";
  } else if (lastMessage.includes("גיבור") || lastMessage.includes("שם")) {
    reply = "איזה שם מגניב תרצו לגיבור? ואיך הוא נראה? 🦸‍♂️";
  } else if (lastMessage.includes("תודה") || lastMessage.includes("סיימנו")) {
    reply = "אתם מדהימים! כל הכבוד על המיזם שלכם! 🌟";
  }
  
  res.json({
    content: [{ text: reply }]
  });
});

app.listen(process.env.PORT || 3000);
