# Tips — dual-backend RNG facade

## Do

- Keep preferred and fallback **different** backends.
- Cap concurrent open requests.
- Fulfill **once** per request id; ignore second entropy.
- Lowercase assoc ids if the orng path expects it.

## Don't

- Mark unsent bodies as sent in unit tests.
- Treat this TypeScript plan as a deployed Chainlink consumer.
- Pay on both backends if both somehow deliver.

## Related

[Solana facade](https://github.com/pixel-journey/px-rng-crosschain-solana-pyth) · [dual ORNG callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent) · [ORNG path](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md)
