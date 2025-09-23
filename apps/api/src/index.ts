import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './models';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

const startServer = async (): Promise<void> => {
  try {
    
    await sequelize.sync();
    console.log('✅ Base de datos sincronizada');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
    });
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
