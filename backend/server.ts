import app from './app';
import http from 'http';

const PORT = process.env.PORT || 5000;

app.set('port', PORT);
const server = http.createServer(app);

server.listen(PORT, () => console.log(`Listening to Port ${PORT}`));
