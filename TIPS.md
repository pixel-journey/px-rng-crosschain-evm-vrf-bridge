# Tips — EVM VRF facade (unsent bodies)

This file plans a request. It does not deploy a Chainlink consumer, verify a proof, or send a transaction.

## Do

- Keep preferred and fallback **different** backends.
- Cap how many requests can be open at once.
- Fulfill **once** per id. A second delivery must not change the stored word.
- Lowercase assoc ids if you later join this to an orng-style path.

## Don't

- Set `sent: true` in a unit test that never broadcast.
- Pay if both backends deliver. One request, one payout.
- Treat `requestRandomWords` JSON as proof the coordinator was called.

## Common mistakes

1. Using the same account as preferred and fallback (no real failover).
2. Keying fulfillment on "latest request" instead of the id in the callback.
3. Copying this facade onto WAX and skipping [orng](https://github.com/pixel-journey/px-orng-v3-randnotify-starter). On WAX, orng is the native service.
4. Assuming subscription balances and LINK fees are modeled here. They are not.

## Nice-to-have extensions (not in this repo)

| Idea | Note |
| --- | --- |
| Real coordinator callback | Needs the chain's VRF contract and a consumer |
| Words-to-game mapping | [loot CDF](https://github.com/pixel-journey/px-orng-weighted-loot-table-cdf) / rejection sampling |
| WAX settlement of an EVM result | Bridge trust assumptions, separate audit |

Related: [Solana facade](https://github.com/pixel-journey/px-rng-crosschain-solana-pyth) · [dual ORNG](https://github.com/pixel-journey/px-orng-dual-callback-idempotent) · `px-contract-examples-vault` (private index; not this public course)
