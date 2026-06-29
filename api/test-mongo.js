const mongoose = require('mongoose');

const uri =
  'mongodb+srv://weatherguard_admin:h6m2003s@weatherguard-cluster.2mmqgjg.mongodb.net/weatherguard?retryWrites=true&w=majority&appName=weatherguard-cluster';

mongoose
  .connect(uri)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Connection Failed');
    console.error(err);
    process.exit(1);
  });