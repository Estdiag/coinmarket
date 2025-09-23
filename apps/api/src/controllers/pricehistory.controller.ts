import { Request, Response } from 'express';
import { priceHistoryService } from '../services/pricehistory.service';

const getPriceHistory = async (req: Request, res: Response) => {
  try {
    const cryptocurrencyId = parseInt(req.params.id);
    const days = parseInt(req.query.days as string) || 30;

    if (isNaN(cryptocurrencyId)) {
      res.status(400).json({
        success: false,
        error: 'Invalid cryptocurrency ID'
      });
      return;
    }

    const history = await priceHistoryService.getPriceHistory(cryptocurrencyId, days);

    res.json({
      success: true,
      data: history,
      count: history.length
    });
  } catch (error) {
    console.error('Error in getPriceHistory:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch price history'
    });
  }
};


export const priceHistoryController = {
  getPriceHistory,  
};