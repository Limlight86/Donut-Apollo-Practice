const PORT = process.env.PORT || 3000;

const express = require('express');
const pg = require('pg');

const app = express();

app.use(express.static('public'));
app.use(express.json());

const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

app.get('/votes', async (_request, response) => {
  const result = await db.query(
    `SELECT * FROM votes WHERE date = CURRENT_DATE;`
  );
  response.json(result.rows);
});

app.post('/votes', async function(request, response) {
  const { voter, donut } = request.body;
  if (!voter || !donut) {
    response.status(406).json({ error: 'voter and donut requried' });
  } else {
    await db.query(
      `DELETE FROM votes WHERE voter = $1 AND date = CURRENT_DATE;`,
      [voter]
    );
    const result = await db.query(
      `INSERT INTO votes (donut, voter) VALUES ($1, $2) RETURNING *;`,
      [donut, voter]
    );
    response.json(result.rows[0]);
  }
});

db.query(`
  CREATE TABLE IF NOT EXISTS votes(
    id SERIAL PRIMARY KEY,
    donut VARCHAR(128) NOT NULL,
    voter VARCHAR(128) NOT NULL,
    date DATE DEFAULT CURRENT_DATE NOT NULL
  );
  CREATE UNIQUE INDEX IF NOT EXISTS duplicate_votes_per_day ON votes(voter, date);
`);

app.listen(PORT, () =>
  console.log(`Server is up and running at port ${PORT} 🚀`)
);
