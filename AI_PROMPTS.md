# AI handoff — cross-chain EVM VRF facade

## Agent tooling

```bash
git clone https://github.com/wharfkit/skill.git ~/.claude/skills/wharfkit
```

| Source | Role |
| --- | --- |
| [Chainlink VRF](https://docs.chain.link/vrf) | Real consumer requirements |
| [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) | **Prefer on WAX** |
| [Solana facade](https://github.com/pixel-journey/px-rng-crosschain-solana-pyth) | Similar unsent plan shape |
| [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent) | Once-resolve idea |

## Non-negotiables

1. Bodies stay **unsent**. Not a live bridge.
2. Preferred and fallback backends must **differ**.
3. Fulfill is **once** so dual-backend delivery cannot double-pay.
4. Prefer **orng.wax** on WAX instead of a cross-chain facade when orng is available.
5. Do **not** tag this lab `orng` as if it were native orng.wax.
6. Not Alcor Bridge (different product — deposit addresses / wrap.alcor).

## Prompt seeds

- "Preferred orng vs fallback Chainlink-shaped request — must differ?"
- "Second fulfill — double-pay or once?"
- "When is a cross-chain VRF facade justified if orng is up on WAX?"
- "Contrast with Alcor Bridge credit rules (unrelated)."

## Do not

- Broadcast request bodies from this pure lab.
- Allow two fulfills to pay twice.
- Conflate with Alcor Bridge onboarding.
