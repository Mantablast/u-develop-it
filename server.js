const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
app.use('/api', apiRoutes);

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});


//Cool to know
//you might find useful include the following:

// -- get all voters who do not have a last name of Cooper or Jarman
// SELECT * FROM voters WHERE last_name != 'Cooper' AND last_name != 'Jarman';

// -- get all voters who have a .edu email address
// SELECT * FROM voters WHERE email LIKE '%.edu';

// -- get only the last created voter
// SELECT * FROM voters ORDER BY created_at DESC LIMIT 1;