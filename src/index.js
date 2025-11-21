import express from 'express';
import router from './routes/index.js';
import cors from 'cors';
import os from 'os';

const app = express();
const port = 3000;

let totalRequests = 0;
const startTime = Date.now();

app.use((req, res, next) => {
  totalRequests++;
  next();
});

const corsOptions = {
    origin: '*',
    credentials: true
}

app.use(cors());

app.use('/api', router)

app.get('/api/status', (req, res) => {
  const uptimeSec = Math.floor((Date.now() - startTime) / 1000);
  const days = Math.floor(uptimeSec / 86400);
  const hours = Math.floor((uptimeSec % 86400) / 3600);
  const minutes = Math.floor((uptimeSec % 3600) / 60);
  const seconds = uptimeSec % 60;
  const uptime = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  const memoryUsage = (process.memoryUsage().rss / 1024 / 1024).toFixed(2);
  const freeMemoryMB = (os.freemem() / 1024 / 1024).toFixed(2);
  res.set('Content-Type', 'application/json');
  res.send(JSON.stringify({
    status: 'ok',
    totalRequests,
    uptime,
    memoryUsage: Number(memoryUsage),
    freeMemoryMB: Number(freeMemoryMB),
    nodeVersion: process.version,
    platform: process.platform,
    timestamp: new Date().toISOString()
  }, null, 2));
});

app.get('/', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send(JSON.stringify({
    name: 'Mochinime API',
    description: 'Mochinime API adalah REST API gratis untuk anime subtitle Indonesia.',
    version: '1.0.0',
    author: 'hanmetaforce',
    endpoints: {
      status: '/api/status',
      search: '/api/search',
      popular: '/api/popular',
      latest: '/api/latest',
      detail: '/api/anime/:slug',
      episode: '/api/episode/:slug',
      movie: '/api/movie'
    }
  }, null, 2));
});

app.use('*', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.status(404).send(JSON.stringify({
        status: 404,
        message: 'Endpoint not found'
    }, null, 2));
})
app.listen(port, () => {
    console.log('listening on port', port)
})