import { MongoObservable } from 'meteor-rxjs';
import { Post } from '../models/post.model';

export const PostCollection = new MongoObservable.Collection<Post>('Posts');