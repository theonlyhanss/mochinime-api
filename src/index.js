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
  const memoryUsage = (process.memoryUsage().rss / 1024 / 1024).toFixed(2);
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
  .swagger-ui .topbar-wrapper img {
    content: url('https://s6.imgcdn.dev/YCmnRv.jpg');
    width: 40px;
    height: 40px;
    border-radius: 10px;
    margin-right: 12px;
    box-shadow: 0 2px 8px rgba(99,102,241,0.10);
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

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: `
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
    .swagger-ui .topbar-wrapper img {
      content: url('https://s6.imgcdn.dev/YCmnRv.jpg');
      width: 40px;
      height: 40px;
      border-radius: 10px;
      margin-right: 12px;
      box-shadow: 0 2px 8px rgba(99,102,241,0.10);
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
  `,
  customJs: '',
  customSiteTitle: 'Mochinime API Docs',
  customfavIcon: 'https://s6.imgcdn.dev/YCmnRv.jpg',
}));
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Mochinime API</title>
      <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
      <style>
        html, body {
          min-height: 100vh;
          margin: 0;
          padding: 0;
          background: #f4f6fb;
          font-family: 'Quicksand', 'Poppins', 'Inter', 'Segoe UI', Arial, sans-serif;
        }
        body {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
        }
        .bg-accent {
          position: fixed;
          z-index: 0;
          pointer-events: none;
          opacity: 0.85;
          transition: opacity 0.2s;
        }
        .bg1 { top: 18px; left: 18px; width: 48px; transform: rotate(-12deg); }
        .bg2 { top: 60px; right: 32px; width: 38px; transform: rotate(8deg); }
        .bg3 { top: 120px; left: 60px; width: 32px; transform: rotate(18deg); }
        .bg4 { top: 180px; right: 80px; width: 44px; transform: rotate(-18deg); }
        .bg5 { bottom: 32px; left: 32px; width: 40px; transform: rotate(10deg); }
        .bg6 { bottom: 80px; right: 40px; width: 36px; transform: rotate(-8deg); }
        .bg7 { bottom: 120px; left: 120px; width: 30px; transform: rotate(16deg); }
        .bg8 { bottom: 180px; right: 120px; width: 34px; transform: rotate(-14deg); }
        .bg9 { top: 50%; left: 12px; width: 28px; transform: translateY(-50%) rotate(12deg); }
        .bg10 { top: 50%; right: 12px; width: 28px; transform: translateY(-50%) rotate(-12deg); }
        .bg11 { top: 30%; left: 80vw; width: 32px; transform: rotate(6deg); }
        .bg12 { bottom: 30%; right: 80vw; width: 32px; transform: rotate(-6deg); }
        @media (max-width: 600px) {
          .bg-accent { opacity: 0.6; }
          .bg1, .bg2, .bg3, .bg4, .bg5, .bg6, .bg7, .bg8, .bg9, .bg10, .bg11, .bg12 {
            width: 18vw !important;
            min-width: 18px;
            max-width: 36px;
          }
        }
        .container {
          background: #fff;
          border-radius: 24px;
          box-shadow: 0 8px 32px rgba(30,41,59,0.13), 0 1.5px 6px rgba(99,102,241,0.06);
          padding: 2.8rem 2.2rem 2.2rem 2.2rem;
          max-width: 420px;
          width: 92vw;
          text-align: center;
          position: relative;
          z-index: 1;
        }
        .logo {
          width: 110px;
          border-radius: 18px;
          margin-bottom: 1.3rem;
          box-shadow: 0 4px 16px rgba(30,41,59,0.10);
        }
        h1 {
          font-family: 'Poppins', 'Quicksand', 'Inter', 'Segoe UI', Arial, sans-serif;
          font-size: 2.1rem;
          font-weight: 700;
          margin: 0 0 0.7rem 0;
          color: #232946;
          letter-spacing: 0.01em;
        }
        p {
          color: #4b5563;
          font-size: 1.08rem;
          margin-bottom: 2.2rem;
        }
        .docs-btn {
          display: inline-block;
          padding: 0.85rem 2.4rem;
          font-size: 1.13rem;
          font-weight: 600;
          color: #fff;
          background: #232946;
          border: none;
          border-radius: 10px;
          box-shadow: 0 2px 12px rgba(35,41,70,0.13);
          cursor: pointer;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: transform 0.13s cubic-bezier(.4,2,.6,1), box-shadow 0.13s;
          font-family: 'Poppins', 'Quicksand', 'Inter', 'Segoe UI', Arial, sans-serif;
        }
        .docs-btn:active {
          transform: scale(0.97);
        }
        .docs-btn:hover {
          box-shadow: 0 6px 24px rgba(35,41,70,0.18);
          transform: scale(1.04);
        }
        .docs-btn .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s linear;
          background-color: rgba(255,255,255,0.5);
          pointer-events: none;
        }
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        .container::before {
          content: '';
          position: absolute;
          top: -30px; left: 50%;
          transform: translateX(-50%);
          width: 80px; height: 8px;
          background: #232946;
          border-radius: 8px;
          opacity: 0.13;
        }
        .container::after {
          content: '';
          position: absolute;
          bottom: -30px; left: 50%;
          transform: translateX(-50%);
          width: 60px; height: 6px;
          background: #232946;
          border-radius: 6px;
          opacity: 0.09;
        }
        .mochi-row {
          display: flex;
          justify-content: center;
          gap: 0.7rem;
          margin-bottom: 1.1rem;
        }
        .mochi-emoji {
          font-size: 2.1rem;
          filter: drop-shadow(0 2px 6px rgba(35,41,70,0.10));
        }
        .sate-svg {
          width: 38px;
          height: 38px;
          vertical-align: middle;
          margin-left: 0.2rem;
          margin-right: 0.2rem;
        }
        .footer {
          margin-top: 2.2rem;
          font-size: 0.98rem;
          color: #232946;
          opacity: 0.45;
          text-align: center;
          font-family: 'Quicksand', 'Poppins', 'Inter', 'Segoe UI', Arial, sans-serif;
          letter-spacing: 0.01em;
          user-select: none;
        }
        .footer .heart {
          color: #f87171;
          font-size: 1.08em;
          vertical-align: middle;
          margin: 0 2px;
          filter: drop-shadow(0 1px 2px rgba(248,113,113,0.13));
        }
        @media (max-width: 600px) {
          .container {
            padding: 1.2rem 0.5rem;
            max-width: 98vw;
          }
          h1 { font-size: 1.3rem; }
          .mochi-emoji { font-size: 1.4rem; }
          .sate-svg { width: 26px; height: 26px; }
        }
      </style>
    </head>
    <body>
      <span class="bg-accent bg1">
        <svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="18" fill="#fbbf24" stroke="#a16207" stroke-width="3"/></svg>
      </span>
      <span class="bg-accent bg2">
        <svg viewBox="0 0 48 48"><ellipse cx="24" cy="24" rx="16" ry="12" fill="#a7f3d0" stroke="#059669" stroke-width="2"/></svg>
      </span>
      <span class="bg-accent bg3">
        <svg viewBox="0 0 48 48"><rect x="10" y="18" width="28" height="12" rx="6" fill="#f87171" stroke="#a21caf" stroke-width="2"/></svg>
      </span>
      <span class="bg-accent bg4">
        <svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="14" fill="#818cf8" stroke="#312e81" stroke-width="2"/></svg>
      </span>
      <span class="bg-accent bg5">
        <svg viewBox="0 0 48 48"><ellipse cx="24" cy="24" rx="14" ry="10" fill="#fbbf24" stroke="#a16207" stroke-width="2"/></svg>
      </span>
      <span class="bg-accent bg6">
        <svg viewBox="0 0 48 48"><rect x="14" y="14" width="20" height="20" rx="10" fill="#f87171" stroke="#a21caf" stroke-width="2"/></svg>
      </span>
      <span class="bg-accent bg7">
        <svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="10" fill="#a7f3d0" stroke="#059669" stroke-width="2"/></svg>
      </span>
      <span class="bg-accent bg8">
        <svg viewBox="0 0 48 48"><ellipse cx="24" cy="24" rx="10" ry="7" fill="#818cf8" stroke="#312e81" stroke-width="2"/></svg>
      </span>
      <span class="bg-accent bg9">
        <svg viewBox="0 0 48 48"><rect x="16" y="20" width="16" height="8" rx="4" fill="#fbbf24" stroke="#a16207" stroke-width="2"/></svg>
      </span>
      <span class="bg-accent bg10">
        <svg viewBox="0 0 48 48"><rect x="16" y="20" width="16" height="8" rx="4" fill="#a7f3d0" stroke="#059669" stroke-width="2"/></svg>
      </span>
      <span class="bg-accent bg11">
        <svg viewBox="0 0 48 48"><rect x="14" y="10" width="20" height="8" rx="4" fill="#f87171" stroke="#a21caf" stroke-width="2"/></svg>
      </span>
      <span class="bg-accent bg12">
        <svg viewBox="0 0 48 48"><rect x="14" y="30" width="20" height="8" rx="4" fill="#fbbf24" stroke="#a16207" stroke-width="2"/></svg>
      </span>
      <div class="container">
        <div class="mochi-row">
          <span class="mochi-emoji" title="mochi">🍡</span>
          <svg class="sate-svg" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="21" y="4" width="6" height="40" rx="3" fill="#a16207"/><rect x="14" y="10" width="20" height="8" rx="4" fill="#fbbf24" stroke="#a16207" stroke-width="2"/><rect x="14" y="20" width="20" height="8" rx="4" fill="#f87171" stroke="#a16207" stroke-width="2"/><rect x="14" y="30" width="20" height="8" rx="4" fill="#a7f3d0" stroke="#a16207" stroke-width="2"/></svg>
          <span class="mochi-emoji" title="mochi">🟣</span>
        </div>
        <img src="https://s6.imgcdn.dev/YCmnRv.jpg" alt="Mochinime Logo" class="logo" />
        <h1>Mochinime API</h1>
        <p>Mochinime API adalah REST API gratis untuk anime subtitle Indonesia.</p>
        <a href="/docs" class="docs-btn" id="docsBtn">Lihat Dokumentasi API</a>
      </div>
      <div class="footer">made with <span class="heart">❤️</span> by hanmetaforce</div>
      <script>
        const btn = document.getElementById('docsBtn');
        btn.addEventListener('click', function(e) {
          const circle = document.createElement('span');
          circle.classList.add('ripple');
          const rect = btn.getBoundingClientRect();
          circle.style.width = circle.style.height = Math.max(rect.width, rect.height) + 'px';
          circle.style.left = (e.clientX - rect.left - rect.width/2) + rect.width/2 + 'px';
          circle.style.top = (e.clientY - rect.top - rect.height/2) + rect.height/2 + 'px';
          btn.appendChild(circle);
          setTimeout(() => circle.remove(), 600);
        });
      </script>
    </body>
    </html>
  `);
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