const express = require('express');
const cors = require('cors');

require('./database/database');
const carsRouter = require('./routes/cars');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/cars', carsRouter);

app.get('/', (req, res) => {
    res.json({ message: '++Haupcar API running' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
