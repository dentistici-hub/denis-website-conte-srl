/**
 * scene-registry — internal glue between the <InteractiveThreeScene> Astro
 * primitive and user-authored Three.js setup code.
 *
 * User code calls `registerThreeScene(id, setup)`. The primitive calls
 * `_mountScene(id, config)` once the canvas is live. Whichever call happens
 * first wins — the other side rendezvouses via the map keyed by `id`.
 *
 * Not a public API beyond `registerThreeScene` and the types below.
 */

export interface FrameCtx {
  elapsed: number; // ms since mount
  delta: number; // ms since previous frame
}

export interface SceneContext {
  canvas: HTMLCanvasElement;
  host: HTMLElement;
  onFrame: (cb: (ctx: FrameCtx) => void) => void;
  onDispose: (cb: () => void) => void;
  getMouse: () => [number, number];
  getScroll: () => { progress: number; velocity: number } | null;
}

export interface MountConfig {
  canvas: HTMLCanvasElement;
  host: HTMLElement;
  getMouse: () => [number, number];
  getScroll: () => { progress: number; velocity: number } | null;
}

interface SceneRecord {
  setup?: (ctx: SceneContext) => void;
  context?: SceneContext;
  frameCbs: Array<(ctx: FrameCtx) => void>;
  disposeCbs: Array<() => void>;
  mounted: boolean;
}

const registry = new Map<string, SceneRecord>();

function ensure(id: string): SceneRecord {
  let rec = registry.get(id);
  if (!rec) {
    rec = { frameCbs: [], disposeCbs: [], mounted: false };
    registry.set(id, rec);
  }
  return rec;
}

export function registerThreeScene(
  id: string,
  setup: (ctx: SceneContext) => void,
): void {
  const rec = ensure(id);
  rec.setup = setup;
  if (rec.mounted && rec.context) setup(rec.context);
}

export function _mountScene(id: string, config: MountConfig): SceneRecord {
  // If a lingering record exists (hot reload / double mount), dispose first.
  const existing = registry.get(id);
  if (existing && existing.mounted) _unmountScene(id);
  const rec = ensure(id);
  rec.frameCbs = [];
  rec.disposeCbs = [];
  rec.mounted = true;
  const ctx: SceneContext = {
    canvas: config.canvas,
    host: config.host,
    onFrame: (cb) => rec.frameCbs.push(cb),
    onDispose: (cb) => rec.disposeCbs.push(cb),
    getMouse: config.getMouse,
    getScroll: config.getScroll,
  };
  rec.context = ctx;
  if (rec.setup) rec.setup(ctx);
  return rec;
}

export function _unmountScene(id: string): void {
  const rec = registry.get(id);
  if (!rec || !rec.mounted) return;
  for (const cb of rec.disposeCbs) {
    try {
      cb();
    } catch (err) {
      console.warn(`scene-registry: dispose callback failed for "${id}"`, err);
    }
  }
  rec.frameCbs = [];
  rec.disposeCbs = [];
  rec.context = undefined;
  rec.mounted = false;
}

export function _getRecord(id: string): SceneRecord | undefined {
  return registry.get(id);
}
