import express from 'express';
import router from './routes/index.js';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';
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
  const memoryUsage = (process.memoryUsage().rss / 1024 / 1024).toFixed(2); // MB
  const freeMemoryMB = (os.freemem() / 1024 / 1024).toFixed(2);
  res.json({
    status: 'ok',
    totalRequests,
    uptime,
    memoryUsage: Number(memoryUsage),
    freeMemoryMB: Number(freeMemoryMB),
    nodeVersion: process.version,
    platform: process.platform,
    timestamp: new Date().toISOString()
  });
});

const customCss = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
  body {
    background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%) !important;
    min-height: 100vh;
  }
  .swagger-ui .topbar {
    background: linear-gradient(90deg, #6366f1 0%, #a21caf 100%) !important;
    color: #fff !important;
    font-weight: 700;
    font-size: 1.2em;
    letter-spacing: 0.03em;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    box-shadow: 0 2px 8px rgba(99,102,241,0.08);
  }
  .swagger-ui, .swagger-ui .info, .swagger-ui .opblock, .swagger-ui .scheme-container, .swagger-ui .responses-inner, .swagger-ui .opblock-summary, .swagger-ui .opblock .opblock-section-header, .swagger-ui .markdown, .swagger-ui .renderedMarkdown {
    font-family: 'Inter', 'Segoe UI', 'Roboto', 'Poppins', Arial, sans-serif !important;
    letter-spacing: 0.01em;
    font-size: 16px;
  }
  .swagger-ui .info h1, .swagger-ui .info h2, .swagger-ui .info h3 {
    font-family: 'Inter', 'Segoe UI', 'Roboto', 'Poppins', Arial, sans-serif !important;
    font-weight: 700;
    letter-spacing: 0.02em;
  }
  .swagger-ui .opblock-summary-description, .swagger-ui .opblock-title_normal {
    font-weight: 600;
  }
`;

const customJs = ``;

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss,
  customJs,
  customSiteTitle: 'Mochinime API Docs',
}));
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