const express = require('express');
const NodeCache = require('node-cache');
const cache = new NodeCache();
const { TodoStatusEnum } = require('../enums/StatusEnum');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const getEpoch = () => Math.round(Date.now() / 1000);

const verifyStatus = (req, res, next) => {
  if (!req.body.status)
    return res.status(400).json({ message: `Status is required` });

  const { status } = req.body;

  if (Object.values(TodoStatusEnum).includes(status)) {
    next();
  } else {
    return res.status(400).json({ message: `Invalid status ${status}` });
  }
};

app.post('/create', verifyStatus, async (req, res, next) => {
  try {
    const { title, status } = req.body;

    if (!title) {
      return res.status(400).json({ message: `Title is required` });
    }

    if (cache.has(title)) {
      return res.status(400).json({ message: `${title} already exists` });
    }

    cache.set(title, {
      title,
      status,
      lastUpdatedAt: null,
      createdAt: getEpoch(),
    });

    res.status(200).json(cache.get(title));
  } catch (err) {
    console.log(err);
    res.status(500).json(JSON.parse(JSON.stringify(err)));
    next();
  }
});

app.post('/update', verifyStatus, async (req, res, next) => {
  try {
    const { title, status } = req.body;

    if (!title) {
      return res.status(400).json({ message: `Title is required` });
    }

    if (!status) {
      return res.status(400).json({ message: `Status is required` });
    }

    if (cache.has(title)) {
      const _val = cache.get(title);
      cache.set(String(title), {
        title,
        status,
        createdAt: _val.createdAt,
        lastUpdatedAt: getEpoch(),
      });
    }

    res.json(cache.get(title));
  } catch (err) {
    console.log(err);
    res.status(500).json(JSON.stringify(err));
    next();
  }
});

app.delete('/delete', async (req, res, next) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: `Key is required` });
    }

    if (!cache.has(title)) {
      return res.status(200).json({ message: `${title} does not exist` });
    }

    cache.del(title);

    res.json({ title });
  } catch (err) {
    console.log(err);
    res.status(500).json(JSON.stringify(err));
    next();
  }
});

app.get('/get', async (req, res, next) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ message: `Key is required` });
    }

    const value = cache.get(title);

    if (value == undefined) {
      return res.status(400).json({ message: `${title} does not exist` });
    }

    res.json(value);
  } catch (err) {
    console.log(err);
    res.status(500).json(JSON.stringify(err));
    next();
  }
});

app.get('/getAll', async (req, res, next) => {
  try {
    const values = cache.keys().map((k: String) => {
      return cache.get(k);
    });

    if (values == undefined) {
      return res.status(400).json({ message: `No todo items exist` });
    }

    res.json(values);
  } catch (err) {
    console.log(err);
    res.status(500).json(JSON.stringify(err));
    next();
  }
});

app.listen(4000);

console.log('Listening on port 4000');
