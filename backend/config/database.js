module.exports = ({ env }) => ({
  connection: {
    client: "mysql",
    connection: {
      host: env("DATABASE_HOST", "db"),
      port: env.int("DATABASE_PORT", 3306),
      database: env("DATABASE_NAME", "lacuisinedefred"),
      user: env("DATABASE_USERNAME", "maxAdmin"),
      password: env("DATABASE_PASSWORD", "P@ssw0rd123456!"),
      ssl: false,
    },
  },
});