import { Keypair, Connection } from "@solana/web3.js";

// Your Alchemy RPC URL
const ALCHEMY_RPC = "https://solana-devnet.g.alchemy.com/v2/WJ2bNYSIxAdF0zFDRBx59";

// Connect to Alchemy
const connection = new Connection(ALCHEMY_RPC, "confirmed");

// Generate a real Solana keypair (ed25519)
const wallet = Keypair.generate();

// Show your new wallet
console.log("Public Key:", wallet.publicKey.toBase58());
console.log("Secret Key (64-byte array):", wallet.secretKey);

// Optional: Airdrop SOL for testing
(async () => {
  try {
    const sig = await connection.requestAirdrop(wallet.publicKey, 1_000_000_000); // 1 SOL
    console.log("Airdrop Signature:", sig);
  } catch (err) {
    console.log("Airdrop failed:", err);
  }
})();

