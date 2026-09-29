// Removes the baked-in checkerboard background from the logo artwork and writes a
// transparent, tightly cropped square PNG. Usage: node scripts/cutout-logo.cjs <in> <out.png>
const sharp = require('sharp')
const [, , input, output] = process.argv

;(async () => {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width: W, height: H } = info
  const isBg = (i) => {
    const r = data[i], g = data[i + 1], b = data[i + 2]
    // The checkerboard is neutral light grey/white; the artwork is green, gold or warm cream.
    return Math.max(r, g, b) - Math.min(r, g, b) <= 10 && Math.min(r, g, b) >= 205
  }
  // Flood fill from every border pixel so only background connected to the edge is removed.
  const seen = new Uint8Array(W * H)
  const stack = []
  for (let x = 0; x < W; x++) stack.push(x, (H - 1) * W + x)
  for (let y = 0; y < H; y++) stack.push(y * W, y * W + W - 1)
  while (stack.length) {
    const p = stack.pop()
    if (seen[p] || !isBg(p * 4)) continue
    seen[p] = 1
    data[p * 4 + 3] = 0
    const x = p % W, y = (p / W) | 0
    if (x > 0) stack.push(p - 1)
    if (x < W - 1) stack.push(p + 1)
    if (y > 0) stack.push(p - W)
    if (y < H - 1) stack.push(p + W)
  }
  // Soften the 1px fringe next to removed pixels.
  for (let p = 0; p < W * H; p++) {
    if (seen[p]) continue
    const x = p % W, y = (p / W) | 0
    const n = [p - 1, p + 1, p - W, p + W].filter((q, k) => (k === 0 ? x > 0 : k === 1 ? x < W - 1 : k === 2 ? y > 0 : y < H - 1))
    if (n.some((q) => seen[q]) && Math.min(data[p * 4], data[p * 4 + 1], data[p * 4 + 2]) > 190) data[p * 4 + 3] = 110
  }
  await sharp(data, { raw: { width: W, height: H, channels: 4 } })
    .png()
    .toBuffer()
    .then((png) => sharp(png).trim({ threshold: 1 }).png().toBuffer())
    .then((buf) => sharp(buf).metadata().then((m) => {
      const size = Math.max(m.width, m.height)
      return sharp(buf)
        .extend({
          top: Math.floor((size - m.height) / 2), bottom: Math.ceil((size - m.height) / 2),
          left: Math.floor((size - m.width) / 2), right: Math.ceil((size - m.width) / 2),
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .png()
        .toFile(output)
    }))
  console.log('wrote', output)
})()
