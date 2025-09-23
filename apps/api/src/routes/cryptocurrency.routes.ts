import { Router } from 'express';
import { cryptocurrencyController } from '../controllers/cryptocurrency.controller';

const router = Router();

router.get('/cryptocurrencies', cryptocurrencyController.getLatestCryptocurrencies);
router.get('/cryptocurrencies/:id', cryptocurrencyController.getCryptocurrencyById);

export default router;