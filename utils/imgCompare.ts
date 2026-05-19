import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';

const pixelmatch =
  require('pixelmatch').default || require('pixelmatch');

export function compareImages(
  baselinePath: string,
  actualPath: string,
  diffPath: string
) {
  const baseline = PNG.sync.read(
    fs.readFileSync(baselinePath)
  );

  const actual = PNG.sync.read(
    fs.readFileSync(actualPath)
  );

  const { width: bw, height: bh } = baseline;
  const { width: aw, height: ah } = actual;

  if (bw !== aw || bh !== ah) {
    throw new Error(
      `Image dimensions do not match.
       Baseline: ${bw}x${bh},
       Actual: ${aw}x${ah}`
    );
  }

  const diff = new PNG({
    width: bw,
    height: bh
  });

  const mismatchedPixels = pixelmatch(
    baseline.data,
    actual.data,
    diff.data,
    bw,
    bh,
    { threshold: 0.1 }
  );

  // ✅ Ensure folder exists
  const diffDir = path.dirname(diffPath);

  if (!fs.existsSync(diffDir)) {
    fs.mkdirSync(diffDir, { recursive: true });
  }

  fs.writeFileSync(
    diffPath,
    PNG.sync.write(diff)
  );

  return mismatchedPixels;
}