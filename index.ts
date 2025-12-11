import * as dotenv from 'dotenv';
dotenv.config();

import { apiServer } from './APIServer'; 
import logger from './logger';
import { ProductionMEVBot } from './ProductionMEVBot'; 

async function main() {
    logger.info('='.repeat(70));
    logger.info('  MASSIVE TRADING ENGINE STARTUP SEQUENCE');
    logger.info('='.repeat(70));

    try {
        logger.info('[STEP 1] Starting API Server...');
        await apiServer.start(); 
        
        logger.info('[STEP 2] Initializing and Starting MEV Bot...');
        const bot = new ProductionMEVBot(); 
        await bot.initialize();
        await bot.startMempoolMonitoring();

    } catch (error: any) {
        logger.error('Fatal startup failure:', error.message);
        logger.error('Details:', error);
        process.exit(1); 
    }
}

process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception (FATAL):', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled Rejection (FATAL):', reason);
    process.exit(1);
});

main();
