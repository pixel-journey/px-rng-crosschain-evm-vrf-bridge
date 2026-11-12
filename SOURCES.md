# Official sources

| Source | Use |
| --- | --- |
| [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) | WAX-native `requestrand` path |
| [WAX RNG sample](https://docs.wax.io/build/tutorials/create-wax-rng-smart-contract/rng_sample) | docs.wax.io sample |
| [Chainlink VRF](https://docs.chain.link/vrf) | EVM VRF request/fulfill model (conceptual) |
| [docs.wax.io](https://docs.wax.io/) | WAX development |

Bodies in this lab are **unsent**. Gas / LINK billing and real VRF verification are out of scope.

## Domain map

| Repo | Role |
| --- | --- |
| ORNG domain | WAX-only oracle |
| **This repo** | Facade: prefer orng or EVM VRF; once-only fulfill |
| [px-rng-crosschain-solana-pyth](https://github.com/pixel-journey/px-rng-crosschain-solana-pyth) | Solana-side entropy / price gates |
