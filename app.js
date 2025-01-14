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

// Reading contact.json file
const contacts = () => {
  return fs.readFileSync(filePath, 'utf8');
}

// Middleware
app.use((req, res, next) => {
  const contentType = req.get('Content-Type')
  if(contentType !== 'application/json') {
    res.status(403);
    res.send('Invalid Content-Type');
  }
  
  next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root
app.route('/')
  .get((_, res) => {
    const data = JSON.parse(contacts());

    res.status(200).type('json').json({data});
  }
);

// POST - /contact
app.route('/contact')
  .post((req, res) => {
   
    // object data from request body
    const payload = req.body;
    
    // Parsing existing data into array of object so that can adding new object
    const data = JSON.parse(contacts());
    const isExist = data.filter(contact => contact.email === req.body.email);

    // Check if data is exist
    if(isExist.length > 0) {
      return res.status(400).send('Data email is exist');
    }
   
    // Push object into array
    data.push(payload);

    // Replace with new data
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).send('Success create a contact!');
  }
);

// TODO : Update contact
// PUT/PATCH - /contact/:email
app.route('/contact/:email')
  .put((req, res) => {
    const email = req.params;

    res.status(200)
    res.send(email);
  }
)

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

