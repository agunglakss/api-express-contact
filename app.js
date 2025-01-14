import express from 'express';
import fs from 'node:fs';
import path from 'node:path';

const app = express();
const port = 3000;

const dir = 'data';
const filePath = path.join(dir, 'contact.json');

// Create directory data if not exist
if(!fs.existsSync(dir)) {
  // Create a data directory
  fs.mkdirSync(dir);

  // Create a contact.json file
  fs.writeFileSync(filePath, '[]');
}

const contacts = () => {
  return fs.readFileSync(filePath, 'utf8');
}

// TODO : Midleware to check content-type


// TODO : Create contact
// GET - /contact
// POST - /contact

// TODO : Update contact
// PUT/PATCH - /contact/:email

// TODO : Delete contact
// DELETE - /contact/:email

// TODO : Register user
// POST - user/sign-up

// TODO : Log in user
// POST - user/sign-in

// TODO : Log out user
// POST - user/log-out

// TODO : Error handling

// TODO : Validation request

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

