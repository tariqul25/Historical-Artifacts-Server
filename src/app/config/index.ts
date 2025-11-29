export default {
  port: process.env.PORT || 5000,
  database_url: process.env.DATABASE_URL as string,
  jwt_secret: process.env.JWT_SECRET || 'secret',
};
