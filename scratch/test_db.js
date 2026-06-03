const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://postgres.seuuquruwlafxmqpelnm:TheJaypee%40%212680@aws-1-us-west-1.pooler.supabase.com:6543/postgres?sslmode=require'
});
client.connect()
  .then(() => { console.log('Connected to 6543 successfully'); client.end(); })
  .catch(e => console.error('Error on 6543:', e.message));

const client2 = new Client({
  connectionString: 'postgresql://postgres.seuuquruwlafxmqpelnm:TheJaypee%40%212680@aws-1-us-west-1.pooler.supabase.com:5432/postgres?sslmode=require'
});
client2.connect()
  .then(() => { console.log('Connected to 5432 successfully'); client2.end(); })
  .catch(e => console.error('Error on 5432:', e.message));
