const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let stage = 1;
let problem = "";
let powers = "";
let hero = "";

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  const last = messages[messages.length - 1].content.toLowerCase().trim();
  let reply = "";

  // שלב 1 - הבעיה
  if (stage === 1) {
    if (last.includes("שלום") || last.includes("היי") || last.includes("מה שלומך")) {
      reply = "שלום! 🦉 אני Super Wiser — מומחית לגיבורי על! אני כאן כדי לעזור לכם להמציא גיבור על שיציל את הציפורים. מוכנים?";
    } else if (last.includes("כן") || last.includes("מוכן") || last.includes("בואו")) {
      reply = "מצוין! בואו נחליט איזו בעיה של ציפורים אנחנו רוצים לפתור.\n\nלדוגמה: 'ציפורים לא מוצאות מקום לקנן כי אנשים כורתים עצים'.\n\nמה מפריע לכם? ספרו לי! 🐦";
    } else {
      problem = last;
      reply = `וואו! '${last}' — זו בעיה חשובה מאוד! 👏\n\nעכשיו בואו נחשוב — אילו כוחות על צריך כדי לפתור את הבעיה הזאת? ✨`;
      stage = 2;
    }
  } 
  // שלב 2 - כוחות על
  else if (stage === 2) {
    powers = last;
    reply = `מעולה! '${last}' — כוחות נהדרים! 💪\n\nעכשיו בואו נמציא את הגיבור. איזה שם תרצו לו? איך הוא נראה? מה הוא יכול לעשות? 🦸‍♂️`;
    stage = 3;
  } 
  // שלב 3 - הגיבור
  else if (stage === 3) {
    hero = last;
    reply = `אתם פשוט מדהימים! 🌟\n\nהגיבור שלכם נשמע מדהים! תודה שהשתתפתם. תרצו להוסיף עוד משהו?`;
    stage = 4;
  } 
  else {
    reply = "אתם גיבורים אמיתיים! 🦸‍♂️ כל הכבוד על המיזם שלכם!";
  }

  res.json({ content: [{ text: reply }] });
});

app.listen(process.env.PORT || 3000);
