/**
 * Core rendering properties common across all execution environments.
 */
export interface BaseOptions {
  size?: number;
  scale?: number;
  margin?: number;
  color?: {
    dark?: string;
    light?: string;
  };
  content?: string;
}

/**
 * Single source-of-truth configuration interface split by execution environments.
 */
export interface RenderOptions {
  frontend: BaseOptions & {
    /** Target output format optimized for the browser DOM. */
    type?: "svg" | "canvas";
  };
  backend: BaseOptions & {
    /** Target output format optimized for low-level asynchronous binary streams. */
    type?: "svg" | "png";
  };
}

export type FrontendOptions = RenderOptions["frontend"];
export type BackendOptions = RenderOptions["backend"];
