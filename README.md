# px-rng-crosschain-evm-vrf-bridge

> **Trust:** private educational lab (Tier B)  
> **Domain:** cross-chain RNG routing  
> **Sources:** [SOURCES.md](SOURCES.md)  
> **Vault:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

One facade, two backends. Preferred path builds an **unsent** `requestrand` or `requestRandomWords` body. Fallback switches when preferred is marked unavailable. Global open-job cap is 32. Fulfill is once-only.

**Real code:** `npm test`. No live WAX or EVM calls, no wasm.

WAX path: [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng). EVM VRF model: [Chainlink VRF docs](https://docs.chain.link/vrf).

## Run

```bash
npm test
```

MIT — Pixel Journey
