import { ethers } from "ethers";
import Web3Modal from "web3modal";

// INTERNAL IMPORTS
import tokenICO from "./TokenICO.json";
import erc20 from "./ERC20.json";

export const TOKEN_ADDRESS = "0xD5BF9C13f95Fe3A5500c7d446eba9d4b845438E6";

export const ERC20_ABI = erc20.abi; // Corrected ABI assignment

export const OWNER_ADDRESS = "0x00DdD2488cF73E8F7B47AE45A67c3D70F0D118Ec";

export const CONTRACT_ADDRESS = "0x1160376820d5101C62824FFd4a0034089a4e49De";

export const CONTRACT_ABI = tokenICO.abi; // Corrected ABI assignment


const networks = {
  sepolia: {
    chainId: `0x${Number(11155111).toString(16)}`,
    chainName: "Sepolia",
    nativeCurrency: {
      name: "SepoliaETH",
      symbol: "SepoliaETH",
      decimals: 18,
    },
    rpcUrls: ["https://sepolia.infura.io/v3/"],
    blockExplorerUrls: ["https://sepolia.etherscan.io"],
  },
  holesky: {
    chainId: `0x${Number(17000).toString(16)}`,
    chainName: "Holesky",
    nativeCurrency: {
      name: "holesky",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/eth_holesky"],
    blockExplorerUrls: ["https://holesky.etherscan.io/"],
  },
  polygon_amoy: {
    chainId: `0x${Number(80002).toString(16)}`,
    chainName: "Polygon Amoy",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-amoy.polygon.technology/"],
    blockExplorerUrls: ["https://www.oklink.com/amoy"],
  },
  polygon_mumbai: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "Polygon Mumbai",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/polygon_mumbai"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
  polygon: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/polygon"],
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
  bsc: {
    chainId: `0x${Number(56).toString(16)}`,
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: {
      name: "Binance Chain Native Token",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/bsc"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  base_mainnet: {
    chainId: `0x${Number(8453).toString(16)}`,
    chainName: "Base Mainnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.base.org/"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  base_sepolia: {
    chainId: `0x${Number(84532).toString(16)}`,
    chainName: "Base Sepolia",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://sepolia.base.org"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  localhost: {
    chainId: `0x${Number(31337).toString(16)}`,
    chainName: "localhost",
    nativeCurrency: {
      name: "GO",
      symbol: "GO",
      decimals: 18,
    },
    rpcUrls: ["http://127.0.0.1:8545/"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
};

const changeNetwork = async ({ networkName }) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{ ...networks[networkName] }],
    });
  } catch (error) {
    console.error("Error changing network:", error.message);
  }
};

export const handleNetworkSwitch = async (networkName = "holesky") => {
  await changeNetwork({ networkName });
};

export const CHECK_WALLET_CONNECTED = async () => {
  if (!window.ethereum) {
    console.log("Please install MetaMask");
    return null; // Return null or handle accordingly
  }

  await handleNetworkSwitch();

  const accounts = await window.ethereum.request({ method: "eth_accounts" });

  if (accounts.length) {
    return accounts[0];
  } else {
    console.log("No accounts found. Please connect MetaMask.");
    return null;
  }
};

export const CONNECT_WALLET = async () => {
  try {
    if (!window.ethereum) {
      console.log("Please install MetaMask");
      return null;
    }
    await handleNetworkSwitch();

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    // Optionally, you can reload the page after a successful connection
    // window.location.reload();

    return accounts[0];
  } catch (error) {
    console.error("Error connecting wallet:", error);
    return null;
  }
};

const fetchContract = (address, abi, signer) => {
  return new ethers.Contract(address, abi, signer); // Added return statement
};

export const TOKEN_ICO_CONTRACT = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = fetchContract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    return contract;
  } catch (error) {
    console.error("Error connecting to contract:", error);
    return null;
  }
};

export const ERC20 = async (ADDRESS) => {
  try {
    // Initialize Web3Modal
    const web3Modal = new Web3Modal(); 
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    // Get network and signer details
    const network = await provider.getNetwork();
    const signer = provider.getSigner();

    // Fetch the contract instance
    const contract = fetchContract(ADDRESS, ERC20_ABI, signer);
    const userAddress = await signer.getAddress();

    // Fetch the token details
    const [balance, name, symbol, supply, decimals] = await Promise.all([
      contract.balanceOf(userAddress),
      contract.name(),
      contract.symbol(),
      contract.totalSupply(),
      contract.decimals(),
    ]);

    // Format the token details
    const token = {
      address: contract.address,
      name,
      symbol,
      decimals,
      supply: ethers.utils.formatUnits(supply, decimals),
      balance: ethers.utils.formatUnits(balance, decimals),
      chainId: network.chainId,
    };

    console.log(token);
    return token;

  } catch (error) {
    console.error("Error fetching ERC20 token details:", error);

    // Provide more context on common errors
    if (error.code === 'NETWORK_ERROR') {
      console.error('Network error: Please check your connection or network settings.');
    } else if (error.code === 'CALL_EXCEPTION') {
      console.error('Call exception: Contract interaction failed. Check the address or ABI.');
    }

    return null;
  }
};

export const ERC20_CONTRACT = async (contractAddress) => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = fetchContract(contractAddress, ERC20_ABI, signer);

    return contract;
  } catch (error) {
    console.error("Error connecting to ERC20 contract:", error);
    return null;
  }
};

export const GET_BALANCE = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const balance = await signer.getBalance();

    return ethers.utils.formatEther(balance);
  } catch (error) {
    console.error("Error getting balance:", error);
    return "0.00";
  }
};

export const CHECK_ACCOUNT_BALANCE = async (address) => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const balance = await provider.getBalance(address);

    return ethers.utils.formatEther(balance);
  } catch (error) {
    console.error("Error checking account balance:", error);
    return "0.00";
  }
};

export const addtokenToMetaMask = async () => {
  if (window.ethereum) {
    const tokenDetails = await ERC20(TOKEN_ADDRESS);

    const tokenDecimals = tokenDetails?.decimals;
    const tokenAddress = TOKEN_ADDRESS;
    const tokenSymbol = tokenDetails?.symbol;
    const tokenImage = "https://www.daulathussain.com/wp-content/uploads/2024/05/theblockchaincoders.jpg";

    try {
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            Image: tokenImage,
          },
        },
      });

      if (wasAdded) {
        return "Token Added Sucessfully";
      } else {
        return "Something went wrong";
      }
    }catch (error) {
      return "Failed to add";
    }
  } else{
    return "Metamask is not Installed";
  }
};

