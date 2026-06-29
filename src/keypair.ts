// keypair.ts
import {generateKeypair, getPublicKey, Ed25519Keypair} from './utils/ed25519';
import {PublicKey} from './publickey';

export interface Signer {
  publicKey: PublicKey;
  secretKey: Uint8Array;
}

export class Keypair {
  private _keypair: Ed25519Keypair;

  constructor(keypair?: Ed25519Keypair) {
    this._keypair = keypair ?? generateKeypair();
  }

  static generate(): Keypair {
    return new Keypair(generateKeypair());
  }

  static fromSecretKey(
    secretKey: Uint8Array,
    options?: {skipValidation?: boolean},
  ): Keypair {
    if (secretKey.byteLength !== 64) {
      throw new Error('bad secret key size');
    }
    const publicKey = secretKey.slice(32, 64);
    if (!options || !options.skipValidation) {
      const privateScalar = secretKey.slice(0, 32);
      const computedPublicKey = getPublicKey(privateScalar);
      for (let ii = 0; ii < 32; ii++) {
        if (publicKey[ii] !== computedPublicKey[ii]) {
          throw new Error('provided secretKey is invalid');
        }
      }
    }
    return new Keypair({publicKey, secretKey});
  }

  static fromSeed(seed: Uint8Array): Keypair {
    const publicKey = getPublicKey(seed);
    const secretKey = new Uint8Array(64);
    secretKey.set(seed);
    secretKey.set(publicKey, 32);
    return new Keypair({publicKey, secretKey});
  }

  get publicKey(): PublicKey {
    return new PublicKey(this._keypair.publicKey);
  }

  get secretKey(): Uint8Array {
    return new Uint8Array(this._keypair.secretKey);
  }
}
