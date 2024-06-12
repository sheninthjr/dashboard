import express from 'express';

const app = express();
const PORT = 3000;

app.use(express());
app.use(express.json());

app.get('/health', (req, res) => {
  res.send('Worker is working successfully');
});

app.get('/submission', (req, res) => {
  const { username, leetcode_url } = req.body;
  // Logic to find whether the user submitted the code in the leetcode.
});

app.listen(PORT, () => {
  console.log(`Server is listening on the port ${PORT}`);
});
