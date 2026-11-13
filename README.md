# Route randomness: orng.wax or Chainlink-style VRF

> **Domain:** cross-chain RNG facade  
> **Sources:** [SOURCES.md](SOURCES.md)  
> **Path:** [ORNG-LEARNING-PATH.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md)

**Goal:** Preferred/fallback routing between `orng.wax::requestrand` and a Chainlink-style `requestRandomWords` consumer. **Unsigned** bodies only (`sent: false`). Fulfill once.

**Code under test:** `npm test`. No live chain, no VRF proof verification.

## Learning materials

| Doc | Role |
| --- | --- |
| [EDUCATION.md](EDUCATION.md) | Beginner → masterclass |
| [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md) | Route, gas, fulfill |
| [TIPS.md](TIPS.md) | Primary path discipline |
| [SECURITY.md](SECURITY.md) | Capacity and bounds |
| [SOURCES.md](SOURCES.md) | Official |

```bash
npm test
```

MIT — Pixel Journey
