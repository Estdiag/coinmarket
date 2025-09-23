import { Router } from 'express';
import { priceHistoryController } from '../controllers/pricehistory.controller';

const router = Router();

router.get('/cryptocurrencies/:id/history', priceHistoryController.getPriceHistory);


export default router;