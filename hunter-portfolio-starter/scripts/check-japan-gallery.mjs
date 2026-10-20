import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { Readable } from 'node:stream';
import { test } from 'node:test';
import { createJapanGalleryMiddleware } from './japan-gallery-plugin.mjs';

const origin = 'http://127.0.0.1:5174';
const photo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=';

async function request(handler, input, overrides = {}) {
  const { raw, ...options } = overrides;
  const req = Readable.from([raw ?? JSON.stringify(input)]);
  Object.assign(req, {
    url: '/__portfolio/japan-gallery', method: 'POST',
    headers: { host: '127.0.0.1:5174', origin, 'content-type': 'application/json' },
    ...options,
  });
  const result = { status: 200, headers: {}, next: false, body: null };
  const res = {
    statusCode: 200,
    setHeader(key, value) { result.headers[key] = value; },
    end(value) { result.status = this.statusCode; result.body = JSON.parse(value); },
  };
  await handler(req, res, () => { result.next = true; });
  return result;
}

await test('Japan scrapbook saves publishable photos and captions without a network listener', async t => {
  const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), 'japan-gallery-test-'));
  const manifest = path.join(temporaryRoot, 'src/content/japan-photos.json');
  await mkdir(path.dirname(manifest), { recursive: true });
  await writeFile(manifest, '[]');
  t.after(async () => {
    const resolved = path.resolve(temporaryRoot);
    assert.ok(resolved.startsWith(path.resolve(os.tmpdir()) + path.sep) && path.basename(resolved).startsWith('japan-gallery-test-'));
    await rm(resolved, { recursive: true, force: true });
  });
  const handler = createJapanGalleryMiddleware(temporaryRoot);

  await t.test('unrelated routes pass through', async () => {
    assert.equal((await request(handler, {}, { url: '/about' })).next, true);
  });

  await t.test('other origins, remote hosts, and unexpected methods cannot write files', async () => {
    assert.equal((await request(handler, {}, { headers: { host: '127.0.0.1:5174', origin: 'https://other.example' } })).status, 403);
    assert.equal((await request(handler, {}, { headers: { host: 'remote.example', origin: 'http://remote.example' } })).status, 403);
    assert.equal((await request(handler, {}, { method: 'GET' })).status, 405);
    assert.equal((await request(handler, {}, { headers: { host: '127.0.0.1:5174', origin, 'content-type': 'text/plain' } })).status, 415);
    assert.deepEqual(JSON.parse(await readFile(manifest, 'utf8')), []);
  });

  await t.test('multiple uploads are serialized, saved to disk, and survive a new middleware instance', async () => {
    const responses = await Promise.all([
      request(handler, { operation: 'add', dataUrl: photo, caption: 'A little memory ♡' }),
      request(handler, { operation: 'add', dataUrl: photo, caption: '' }),
    ]);
    assert.ok(responses.every(response => response.status === 200), JSON.stringify(responses));
    const photos = JSON.parse(await readFile(manifest, 'utf8'));
    assert.equal(photos.length, 2);
    assert.notEqual(photos[0].id, photos[1].id);
    for (const item of photos) {
      assert.match(item.src, /^\/images\/japan\/[a-f0-9-]+\.png$/);
      assert.ok((await readFile(path.join(temporaryRoot, 'public', item.src))).length > 0);
    }
    const restarted = createJapanGalleryMiddleware(temporaryRoot);
    const result = await request(restarted, { operation: 'captions', photos: [{ id: photos[1].id, caption: ' A new perspective. ' }] });
    assert.equal(result.status, 200);
    assert.equal(result.body.photos[0].caption, 'A little memory ♡');
    assert.equal(result.body.photos[1].caption, 'A new perspective.');
  });

  await t.test('bad images, malformed data, overly long captions, and huge bodies leave the gallery intact', async () => {
    const before = await readFile(manifest, 'utf8');
    for (const input of [
      { operation: 'add', dataUrl: 'data:image/svg+xml;base64,PHN2Zy8+' },
      { operation: 'add', dataUrl: 'data:image/png;base64,bm90YW5pbWFnZQ==' },
      { operation: 'add', dataUrl: photo, caption: 'x'.repeat(241) },
      { operation: 'captions', photos: [{ id: 'missing', caption: 5 }] },
      { operation: 'unknown' },
    ]) assert.equal((await request(handler, input)).status, 400);
    assert.equal((await request(handler, {}, { raw: 'invalid JSON' })).status, 400);
    assert.equal((await request(handler, {}, { raw: 'x'.repeat(6 * 1024 * 1024 + 1) })).status, 413);
    assert.equal(await readFile(manifest, 'utf8'), before);
  });

  await t.test('removal updates the gallery while retaining the image file', async () => {
    const photos = JSON.parse(await readFile(manifest, 'utf8'));
    const result = await request(handler, { operation: 'remove', id: photos[0].id });
    assert.equal(result.status, 200);
    assert.equal(result.body.photos.length, 1);
    assert.ok((await readFile(path.join(temporaryRoot, 'public', photos[0].src))).length > 0);
    assert.equal((await request(handler, { operation: 'remove', id: '../../outside' })).status, 400);
  });

  await t.test('gallery capacity is enforced before saving another image', async () => {
    const photos = Array.from({ length: 30 }, (_, index) => ({ id: String(index), src: '/images/japan/example.png', caption: '' }));
    await writeFile(manifest, JSON.stringify(photos));
    const fileCount = (await readdir(path.join(temporaryRoot, 'public/images/japan'))).length;
    assert.equal((await request(handler, { operation: 'add', dataUrl: photo })).status, 400);
    assert.equal((await readdir(path.join(temporaryRoot, 'public/images/japan'))).length, fileCount);
    assert.equal(JSON.parse(await readFile(manifest, 'utf8')).length, 30);
  });
});
