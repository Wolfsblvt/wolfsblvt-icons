export function npmInvocation() {
  if (!process.env.npm_execpath) {
    throw new Error("npm_execpath is required to run npm package checks.");
  }

  return {
    command: process.execPath,
    prefixArguments: [process.env.npm_execpath],
  };
}

export function parsePackManifest(output) {
  const packed = JSON.parse(output);
  const candidates = Array.isArray(packed)
    ? packed
    : packed?.filename
      ? [packed]
      : Object.values(packed);
  const manifest = candidates.find(
    (candidate) => candidate?.filename && Array.isArray(candidate.files),
  );

  if (!manifest) {
    throw new Error("npm pack did not return a package manifest.");
  }

  return manifest;
}
