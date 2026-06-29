  from nacl import signing
from nacl.encoding import HexEncoder

# ⚠️ Insert your API key and pubkey ONLY in your local environment
API_KEY = "WJ2bNYSIxAdF0zFDRBx59"
PUBKEY = "GwsPP9HHhCvEQeu3HTFzsVL6DEtnnYw4ALEtA3fMBC9Q"

# Generate a new keypair
signing_key = signing.SigningKey.generate()
verify_key = signing_key.verify_key

print("API Key:", API_KEY)
print("Provided Pubkey:", PUBKEY)
print("Generated Private Key:", signing_key.encode(encoder=HexEncoder).decode())
print("Generated Public Key:", verify_key.encode(encoder=HexEncoder).decode())
