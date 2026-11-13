# Education — EVM VRF / orng.wax facade

> **Rung:** `npm test` passes. **Unsigned** bodies only — no broadcast.  
> On WAX prefer [orng.wax](https://github.com/worldwide-asset-exchange/wax-orng). This lab teaches **routing**, not Chainlink production integration.

## What you should be able to do

| Level | Skill |
| --- | --- |
| Beginner | Preferred vs fallback backend |
| Intermediate | Shape of `requestrand` vs `requestRandomWords` bodies |
| Masterclass | Capacity, gas bounds, fulfill once |

## Beginner

`requestRandomness` picks `orng` or `chainlink_vrf` and returns an open request plus an unsent action sketch (`sent: false`).

## Intermediate

- ORNG path: `orng.wax` / `requestrand` / assoc + signingValue  
- VRF path: coordinator / `requestRandomWords` / keyHash + gas + numWords 1

`requestWithFallback` switches backend when preferred is unavailable.

## Masterclass

Fulfill records randomness once. This does **not** verify VRF proofs or pay LINK. Production bridges need those layers.

## Will not teach

Live Chainlink subscriptions, LINK funding, or claiming mainnet WAX cross-chain RNG.
