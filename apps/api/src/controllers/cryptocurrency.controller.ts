import { Request, Response } from 'express';
import { coinMarketCapService } from '../services/coinmarketcap.service';
import Cryptocurrency from '../models/cryptocurrency.model';


const getCryptocurrencyById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const cryptocurrency = await coinMarketCapService.fetchCryptocurrencyById(id);

    res.json({
      success: true,
      data: cryptocurrency
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch cryptocurrency'
    });
  }
}


const getLatestCryptocurrencies = async (req: Request, res: Response): Promise<void> => {
  try {
    const limit = parseInt(req.query.limit as string) || 100;
    const cryptocurrencies = await Cryptocurrency.findAll({
      limit: limit,
      order: [['cmc_rank', 'ASC']]
    });

    res.json({
      success: true,
      data: cryptocurrencies,
      count: cryptocurrencies.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch cryptocurrencies from database'
    });
  }
}


export const cryptocurrencyController = {
  getCryptocurrencyById,
  getLatestCryptocurrencies
}