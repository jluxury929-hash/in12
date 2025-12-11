import { FlashbotsMEVExecutor } from './FlashbotsMEVExecutor'; 
import logger from './logger'; 

// --- Environment Variables ---
const ETHEREUM_RPC_HTTP = process.env.ETHEREUM_RPC_HTTP as string;
const ETHEREUM_RPC_WSS = process.env.ETHEREUM_RPC_WSS as string;
const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY as string;
const FLASHBOTS_RELAY_URL = process.env.FLASHBOTS_RELAY_URL as string;
const FLASHBOTS_RELAY_SIGNER_KEY = process.env.FLASHBOTS_RELAY_SIGNER_KEY as string;
const FLASH_LOAN_CONTRACT_ADDRESS = process.env.FLASH_LOAN_CONTRACT_ADDRESS as string; 
// IMPORTANT: Replace this placeholder ABI with the actual JSON ABI from your compiled Solidity contract!
const FLASH_LOAN_CONTRACT_ABI = [ 
    "function requestFlashLoan(address token, uint256 amount, bytes memory data) external payable",
    "function executeOperation(address asset, uint256 amount, uint256 premium, address initiator, bytes calldata params) external returns (bool)",
    "function owner() view returns (address)"
]; 

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
            flashLoanContractAddress: FLASH_LOAN_CONTRACT_ADDRESS,
            flashLoanContractABI: FLASH_LOAN_CONTRACT_ABI,
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
