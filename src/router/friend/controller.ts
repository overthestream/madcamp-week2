import { Request, Response } from 'express';
import queryGenerator from '../../middleware/connector';

export const getFriend = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const query = {
      str: `SELECT add_to, nick , mbti, age, gender FROM friend, users WHERE add_from = $1 AND add_to = id`,
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

export const getTalk = async (req: Request, res: Response) => {
  try {
    const { from, to } = req.query;
    console.log(from);
    console.log(to);
    const query = {
      str: `SELECT * FROM talk WHERE (send_from = $1 AND send_to = $2) OR (send_from = $2 AND send_to = $1) ORDER BY send_at`,
      val: [from, to],
    };
    const result = await queryGenerator(query);
    console.log(result);
    res.json(result);
    res.status(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
