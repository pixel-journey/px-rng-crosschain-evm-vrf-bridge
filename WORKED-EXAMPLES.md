# Worked examples — EVM/ORNG randomness bridge

Seed `ab`×32, assoc `job:42`.

## Preferred backends

| preferred | unsigned target | action |
| --- | --- | --- |
| orng | orng.wax | requestrand, **sent false** |
| chainlink_vrf | vrf_coordinator | requestRandomWords, numWords 1, **sent false** |

`requestWithFallback` when preferred unavailable switches to chainlink_vrf.

## Capacity and shape

MAX_OPEN open requests then overflow → `capacity`. Empty assoc / seed `zz` refused. callbackGasLimit **1** on VRF path → `bad gas`.

Preferred === fallback on emptyBridge → `same backend`.

Assoc `Job:ABC` lowercased to `job:abc` on the orng body.

## fulfill

First fulfill → phase `fulfilled`. Second → `not open`. Unknown id → `unknown`.

No live Chainlink or orng broadcast — facade planning only.
