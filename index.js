const PORT = process.env.PORT || 3000;

const express = require('express');
const pg = require('pg');

const app = express();

app.use(express.static('public'));
app.use(express.json());

const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

db.query(`
  CREATE TABLE IF NOT EXISTS votes(
    id serial primary key,
    donut varchar(128) not null,
    voter varchar(128) not null,
    date DATE DEFAULT CURRENT_DATE not null
    );

  CREATE UNIQUE INDEX vote_index
  ON votes(voter, date);
  `);

app.listen(PORT, () =>
  console.log(`Server is up and running at port ${PORT} 🚀`)
);

// Do this work on a branch!

// Run yarn init -y to create a package.json
// use yarn add to add express and pg to this project.
// Create a .gitignore file and make sure git is ignoring your node_modules folder.
// Commit all of your work up until this point with a message of "install dependencies"

// At the top of this file, require express and store it in a const called express.
// Require pg and store it in a const called pg.

// Call the express function and store the result in a const called app
// Tell the app to use the express.static middleware, to serve the files in our public folder
// Tell the app to use the express.json middleware, so that it can understand incoming json requests.
// Declare a const called PORT, and set it equal to either the process.env.PORT if there is one
// Defaulting to port 3000 if there is no process.env.PORT.

// Create a new pg.Pool(), and pass in the optional object of { connectionString: process.env.DATABASE_URL }
// Store your pool in a const called db.

// Execute a query against your db that creates the table and index your created in the morning exercise.
// Make sure you only create the table and index if it doesn't exist yet.
// Otherwise, you will get an error the _second_ time you turn on your server.

// Tell your app to listen at the port stored in the PORT const.
// As the second argument to the listen function, pass in a console log statement so we know the server is running.

// You should be able to start your server with node index.js.
// Add this command to your package.json in a "scripts" key, nested as the "start" command.
// Once you have this working, you should be able to run yarn start to boot up your app.

// ✅ Check that you can see a webpage at localhost:3000.
// ✅ Check that you can turn your server on and off multiple times using yarn start.
// ✅ Check that you can run psql and insert rows into the votes table.

// Once your checklist is complete, commit the rest of your work, push it up to origin and submit it as a pull request.
