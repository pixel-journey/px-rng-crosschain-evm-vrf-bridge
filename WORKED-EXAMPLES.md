# Worked examples — EVM bridge facade

## Example A — preferred orng

`emptyBridge("orng", "chainlink_vrf")` then request → unsigned target `orng.wax`.

## Example B — force VRF

`forceBackend: "chainlink_vrf"` with valid gas → `requestRandomWords` body.

## Example C — bad gas

Outside 50_000..2_500_000 → `bad gas`.

## Example D — capacity

More than MAX_OPEN (32) → `capacity`.

## Example E — fulfill

Open id + hex randomness → fulfilled; second fulfill → `not open`.

## Example F — fallback

`preferredAvailable: false` routes to fallback backend.
