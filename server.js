const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

// RUN SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {});
