import mongoose from 'mongoose';

const mongoString = process.env.MONGODB_CONNSTRING;

mongoose.set({
  strictQuery: true,
  'timestamps.createdAt.immutable': true,
  debug: {
    color: true,
  },
});

mongoose.connect(mongoString, {
  appName: 'node-be',
});

const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database Connected');
});

export default database;
