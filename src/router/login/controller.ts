import { Request, Response } from 'express';
import { userInfo } from './kakao';

const kakao = require('./kakao')

const login = async (req: Request, res: Response) => {
  const { code } = req.params;
  const token: string = kakao.getKaKaoToken(code);
  const user: userInfo = kakao.getKakaoUserInfo(token);
};

module.exports = { login }