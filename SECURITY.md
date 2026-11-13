# Security notes — EVM facade

| Mitigated | Behavior |
| --- | --- |
| Same preferred/fallback | refused at emptyBridge |
| Bad assoc / seed | refused |
| Bad gas | refused |
| Capacity | max 32 open |
| Double fulfill | refused |

**Not mitigated:** real VRF verification, economic fee payment.
