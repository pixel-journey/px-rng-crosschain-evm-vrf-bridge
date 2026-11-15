# Worked examples — EVM VRF / orng facade

Seed `ab`×32, assoc `job:42`.

## Preferred orng

`emptyBridge("orng", "chainlink_vrf")` → unsigned target `orng.wax`, action `requestrand`, `sent:false`, one open job. Assoc `Job:ABC` is stored lowercased as `job:abc`.

## Preferred Chainlink-style VRF

Backend `chainlink_vrf` → target `vrf_coordinator`, `numWords` 1, `sent:false`. Gas limit 1 refused (`bad gas`).

## Fallback

Preferred orng unavailable → plan backend becomes `chainlink_vrf`.

## Capacity and fulfill

`MAX_OPEN` jobs then next request → `capacity`.

Fulfill with `cd`×16 → phase `fulfilled`. Second fulfill → `not open`. Unknown id → `unknown`.

Same preferred and fallback backends throws `same backend`. Empty assoc or seed `zz` refused.

Bodies are **unsent**. No LINK billing, no live orng.
