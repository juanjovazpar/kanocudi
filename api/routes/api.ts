import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import { authTokenMiddleware } from '../middlewares/authToken';
import { invitationTokenMiddleware } from '../middlewares/invitationToken';
import { isVerifyMiddleware } from '../middlewares/isVerifiy';
import swaggerSpec from '../utils/swaggerDoc';
import healthcheckRoutes from './healthcheck';
import authRoutes from './auth';
import responseRoutes from './response';
import productsRoutes from './products';

const router = express.Router();

router.use(morgan(process.env.MORGAN_MODE || 'dev')); // TODO: "dev" | "combined" | "common"

router.use('/healthcheck', healthcheckRoutes);
router.use('/auth', authRoutes);
router.use(
  '/response/:invitation_token',
  invitationTokenMiddleware,
  responseRoutes
);
router.use(
  '/products',
  authTokenMiddleware,
  isVerifyMiddleware,
  productsRoutes
);
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
