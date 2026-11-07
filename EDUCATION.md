# Education

Games should not hard-code a single entropy vendor. A facade lets the product call `requestRandomness` while ops chooses `orng.wax` on WAX or a Chainlink-style VRF consumer on EVM.

The important invariants are shared: bounded open jobs, normalized assoc/seed, unsent action bodies, and once-only fulfill. Backend-specific fields (signing value vs key hash and gas limit) stay inside the plan.
