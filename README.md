# Cross-chain RNG facade: orng.wax or EVM VRF

> **Domain:** cross-chain RNG routing  
> **Sources:** [SOURCES.md](SOURCES.md)  
> **Catalog:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)  
> **Path:** [ORNG-LEARNING-PATH.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md)

**Goal:** One facade, two backends. Preferred path builds an **unsent** `requestrand` or `requestRandomWords` body. Fallback switches when preferred is marked unavailable. Global open-job cap is 32. Fulfill is once-only.

**Code under test:** `npm test`. No live WAX or EVM calls, no wasm.

**WAX path:** [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng). **EVM VRF model:** [Chainlink VRF docs](https://docs.chain.link/vrf).

```bash
npm test
```

MIT — Pixel Journey
