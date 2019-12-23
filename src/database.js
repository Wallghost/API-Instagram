import 'dotenv/config';
import mongoose from 'mongoose';

class Database {
    constructor() {
        this.init();
    }

    init(){
        this.mongo_connection = mongoose.connect(process.env.MONGO_CONNECTION_STRING,{
          useNewUrlParser: true,
          useFindAndModify: true,
          useUnifiedTopology: true,
        })
    };
}

export default new Database();