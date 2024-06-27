const app = require('./index');
const dotenv = require('dotenv');

dotenv.config({ path: './Private.env' });

const PORT = process.env.PORT || 3001;
const BASE_URL = process.env.BASE_URL;

app.listen(PORT, () => {
  console.log(`Server is running at ${BASE_URL}:${PORT}`);
});
