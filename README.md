# px-rng-crosschain-evm-vrf-bridge

> **Trust:** private educational lab (Tier B)  
> **Quest:** 017 — route `requestRandomness` to orng.wax or Chainlink-style VRF  
> **Vault:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

One facade, two backends. Preferred path builds an **unsent** `requestrand` or `requestRandomWords` body. Fallback switches when preferred is marked unavailable. Global open-job cap is 32. Fulfill is once-only.

**Real code:** `npm test`. No live WAX or EVM calls, no wasm.

## Run

```bash
npm test
```

MIT — Pixel Journey
