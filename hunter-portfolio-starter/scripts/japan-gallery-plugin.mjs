import { randomUUID } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const endpoint = '/__portfolio/japan-gallery';
const bodyLimit = 6 * 1024 * 1024;
const photoLimit = 30;

function caption(value) {
  if (typeof value !== 'string' || value.length > 240) throw new Error('Captions must be 240 characters or fewer.');
  return value.trim();
}

function decodePhoto(dataUrl) {
  const match = typeof dataUrl === 'string' && /^data:image\/(webp|png|jpeg);base64,([A-Za-z0-9+/]+={0,2})$/.exec(dataUrl);
  if (!match) throw new Error('Please choose a JPG, PNG, or WebP photo.');
  const bytes = Buffer.from(match[2], 'base64');
  const signatures = {
    webp: bytes.subarray(0, 4).toString() === 'RIFF' && bytes.subarray(8, 12).toString() === 'WEBP',
    png: bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])),
    jpeg: bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255,
  };
  if (!signatures[match[1]] || bytes.length > 4 * 1024 * 1024) throw new Error('This photo is invalid or too large. Please choose another image.');
  return { bytes, extension: match[1] === 'jpeg' ? 'jpg' : match[1] };
}

// Authoring is available only in Vite's local dev server. Production is static.
export function createJapanGalleryMiddleware(root) {
  const manifestPath = path.join(root, 'src/content/japan-photos.json');
  const photoDirectory = path.join(root, 'public/images/japan');
  let pending = Promise.resolve();
  return async function japanGalleryMiddleware(req, res, next) {
    if (req.url?.split('?')[0] !== endpoint) return next();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store');
    const reply = (status, value) => { res.statusCode = status; res.end(JSON.stringify(value)); };
    const host = req.headers.host || '';
    if (!/^(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/i.test(host) || req.headers.origin !== `http://${host}`) {
      return reply(403, { error: 'Photo editing is available only from this local preview.' });
    }
    if (req.method !== 'POST') return reply(405, { error: 'Use POST to save your photos.' });
    if (!req.headers['content-type']?.startsWith('application/json')) return reply(415, { error: 'Photo data must be JSON.' });
    try {
      let size = 0;
      const chunks = [];
      for await (const chunk of req) {
        size += Buffer.byteLength(chunk);
        if (size > bodyLimit) return reply(413, { error: 'This upload is too large. Please choose a smaller photo.' });
        chunks.push(Buffer.from(chunk));
      }
      const input = JSON.parse(Buffer.concat(chunks).toString('utf8'));
      const update = pending.then(async () => {
        const photos = JSON.parse(await readFile(manifestPath, 'utf8'));
        if (input.operation === 'add') {
          if (photos.length >= photoLimit) throw new Error(`Your scrapbook can hold up to ${photoLimit} photos.`);
          const text = caption(input.caption ?? '');
          const { bytes, extension } = decodePhoto(input.dataUrl);
          const id = randomUUID();
          await mkdir(photoDirectory, { recursive: true });
          await writeFile(path.join(photoDirectory, `${id}.${extension}`), bytes);
          photos.push({ id, src: `/images/japan/${id}.${extension}`, caption: text });
        } else if (input.operation === 'captions') {
          if (!Array.isArray(input.photos) || input.photos.length > photoLimit) throw new Error('Invalid photo captions.');
          const changes = new Map(input.photos.map(photo => [photo.id, caption(photo.caption)]));
          for (const photo of photos) if (changes.has(photo.id)) photo.caption = changes.get(photo.id);
        } else if (input.operation === 'remove') {
          const index = photos.findIndex(photo => photo.id === input.id);
          if (index === -1) throw new Error('This photo is no longer in the gallery.');
          photos.splice(index, 1); // Keep the original file recoverable on disk.
        } else {
          throw new Error('Unknown scrapbook action.');
        }
        // Serialize the small manifest writes; replacing an open file by rename
        // is unreliable in Windows workspaces and cloud-synced folders.
        await writeFile(manifestPath, `${JSON.stringify(photos, null, 2)}\n`, 'utf8');
        return photos;
      });
      pending = update.catch(() => {});
      return reply(200, { photos: await update });
    } catch (error) {
      // Avoid exposing filesystem paths in a browser error message.
      if (error.code) console.error('Japan scrapbook save failed:', error);
      return reply(400, { error: error instanceof SyntaxError ? 'The photo data could not be read.' : error.code ? 'Could not save the scrapbook. Please try again.' : error.message || 'Could not save this change.' });
    }
  };
}

export default function japanGalleryPlugin() {
  return {
    name: 'local-japan-scrapbook',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(createJapanGalleryMiddleware(server.config.root));
    },
  };
}
