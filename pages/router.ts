import type {Request, Response} from 'express';
import express from 'express';
import FreetCollection from '../freet/collection';
import FreetModel from '../freet/model';
import * as util from '../freet/util';

import * as UserValidator from '../user/middleware';
import * as PageValidator from './middleware';

const router = express.Router();

/**
 * Retrieve a page for the current user
 *
 * @name GET /api/home?page={int}
 *
 * Credit to this StackOverflow thread for pagination help
 * https://stackoverflow.com/questions/5539955/how-to-paginate-with-mongoose-in-node-js
 */

router.get(
  '/',
  [
    UserValidator.isUserLoggedIn,
    PageValidator.isPageNumberValid
  ],
  async (req: Request, res: Response) => {
    const paramNumber = Number(req.query.page);
    const pageNumber = paramNumber ?? 1;

    const pageFreets = await FreetCollection.findFreetsOnPage(pageNumber);
    const response = pageFreets.map(util.constructFreetResponse);
    res.status(200).json(response);
  }
);

export {router as pageRouter};
