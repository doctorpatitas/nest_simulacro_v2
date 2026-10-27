export const EnvConfig = () => ({
    app: { node: process.env.NODE_ENV || 'development'},
    database: {
        type: 'postgres',
        port: Number(process.env.POSTGRES_PORT),
        host: process.env.POSTGRES_HOST,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
    },
    apiKey: (process.env.API_KEYS || '')
        .split(',')
        .map((key) => key.trim())
        .filter((key) => key.length > 0),
});