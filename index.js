const PORT = process.env.PORT || 3000;

const express = require('express');
const pg = require('pg');

const app = express();

app.use(express.static('public'));
app.use(express.json());

const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// The next step is for you to add some endpoints to your API.

// The first one will be a GET request to the '/votes' path.

// The idea is for you to see who has voted for which donut.

// You will need to await a query against your `db`,
// so that it returns all information about all votes on the CURRENT_DATE,
// and then store the result in a const called "result".

// console.log your result object,
// it should have a property called rows,
// which represents all of the votes in your table.

// Have your endpoint respond with a JSON respresentation of all of these rows.

// You can check if this is working
// by inserting a few votes into your database via psql,
// and then issuing a GET request to localhost:3000/votes
// either with your browser or with Postman.

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
