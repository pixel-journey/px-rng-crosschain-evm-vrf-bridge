/**
 * Cross-chain RNG facade (educational).
 * Routes requestRandomness to orng.wax or a Chainlink-style VRF consumer.
 * Bodies are unsigned. No live chain. No wasm.
 */

export type Backend = "orng" | "chainlink_vrf";

export const MAX_OPEN = 32;
export const MIN_ASSOC = 1;
export const MAX_ASSOC = 64;
export const KEY_HASH_HEX = 64;
export const MIN_CALLBACK_GAS = 50_000;
export const MAX_CALLBACK_GAS = 2_500_000;

export type OpenRequest = {
  id: number;
  backend: Backend;
  assoc: string;
  seedOrKeyHash: string;
  callbackGasLimit?: number;
  phase: "open" | "fulfilled" | "cancelled";
  randomness: string | null;
};

export type BridgeState = {
  preferred: Backend;
  fallback: Backend;
  open: Map<number, OpenRequest>;
  nextId: number;
};

export type RoutePlan =
  | {
      ok: true;
      backend: Backend;
      request: OpenRequest;
      unsigned:
        | {
            target: "orng.wax";
            action: "requestrand";
            assoc: string;
            signingValue: string;
            sent: false;
          }
        | {
            target: "vrf_coordinator";
            action: "requestRandomWords";
            keyHash: string;
            callbackGasLimit: number;
            numWords: 1;
            sent: false;
          };
    }
  | { ok: false; reason: string };

const HEX = /^[0-9a-f]+$/;

export function emptyBridge(
  preferred: Backend = "orng",
  fallback: Backend = "chainlink_vrf",
): BridgeState {
  if (preferred === fallback) throw new Error("same backend");
  return {
    preferred,
    fallback,
    open: new Map(),
    nextId: 1,
  };
}

function normalizeAssoc(assoc: string): string {
  const a = assoc.toLowerCase();
  if (a.length < MIN_ASSOC || a.length > MAX_ASSOC) throw new Error("bad assoc");
  if (!/^[0-9a-z._:-]+$/.test(a)) throw new Error("bad assoc");
  return a;
}

function normalizeHex(h: string, len: number, label: string): string {
  const hex = h.toLowerCase();
  if (!HEX.test(hex) || hex.length !== len) throw new Error("bad " + label);
  return hex;
}

export function requestRandomness(
  state: BridgeState,
  input: {
    assoc: string;
    seedOrKeyHash: string;
    callbackGasLimit?: number;
    forceBackend?: Backend;
  },
): { plan: RoutePlan; state: BridgeState } {
  if (state.open.size >= MAX_OPEN) {
    return { plan: { ok: false, reason: "capacity" }, state };
  }
  let assoc: string;
  let seed: string;
  try {
    assoc = normalizeAssoc(input.assoc);
    seed = normalizeHex(input.seedOrKeyHash, KEY_HASH_HEX, "seed");
  } catch (e) {
    return { plan: { ok: false, reason: (e as Error).message }, state };
  }

  const backend = input.forceBackend ?? state.preferred;

  const id = state.nextId;
  if (backend === "chainlink_vrf") {
    const gas = input.callbackGasLimit ?? 200_000;
    if (
      !Number.isInteger(gas) ||
      gas < MIN_CALLBACK_GAS ||
      gas > MAX_CALLBACK_GAS
    ) {
      return { plan: { ok: false, reason: "bad gas" }, state };
    }
    const request: OpenRequest = {
      id,
      backend,
      assoc,
      seedOrKeyHash: seed,
      callbackGasLimit: gas,
      phase: "open",
      randomness: null,
    };
    const open = new Map(state.open);
    open.set(id, request);
    return {
      plan: {
        ok: true,
        backend,
        request,
        unsigned: {
          target: "vrf_coordinator",
          action: "requestRandomWords",
          keyHash: seed,
          callbackGasLimit: gas,
          numWords: 1,
          sent: false,
        },
      },
      state: { ...state, open, nextId: id + 1 },
    };
  }

  const request: OpenRequest = {
    id,
    backend: "orng",
    assoc,
    seedOrKeyHash: seed,
    phase: "open",
    randomness: null,
  };
  const open = new Map(state.open);
  open.set(id, request);
  return {
    plan: {
      ok: true,
      backend: "orng",
      request,
      unsigned: {
        target: "orng.wax",
        action: "requestrand",
        assoc,
        signingValue: seed,
        sent: false,
      },
    },
    state: { ...state, open, nextId: id + 1 },
  };
}

export function requestWithFallback(
  state: BridgeState,
  input: {
    assoc: string;
    seedOrKeyHash: string;
    callbackGasLimit?: number;
    preferredAvailable: boolean;
  },
): { plan: RoutePlan; state: BridgeState } {
  const backend = input.preferredAvailable ? state.preferred : state.fallback;
  return requestRandomness(state, {
    assoc: input.assoc,
    seedOrKeyHash: input.seedOrKeyHash,
    callbackGasLimit: input.callbackGasLimit,
    forceBackend: backend,
  });
}

export function fulfill(
  state: BridgeState,
  id: number,
  randomness: string,
): { ok: true; state: BridgeState } | { ok: false; reason: string } {
  const req = state.open.get(id);
  if (!req) return { ok: false, reason: "unknown" };
  if (req.phase !== "open") return { ok: false, reason: "not open" };
  const hex = randomness.toLowerCase();
  if (!HEX.test(hex) || hex.length < 16 || hex.length > 128 || hex.length % 2) {
    return { ok: false, reason: "bad randomness" };
  }
  const open = new Map(state.open);
  open.set(id, { ...req, phase: "fulfilled", randomness: hex });
  return { ok: true, state: { ...state, open } };
}
