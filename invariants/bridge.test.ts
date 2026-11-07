import assert from "node:assert/strict";
import test from "node:test";
import {
  MAX_OPEN,
  emptyBridge,
  fulfill,
  requestRandomness,
  requestWithFallback,
} from "./bridge.ts";

const SEED = "ab".repeat(32);
const ASSOC = "job:42";

test("preferred orng builds unsent requestrand", () => {
  const s = emptyBridge("orng", "chainlink_vrf");
  const { plan, state } = requestRandomness(s, {
    assoc: ASSOC,
    seedOrKeyHash: SEED,
  });
  assert.equal(plan.ok, true);
  if (!plan.ok) return;
  assert.equal(plan.backend, "orng");
  assert.equal(plan.unsigned.target, "orng.wax");
  if (plan.unsigned.target === "orng.wax") {
    assert.equal(plan.unsigned.sent, false);
    assert.equal(plan.unsigned.action, "requestrand");
  }
  assert.equal(state.open.size, 1);
});

test("chainlink backend builds unsent requestRandomWords", () => {
  const s = emptyBridge("chainlink_vrf", "orng");
  const { plan } = requestRandomness(s, {
    assoc: ASSOC,
    seedOrKeyHash: SEED,
    callbackGasLimit: 100_000,
  });
  assert.equal(plan.ok, true);
  if (!plan.ok) return;
  assert.equal(plan.backend, "chainlink_vrf");
  assert.equal(plan.unsigned.target, "vrf_coordinator");
  if (plan.unsigned.target === "vrf_coordinator") {
    assert.equal(plan.unsigned.numWords, 1);
    assert.equal(plan.unsigned.sent, false);
  }
});

test("fallback switches when preferred unavailable", () => {
  const s = emptyBridge("orng", "chainlink_vrf");
  const { plan } = requestWithFallback(s, {
    assoc: ASSOC,
    seedOrKeyHash: SEED,
    preferredAvailable: false,
    callbackGasLimit: 150_000,
  });
  assert.equal(plan.ok, true);
  if (!plan.ok) return;
  assert.equal(plan.backend, "chainlink_vrf");
});

test("capacity refused at MAX_OPEN", () => {
  let s = emptyBridge();
  for (let i = 0; i < MAX_OPEN; i++) {
    const r = requestRandomness(s, {
      assoc: "a" + i,
      seedOrKeyHash: SEED,
    });
    assert.equal(r.plan.ok, true);
    s = r.state;
  }
  const full = requestRandomness(s, { assoc: "overflow", seedOrKeyHash: SEED });
  assert.equal(full.plan.ok, false);
  if (!full.plan.ok) assert.equal(full.plan.reason, "capacity");
});

test("bad assoc and seed refused", () => {
  const s = emptyBridge();
  assert.equal(
    requestRandomness(s, { assoc: "", seedOrKeyHash: SEED }).plan.ok,
    false,
  );
  assert.equal(
    requestRandomness(s, { assoc: ASSOC, seedOrKeyHash: "zz" }).plan.ok,
    false,
  );
});

test("bad callback gas refused on vrf path", () => {
  const s = emptyBridge("chainlink_vrf", "orng");
  const r = requestRandomness(s, {
    assoc: ASSOC,
    seedOrKeyHash: SEED,
    callbackGasLimit: 1,
  });
  assert.equal(r.plan.ok, false);
  if (!r.plan.ok) assert.equal(r.plan.reason, "bad gas");
});

test("fulfill binds randomness once", () => {
  let s = emptyBridge();
  const { plan, state } = requestRandomness(s, {
    assoc: ASSOC,
    seedOrKeyHash: SEED,
  });
  assert.equal(plan.ok, true);
  if (!plan.ok) return;
  s = state;
  const id = plan.request.id;
  let f = fulfill(s, id, "cd".repeat(16));
  assert.equal(f.ok, true);
  if (!f.ok) return;
  s = f.state;
  assert.equal(s.open.get(id)!.phase, "fulfilled");
  f = fulfill(s, id, "ee".repeat(16));
  assert.equal(f.ok, false);
  if (!f.ok) assert.equal(f.reason, "not open");
});

test("fulfill unknown id refused", () => {
  const f = fulfill(emptyBridge(), 99, "aa".repeat(16));
  assert.equal(f.ok, false);
  if (!f.ok) assert.equal(f.reason, "unknown");
});

test("same preferred and fallback refused", () => {
  assert.throws(() => emptyBridge("orng", "orng"), /same backend/);
});

test("assoc is lowercased on the orng body", () => {
  const { plan } = requestRandomness(emptyBridge(), {
    assoc: "Job:ABC",
    seedOrKeyHash: SEED,
  });
  assert.equal(plan.ok, true);
  if (!plan.ok) return;
  if (plan.unsigned.target === "orng.wax") {
    assert.equal(plan.unsigned.assoc, "job:abc");
  }
});
