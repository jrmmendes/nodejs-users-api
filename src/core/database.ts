import mongoose, { Mongoose } from 'mongoose';

export type DatabaseClient = Mongoose;

export const connectToDatabase = async (connectionString: string): Promise<DatabaseClient> => {
  return new Promise<DatabaseClient>((resolve, reject) => {
    mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      autoIndex: true,
    });
    mongoose
      .connection
      .on('error', (error: Error) => {
        console.log(error);
        reject(error);
      })
      .once('open', () => {
        console.log('[ Database connect with success ]');
        resolve(mongoose);
      });
  });
}
