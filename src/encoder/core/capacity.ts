import { capacities } from "./constants.ts";
import type { Capacity, ErrorCorrectionLevel, Modes } from "../types/types.ts";

/**
 * This function calculates the appropriate QR code version and error correction level based on the length of the input data, the encoding mode, and optionally specified version and error correction level. It checks the capacity table to ensure that the data can fit within the constraints of the chosen version and error correction level, throwing errors if the data is too long for the specified parameters or for any QR code version.
 */

function capacity(
  length: number,
  mode: Modes,
  version?: number,
  ec?: ErrorCorrectionLevel,
): Capacity {
  if (length < 0) throw new RangeError("Length cannot be negative.");

  const modeIndex = { 1: 0, 2: 1, 4: 2, 8: 3 }[mode];
  const ecIndex = ec !== undefined ? { L: 0, M: 1, Q: 2, H: 3 }[ec] : undefined;

  if (modeIndex === undefined) throw new Error("Invalid mode");
  if (ec !== undefined && ecIndex === undefined) {
    throw new Error("Invalid error correction level");
  }

  const getCapacity = (versionNumber: number, ecLevel: number): number =>
    capacities[(versionNumber - 1) * 16 + ecLevel * 4 + modeIndex];

  const isValidVersion = (versionNumber: number): boolean =>
    Number.isInteger(versionNumber) &&
    versionNumber >= 1 &&
    versionNumber <= 40;

  if (version !== undefined && !isValidVersion(version)) {
    throw new Error("Invalid version");
  }

  if (version !== undefined && ecIndex !== undefined) {
    const limit = getCapacity(version, ecIndex);

    if (length > limit) {
      throw new Error(
        `Data too long for version ${version} and EC ${ec}. Max ${limit}.`,
      );
    }

    return { version, ec: ecIndex, mode, capacity: limit };
  }

  if (version !== undefined) {
    for (let ecLevel = 3; ecLevel >= 0; ecLevel--) {
      const limit = getCapacity(version, ecLevel);

      if (limit >= length) {
        return {
          version,
          ec: ecLevel,
          mode,
          capacity: limit,
        };
      }
    }

    throw new Error(`Data too long for version ${version}.`);
  }

  if (ecIndex !== undefined) {
    for (let v = 1; v <= 40; v++) {
      const limit = getCapacity(v, ecIndex);

      if (limit >= length) {
        return {
          version: v,
          ec: ecIndex,
          mode,
          capacity: limit,
        };
      }
    }

    throw new Error(`Data too long for EC ${ec}.`);
  }

  for (let v = 1; v <= 40; v++) {
    for (let ecLevel = 3; ecLevel >= 0; ecLevel--) {
      const limit = getCapacity(v, ecLevel);

      if (limit >= length) {
        return {
          version: v,
          ec: ecLevel,
          mode,
          capacity: limit,
        };
      }
    }
  }

  throw new Error(
    `Data too long. Max for mode ${mode} is ${
      getCapacity(40, 0)
    } (Version 40, EC L).`,
  );
}

export { capacity };
