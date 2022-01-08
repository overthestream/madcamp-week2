import { Request, Response } from 'express';
import queryGenerator from '../../middleware/connector';

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
