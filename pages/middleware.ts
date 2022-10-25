import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import FreetCollection from '../freet/collection';

const isPageNumberValid = async (req: Request, res: Response, next: NextFunction) => {
  const regex = /^[0-9]{0,3}$/;

  const ok = req.query.page ? regex.exec(String(req.query.page)) : true;

  if (!ok) {
    res.status(400).json({
      error: 'Page number must be only integers of 3 digits or less'
    });
    return;
  }

  next();
};

export {
  isPageNumberValid
};
