import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const configSeed: ConnectionOptions = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
  synchronize: false,
  logging: false,
  entities: ['src/orm/entities/**/*.ts'],
  migrations: ['src/orm/seeds/**/*.ts'],
  cli: {
    migrationsDir: 'src/orm/seeds',
  },
  namingStrategy: new SnakeNamingStrategy(),
};

export = configSeed;
