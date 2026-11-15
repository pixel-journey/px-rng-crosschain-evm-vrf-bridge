# Security — EVM/ORNG request facade

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Capacity overflow | capacity |
| Bad seed / empty assoc | refused |
| Bad VRF gas | refused |
| Same preferred and fallback | refused |
| Second fulfill | not open |
| Unknown id | unknown |

## Not closed

| Concern | Guidance |
| --- | --- |
| Who may fulfill | Chain allow-list / VRF coordinator only |
| Fee payment | Real LINK / native fee paths |
| Cross-backend double delivery | Single settlement flag shared |
| Live RPC | Not in this repo |
