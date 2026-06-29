import {
  Keypair,
  Connection,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";

// Your Alchemy RPC URL
const ALCHEMY_RPC = "https://solana-devnet.g.alchemy.com/v2/WJ2bNYSIxAdF0zFDRBx59";

// Create connection to Alchemy
const connection = new Connection(ALCHEMY_RPC, "confirmed");

// Generate a real Solana keypair
const wallet = Keypair.generate();

console.log("Your new Solana wallet:");
console.log("Public Key:", wallet.publicKey.toBase58());
console.log("Secret Key:", wallet.secretKey); // 64‑byte ed25519 key

// Optional: Airdrop SOL for testing
(async () => {
  const sig = await connection.requestAirdrop(wallet.publicKey, 1 * LAMPORTS_PER_SOL);
  console.log("Airdrop signature:", sig);
})();
