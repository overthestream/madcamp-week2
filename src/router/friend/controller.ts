import { Request, Response } from 'express';
import queryGenerator from '../../middleware/connector';

export const getFriend = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const query = {
      str: `SELECT add_to, nick , mbti, age, gender FROM friend natural join users WHERE add_from = $1`,
      val: [id],
    };
    const result = await queryGenerator(query);
    res.json(result);
    console.log(result);
    res.status(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const addFriend = async (req: Request, res: Response) => {
  try {
    const { from, to } = req.body;
    if (from === to) res.sendStatus(400);
    const query = {
      str: `INSERT INTO friend VALUES($1, $2)`,
      val: [from, to],
    };
    console.log(`${from} add friend: ${to}`);
    await queryGenerator(query);

    const queryR = {
      str: `INSERT INTO friend VALUES($1, $2)`,
      val: [to, from],
    };
    await queryGenerator(queryR);

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const deleteFriend = async (req: Request, res: Response) => {
  try {
    const { from, to } = req.query;
    if (from === to) res.sendStatus(400);
    const query = {
      str: `DELETE FROM friend WHERE (add_from = $1 AND add_to = $2) OR (add_to = $1 AND add_from = $2)`,
      val: [from, to],
    };
    console.log(`${from} delete friend: ${to}`);
    await queryGenerator(query);

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const saveTalk = async (req: Request, res: Response) => {
  try {
    const { from, to, talk, timestamp } = req.body;
    const query = {
      str: `INSERT INTO talk values ($1, $2, $3, $4)`,
      val: [from, to, talk, timestamp],
    };
    console.log(`${from} send to ${to}: ${talk} - ${timestamp}`);
    await queryGenerator(query);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
