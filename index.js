const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const questions = require('./questions.json');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/api/questions', (req, res) => {
  res.json(questions);
});

app.post('/api/submit', (req, res) => {
  const submittedAnswers = req.body;
  const score = calculateScore(submittedAnswers);
  res.json({ score });
});

// Function to calculate score based on submitted answers
function calculateScore(submittedAnswers) {
  let score = 0;
  for (const submittedAnswer of submittedAnswers) {
    const correctAnswer = questions.find(
      (q) => q.question === submittedAnswer.question
    ).answer;
    if (correctAnswer === submittedAnswer.answer) {
      score++;
    }
  }
  return score;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
