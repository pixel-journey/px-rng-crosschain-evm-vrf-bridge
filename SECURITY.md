# Security — EVM VRF request facade

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Capacity overflow | refused |
| Bad seed / empty assoc | refused |
| Bad VRF gas | refused |
| Same preferred and fallback | refused |
| Second fulfill | not open |
| Unknown id | unknown |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Who may fulfill | Chain allow-list / VRF coordinator only |
| Fee payment | Real LINK / native fee paths |
| Cross-backend double delivery | Single settlement flag shared |
| Live RPC | Not in this repo |
| Proof verify | Coordinator callback is authority; this lab stores a word |

## Attack angles

1. Using the same account as preferred and fallback (no real failover).
2. Keying fulfillment on "latest request" instead of the id in the callback.
3. Paying if both backends deliver.
4. Setting `sent: true` in a unit test that never broadcast.
5. Porting this facade onto WAX and skipping [orng](https://github.com/pixel-journey/px-orng-v3-randnotify-starter).

## Honesty limits

Unsent bodies only. Not Chainlink, not orng. Prefer [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) on WAX. Related: [Solana facade](https://github.com/pixel-journey/px-rng-crosschain-solana-pyth) · [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent).
