# Education — orng.wax ↔ Chainlink-style VRF request facade

> **Rung:** `npm test` passes. Builds **unsent** request shapes. Does not call Ethereum, Chainlink, or `orng.wax`.  
> **The test is the rule.**

Preferred backend is either `orng` or `chainlink_vrf`. Optional fallback switches when preferred is marked unavailable. Fulfill is once-only.

WAX path: [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) · [RNG tutorial](https://docs.wax.io/build/tutorials/create-wax-rng-smart-contract/rng_sample).  
EVM path: Chainlink VRF is the conceptual peer — this lab only mirrors request/fulfill **shape**, not a live consumer contract.

Sibling: [Solana Pyth/Switchboard facade](https://github.com/pixel-journey/px-rng-crosschain-solana-pyth).

## Learning outcomes

| Level | After this file |
| --- | --- |
| Beginner | Name both unsigned targets and that both stay `sent: false` |
| Intermediate | Capacity, gas bounds, fallback switch |
| Masterclass | Why a facade is not a bridge; once-fulfill still required |

---

## Beginner

Preferred `orng` → unsigned target `orng.wax`, action `requestrand`, **sent false**.  
Preferred `chainlink_vrf` → target `vrf_coordinator`, `requestRandomWords`, numWords 1, **sent false**.

Seed is 64 hex chars; assoc is lowercased on the orng body.

## Intermediate

- `requestWithFallback` when preferred unavailable switches backend.  
- Open requests capped at `MAX_OPEN`; overflow → `capacity`.  
- Bad seed / empty assoc refused. VRF gas limit **1** → `bad gas`.  
- Preferred === fallback on emptyBridge → refused.

## Masterclass

A production cross-chain product still needs: real RPC, payment of VRF fees, callback security (who may fulfill), and **one** settlement path so a late orng delivery cannot double-pay a Chainlink fulfillment. This repository only teaches planning and once-fulfill bookkeeping.

### Common mistakes

1. Using the same account as preferred and fallback (no real failover).  
2. Keying fulfillment on "latest request" instead of the id in the callback.  
3. Paying if both backends deliver.  
4. Setting `sent: true` in a unit test that never broadcast.  
5. Porting this facade onto WAX and skipping `orng.wax`.

### Nice-to-have extensions (not in this repo)

| Idea | Note |
| --- | --- |
| Real coordinator callback | Needs the chain's VRF contract and a consumer |
| Words-to-game mapping | [loot CDF](https://github.com/pixel-journey/px-orng-weighted-loot-table-cdf) / rejection sampling |
| WAX settlement of an EVM result | Bridge trust assumptions, separate audit |

Numbers: [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md).

### Exercises

1. Are request bodies sent? (`sent: false`)  
2. Preferred === fallback — accepted? (No.)  
3. Preferred RNG on WAX mainnet? (`orng.wax`)
