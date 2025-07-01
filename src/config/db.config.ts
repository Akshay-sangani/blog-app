
import { DataSource } from 'typeorm';

require('dotenv').config({ path: '.env' });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.HOST,
  port: 6543,
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: false,
  entities: [__dirname + '/../module/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../**/migrations/*{.ts,.js}'],
  migrationsRun: false,
  logging: true,
});


