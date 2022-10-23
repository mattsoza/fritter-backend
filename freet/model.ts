import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';

/**
 * This file defines the properties stored in a Freet
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for Freet on the backend
export type Freet = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  authorId: Types.ObjectId;
  parent: Types.ObjectId;
  dateCreated: Date;
  content: string;
  tags: [string];
  image: Buffer;
  dateModified: Date;
  comments: [Types.ObjectId];
  forum: boolean;
};

export type PopulatedFreet = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  authorId: User;
  dateCreated: Date;
  content: string;
  dateModified: Date;
};

// Mongoose schema definition for interfacing with a MongoDB table
// Freets stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const FreetSchema = new Schema<Freet>({
  // The author userId
  authorId: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  parent: {
    type: Schema.Types.ObjectId,
    required: false
  },
  // The date the freet was created
  dateCreated: {
    type: Date,
    required: true
  },
  // The content of the freet
  content: {
    type: String,
    required: true
  },
  tags: {
    type: [String]
  },
  // Image if the tweet has an image
  // image: {
  //   type: Buffer,
  //   required: false
  // },
  // The date the freet was modified
  dateModified: {
    type: Date,
    required: true
  },
  comments: {
    type: [Schema.Types.ObjectId]
  },
  forum: {
    type: Boolean,
    required: true
  }
});

const FreetModel = model<Freet>('Freet', FreetSchema);
export default FreetModel;
