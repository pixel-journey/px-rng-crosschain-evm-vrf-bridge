# Sources

| Source | Use |
| --- | --- |
| [Chainlink VRF](https://docs.chain.link/vrf) | What a real consumer must implement |
| [docs.wax.io](https://docs.wax.io/) | If the payout settles on WAX |
| [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) | **Prefer this on WAX** instead of a cross-chain facade |
| [RNG tutorial](https://docs.wax.io/build/tutorials/create-wax-rng-smart-contract/rng_sample) | Sample dapp path |

Bodies in this repository stay **unsent**. Preferred and fallback must differ. Fulfill is **once** so dual-backend delivery cannot double-pay.

## Related labs

| Lab | Topic |
| --- | --- |
| [Solana facade](https://github.com/pixel-journey/px-rng-crosschain-solana-pyth) | Pyth / Switchboard shapes + publishTime gate |
| [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent) | Once-resolve on native orng paths |
| [v3 starter](https://github.com/pixel-journey/px-orng-v3-randnotify-starter) | Native WAX job table |
| [drand](https://github.com/pixel-journey/px-rng-fallback-drand-bls-verifier) | Educational public-randomness fallback |
| `px-contract-examples-vault` (private index; not this public course) | Section E |
