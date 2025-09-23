import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './models'; 
import { defineAssociations } from './models/associations'; 
import cryptocurrencyRoutes from './routes/cryptocurrency.routes';
import priceHistoryRoutes from './routes/pricehistory.routes';
import { initSchedulers } from './schedulers/syncData.schedulers';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rutas
app.use('/api', cryptocurrencyRoutes);
app.use('/api', priceHistoryRoutes);


const startServer = async (): Promise<void> => {
  try {
      defineAssociations();
    console.log('✅ Asociaciones definidas');
    

    await sequelize.sync({ 
      force: true, 
      // alter: process.env.NODE_ENV === 'development' 
    });
    console.log('✅ Base de datos sincronizada');
    
   
    app.listen(PORT, () => {
      console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);      
    });
    initSchedulers()
  } catch (error) {
    console.error('❌ Error iniciando servidor:', error);
    process.exit(1);
  }
};


process.on('SIGINT', async () => {
  console.log('\n🛑 Apagando servidor...');
  await sequelize.close();
  process.exit(0);
});

startServer();