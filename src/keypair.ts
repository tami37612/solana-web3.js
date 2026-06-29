import { Keypair, Connection } from "@solana/web3.js";
import bs58 from "bs58";

// Your Alchemy RPC URL (Devnet)
const ALCHEMY_RPC = "https://solana-devnet.g.alchemy.com/v2/WJ2bNYSIxAdF0zFDRBx59";

// Your provided public key (string)
const PROVIDED_PUBLIC_KEY = "GwsPP9HHhCvEQeu3HTFzsVL6DEtnnYw4ALEtA3fMBC9Q";

// Connect to Alchemy
const connection = new Connection(ALCHEMY_RPC, "confirmed");

async function main() {
  console.log("Using Alchemy RPC:", ALCHEMY_RPC);
  console.log("Provided Public Key:", PROVIDED_PUBLIC_KEY);

  // Generate a real Solana keypair (ed25519)
  const keypair = Keypair.generate();

  // Extract public + secret keys
  const generatedPublicKey = keypair.publicKey.toBase58();
  const secretKeyUint8 = keypair.secretKey;
  const secretKeyBase58 = bs58.encode(secretKeyUint8);

  console.log("\n=== Generated Solana Keypair ===");
  console.log("Generated Public Key:", generatedPublicKey);
  console.log("Generated Secret Key (Uint8Array):", secretKeyUint8);
  console.log("Generated Secret Key (Base58):", secretKeyBase58);

  // Optional: Airdrop 1 SOL for testing
  try {
    const sig = await connection.requestAirdrop(keypair.publicKey, 1_000_000_000);
    console.log("\nAirdrop Signature:", sig);
  } catch (err) {
    console.log("\nAirdrop failed:", err);
  }
}

main();

