const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use('/rooms/:id', express.static(path.join(__dirname, '../public')));

app.listen(port, () => console.log(`The app listening at http://localhost:${port}`));

// app.use(bodyParser.json());

app.get('/api/photos/:id', (req, res) => {
  const { id } = req.params;
  axios({
    method: "get",
    url:`http://localhost:3002/api/photos/${id}`,
  })
    .then((response) => {
      // console.log(response);
      res.status(200).send(response.data);})
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get('/api/calendar/:roomId', (req, res) => {
	const { roomId } = req.params;
	axios({
		method: 'get',
		url: `http://localhost:3001/api/calendar/${roomId}`,
	})
	  .then((response) => {
	  	res.status(200).send(response.data);
	  })
	  .catch((error) => {
	  	throw new Error(error);
	  });
});

app.get('/api/reviews/:id/reviews', (req, res) => {
  const { id } = req.params;
  axios({
    method: 'get',
    url:'http://localhost:3004/api/reviews/:id/reviews',
  })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get('/api/reviews/:id/ratings', (req, res) => {
  const { id } = req.params;
  axios({
    method: "get",
    url:'http://localhost:3004/api/reviews/:id/ratings',
  })
    .then((response) =>
      {res.status(200).send(response.data);}
    )
    .catch((err) =>
      {res.status(400).send(err);}
    );
});

app.post('/api/calendar/:roomId', (req, res) => {
	res.status(200).send(response);
});

app.patch('/api/photos/:id', (req, res) => {
  const { id } = req.params;
  const { isFavorite } = req.body;
  axios({
    method: "patch",
    url:`http://localhost:3002/api/photos/${id}`,
    data: isFavorite,
  })
    .then((response) =>
      {res.status(200).send(response.data);}
    )
    .catch((err) =>
      {res.status(400).send(err);}
  );
});