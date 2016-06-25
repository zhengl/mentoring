const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const faker = require('faker');

const PORT = process.env.PORT || 8080;

let PHOTOS = [];

for (let i = 0; i < 2; i++) {
  PHOTOS.push({
    id: faker.random.uuid(),
    url: faker.image.avatar(),
  });
}

function getPhoto(id) {
  return PHOTOS.find(photo => photo.id === id);
}

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/photos', (req, res) => {
  res.json(PHOTOS);
});

app.post('/photos', (req, res) => {
  const id = faker.random.uuid();

  PHOTOS.push({
    id,
    url: req.body.url
  });

  res.json({ id });
});

app.delete('/photos/:id', (req, res) => {
  const toBeDeletedPhoto = getPhoto(req.params.id);

  if (toBeDeletedPhoto) {
    PHOTOS.splice(PHOTOS.indexOf(toBeDeletedPhoto), 1);
    res.json(toBeDeletedPhoto);
  } else {
    res.status(404).end();
  }
});

app.put('/photos/:id', (req, res) => {
  const toBeUpdatedPhoto = getPhoto(req.params.id);

  if (toBeUpdatedPhoto) {
    Object.assign(toBeUpdatedPhoto, req.body);
    res.json(toBeUpdatedPhoto);
  } else {
    res.status(404).end();
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
