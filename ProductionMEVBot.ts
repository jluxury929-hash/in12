import { ProductionMEVBot } from './ProductionMEVBot'; 
import logger from './logger'; 

// --- Environment Variables (Read from process.env) ---
const ETHEREUM_RPC_HTTP = process.env.ETHEREUM_RPC_HTTP as string;
const ETHEREUM_RPC_WSS = process.env.ETHEREUM_RPC_WSS as string;
const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY as string;
const FLASHBOTS_RELAY_URL = process.env.FLASHBOTS_RELAY_URL as string;
const FLASHBOTS_RELAY_SIGNER_KEY = process.env.FLASHBOTS_RELAY_SIGNER_KEY as string;
const FLASH_LOAN_CONTRACT_ADDRESS = process.env.FLASH_LOAN_CONTRACT_ADDRESS as string; // NEW
// NOTE: ABI must be hardcoded or loaded from a local JSON file in a real app
const FLASH_LOAN_CONTRACT_ABI = [ 
    // Simplified ABI for example. Replace with the actual array from your Solidity compiler!
    "function requestFlashLoan(address token, uint256 amount, bytes memory data) external payable",
    "function executeOperation(address asset, uint256 amount, uint256 premium, address initiator, bytes calldata params) external returns (bool)",
    "function owner() view returns (address)"
]; // NEW

// Exported class structure to satisfy new ProductionMEVBot() call in index.ts
export class ProductionMEVBot {
    private executor: FlashbotsMEVExecutor;

    constructor() {
        this.executor = new FlashbotsMEVExecutor({
            rpcUrl: ETHEREUM_RPC_HTTP,
            rpcWssUrl: ETHEREUM_RPC_WSS,
            walletPrivateKey: WALLET_PRIVATE_KEY,
            flashbots: {
                relayUrl: FLASHBOTS_RELAY_URL,
                relaySignerKey: FLASHBOTS_RELAY_SIGNER_KEY,
            },
            flashLoanContractAddress: FLASH_LOAN_CONTRACT_ADDRESS, // NEW
            flashLoanContractABI: FLASH_LOAN_CONTRACT_ABI,         // NEW
        });
        logger.info('Bot instance created and configured.');
    }

    public async initialize() {
        await this.executor.initialize();
        logger.info('Bot initialized successfully.');
    }

    public async startMempoolMonitoring() {
        await this.executor.startMonitoring();
    }
}
