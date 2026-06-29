import { Connection, Keypair } from "@solana/web3.js";
import { Jupiter } from "@jup-ag/core";

const connection = new Connection("https://solana-devnet.g.alchemy.com/v2/YOUR_API_KEY");
const wallet = Keypair.fromSecretKey(Uint8Array.from(YOUR_PRIVATE_KEY_ARRAY));

(async () => {
  const jupiter = await Jupiter.load({
    connection,
    cluster: "devnet",
    user: wallet,
  });

  const inputMint = "So11111111111111111111111111111111111111112"; // SOL
  const outputMint = "TOKEN_MINT_ADDRESS"; // Your SPL token

  const routes = await jupiter.computeRoutes({
    inputMint,
    outputMint,
    amount: 10000000, // 0.01 SOL
    slippage: 1,
  });

  const { execute } = await jupiter.exchange({
    routeInfo: routes.routes[0],
  });

  const txid = await execute();
  console.log("Trade complete:", txid);
})();
