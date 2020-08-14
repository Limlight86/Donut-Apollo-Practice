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

// Next we need a way to record votes via our API.
// In other words, we need to define an endpoint that will accept a POST to the '/votes' path.

// Assuming the request.body comes in with the following shape:

// {
//   "voter": "Andy",
//   "donut": "Chocolate"
// }

// You will want to declare voter and donut consts that would contain
// the strings "Andy" and "Chocolate"
// (ESLint may force you to use the destructuring syntax we went over yesterday).

// Once you have these consts,
// you have two SQL queries you will have to execute inside this function...

// First, you will want to DELETE any votes that this voter already made on today's CURRENT date.
// Don't forget to parameterize the voter part of your query,
// it comes from the internet and can't be trusted.

// You will need to await the first query before executing the second one.

// Once you've deleted any votes the user has already made today,
// you want to INSERT a new vote for this user, for the donut specified in the request.
// Remember to parameterize the parts that come directly from the request,
// and that by default votes will be recorded for the CURRENT_DATE.
// You will want to add RETURNING * to the end of your query
// so this new vote is easily acessible to you after it is inserted.

// You need to await the result of the second query and store it in a const called result.
// If you console.log the rows property of this result,
// it should be an array with only one item inside of it (the vote that was just recorded).
// Have this endpoint respond with a JSON representation of this vote.

// You can check your work by issuing POST requests to localhost:3000/votes,
// with a raw JSON body that roughly resembles

// {
//   "voter": "Andy",
//   "donut": "Chocolate"
// }

// Check if the result comes back as expected.
// Then issue a GET request to localhost:3000/votes
// and verify that the vote is still in the database.

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
