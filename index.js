import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import routes from './routes/route.js';
import AtletaRoutes from './routes/AtletaRoutes.js';
import CampeonatoRoutes from './routes/CampeonatoRoutes.js';
import SiteRoutes from './routes/SiteRoutes.js';

const PORT = 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, 'public')));
app.set('views', join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(AtletaRoutes);
app.use(CampeonatoRoutes);
app.use(SiteRoutes);
app.use(routes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

export default app;