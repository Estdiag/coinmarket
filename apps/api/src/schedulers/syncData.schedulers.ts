import cron from 'node-cron';
import { priceHistoryService } from '../services/pricehistory.service';
import { coinMarketCapService } from '../services/coinmarketcap.service';

const initSync = async () => {
  await coinMarketCapService.syncCryptocurrenciesToDB();
  await priceHistoryService.syncPriceHistory();
};

export const initSchedulers = async () => { 
  await initSync();  
  cron.schedule('0 0 * * *', async () => {
    try {
      console.log('⏳ Iniciando actualización');
      await initSync();  // 👈 Esperar aquí también
      console.log('✅ Datos actualizados correctamente.');
    } catch (error) {
      console.error('❌ Error al actualizar datos:', error);
    }
  });
};
