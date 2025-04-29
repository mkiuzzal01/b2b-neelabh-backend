import { Schema } from 'mongoose';
import { TNotice } from './notice.interface';

const createNoticeSchema = new Schema<TNotice>({
    creatorId:{
        type:Schema.ObjectId,
        
    }
  title: {
    type: String,
    required: true,
  },
  
});
