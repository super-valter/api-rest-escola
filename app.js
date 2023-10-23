// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

import './src/database';
import express from 'express';
import alunoRoutes from './src/routes/alunoRoutes.js';
import userRoutes from './src/routes/userRoutes';
import tokenRoutes from './src/routes/tokenRoutes';
import fotoRouter from './src/routes/fotoRoutes';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, 'uploads')));
  }

  routes() {
    this.app.use('/alunos/', alunoRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/fotos/', fotoRouter);
  }
}

export default new App().app;
