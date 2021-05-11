import express from 'express';

import { Item } from '../modules/Item.js';

const itemRouter = express.Router();

itemRouter.get('/', (req, res) => {
  try {
    Item.findAll()
      .then((items) => res.json(items))
      .catch((err) => console.log(err));
  } catch (error) {
    throw new Error(error.message);
  }
});

itemRouter.get('/:id', (req, res) => {
  try {
    const id = req.params.id;
    Item.findOne({
      where: { id },
    })
      .then((items) => res.json(items))
      .catch((err) => console.log(err));
  } catch (error) {
    throw new Error(error.message);
  }
});

itemRouter.post('/', async (req, res) => {
  try {
    const { description, done, listId, completedAt } = req.body;
    const newItem = await Item.create({
      description,
      done,
      listId,
      completedAt,
    });
    return res.json(newItem);
  } catch (error) {}
});

itemRouter.put('/:id', async (req, res) => {
  try {
    const { description, done, listId, completedAt } = req.body;
    const newItem = await Item.update(
      { description, done, listId, completedAt },
      { returning: true, where: { id: req.params.id } }
    );
    return res.json(newItem);
  } catch (error) {
    throw new Error(error.message);
  }
});

itemRouter.delete('/:id', (req, res) => {
  try {
    const id = req.params.id;
    Item.destroy({
      where: { id: id },
    }).then((deletedItem) => {
      res.json(deletedItem);
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

export default itemRouter;
