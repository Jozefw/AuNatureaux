const app = require('./app');

// RUN SERVER 
const port = 3000;
app.listen(port, () => {
    console.log(`App running on PORT ${port}...`)
})