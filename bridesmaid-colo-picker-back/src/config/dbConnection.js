import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  database: process.env.POSTGRES_DB || 'bridemaid',
  username: process.env.POSTGRES_USER || 'myuser',
  password: process.env.POSTGRES_PASSWORD || 'mypassword',
  host: process.env.POSTGRES_URL || 'localhost',
  port: Number(process.env.POSTGRES_PASSWORD) || 5432,
  dialect: 'postgres',
});

const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database Connection!');
    
    await sequelize.sync();
    console.log('✅ Sync Models!');

  } catch (error) {
    console.error('❌ Connection Error', error);
    process.exit(1);
  }
};

initDB();

export default sequelize;