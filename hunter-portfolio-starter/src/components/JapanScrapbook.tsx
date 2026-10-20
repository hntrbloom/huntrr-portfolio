import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { japanTrip } from '../data';
import savedPhotos from '../content/japan-photos.json';
import RetroBox from './RetroBox';

type TripPhoto = { id: string; src: string; caption: string };

async function preparePhoto(file: File) {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) throw new Error('Please choose JPG, PNG, or WebP photos.');
  if (file.size > 25 * 1024 * 1024) throw new Error('Please choose photos smaller than 25 MB each.');
  const image = await createImageBitmap(file);
  try {
    const scale = Math.min(1, 1920 / Math.max(image.width, image.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(image.width * scale));
    canvas.height = Math.max(1, Math.round(image.height * scale));
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Your browser could not prepare this photo. Please try another browser.');
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/webp', 0.88);
  } finally {
    image.close();
  }
}

async function saveGallery(change: Record<string, unknown>): Promise<TripPhoto[]> {
  const response = await fetch('/__portfolio/japan-gallery', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(change),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'Could not save your photos. Please try again.');
  return result.photos;
}

export default function JapanScrapbook() {
  const [photos, setPhotos] = useState<TripPhoto[]>(savedPhotos);
  const [editing, setEditing] = useState(false);
  const [draftCaptions, setDraftCaptions] = useState<Record<string, string>>({});
  const [activeId, setActiveId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const activeIndex = photos.findIndex(photo => photo.id === activeId);
  const activePhoto = photos[activeIndex];
  const isOpen = Boolean(activePhoto);

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (dialog && !dialog.open) dialog.showModal();
    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog?.open) dialog.close();
    };
  }, [isOpen]);

  async function addPhotos(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    event.target.value = '';
    if (!files.length) return;
    setError('');
    setMessage('');
    if (files.length + photos.length > 30) {
      setError('Your scrapbook can hold up to 30 photos. Please select fewer images.');
      return;
    }
    setSaving(true);
    let added = 0;
    try {
      for (const file of files) {
        setMessage(`Saving photo ${added + 1} of ${files.length}…`);
        const dataUrl = await preparePhoto(file);
        setPhotos(await saveGallery({ operation: 'add', dataUrl, caption: '' }));
        added += 1;
      }
      setMessage(`${added} ${added === 1 ? 'photo' : 'photos'} saved to your scrapbook.`);
    } catch (cause) {
      setMessage(added ? `${added} ${added === 1 ? 'photo was' : 'photos were'} saved.` : '');
      setError(cause instanceof Error ? cause.message : 'Could not save this photo. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  async function saveCaptions() {
    setSaving(true);
    setError('');
    setMessage('');
    try {
      setPhotos(await saveGallery({ operation: 'captions', photos: photos.map(photo => ({ id: photo.id, caption: draftCaptions[photo.id] ?? photo.caption })) }));
      setDraftCaptions({});
      setMessage('Your photo captions are saved.');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not save your captions.');
    } finally {
      setSaving(false);
    }
  }

  async function removePhoto(id: string) {
    setSaving(true);
    setError('');
    setMessage('');
    try {
      setPhotos(await saveGallery({ operation: 'remove', id }));
      setDraftCaptions(previous => {
        const remaining = { ...previous };
        delete remaining[id];
        return remaining;
      });
      setMessage('Photo removed from the scrapbook.');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not remove this photo.');
    } finally {
      setSaving(false);
    }
  }

  function movePhoto(direction: number) {
    setActiveId(photos[(activeIndex + direction + photos.length) % photos.length].id);
  }

  function lightboxKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (photos.length > 1 && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
      event.preventDefault();
      movePhoto(event.key === 'ArrowLeft' ? -1 : 1);
    }
  }

  return <RetroBox title={japanTrip.title} icon="✿" className="japan-scrapbook" id="japan-scrapbook">
    <div className="japan-intro"><div><span className="pixel-label">A PAGE FROM MY SCRAPBOOK</span><p className="japan-subtitle">{japanTrip.subtitle}</p></div><span className="japan-stamp" aria-hidden="true">JAPAN<br /><span>日本</span><br />2 weeks · solo</span></div>
    <div className="japan-story">{japanTrip.story.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
    <div className="japan-keepsakes" aria-label="Reflections from the trip"><span>♡ independence</span><span>✧ a new perspective</span><span>☆ curiosity, everywhere</span></div>
    <div className="japan-gallery-heading"><div><h3>Postcards from Japan</h3><p>Little moments from an unforgettable adventure.</p></div><span aria-hidden="true">✧ ♡ ✧</span></div>
    {photos.length > 0 ? <div className="japan-photo-grid">
      {photos.map((photo, index) => <figure className="japan-polaroid" key={photo.id}>
        <span className="scrapbook-tape" aria-hidden="true" />
        <button className="japan-photo-button" type="button" aria-haspopup="dialog" aria-label={`Enlarge Japan photo ${index + 1}${photo.caption ? `: ${photo.caption}` : ''}`} onClick={() => setActiveId(photo.id)}>
          <img src={photo.src} alt={photo.caption || `A moment from Hunter's solo trip to Japan, photo ${index + 1}`} loading="lazy" width="640" height="480" />
          <span className="photo-enlarge" aria-hidden="true">↗</span>
        </button>
        <figcaption>{editing && import.meta.env.DEV ? <><label className="sr-only" htmlFor={`caption-${photo.id}`}>Caption for photo {index + 1}</label><input id={`caption-${photo.id}`} className="photo-caption-input" placeholder="A little memory…" maxLength={240} value={draftCaptions[photo.id] ?? photo.caption} disabled={saving} onChange={event => setDraftCaptions(previous => ({ ...previous, [photo.id]: event.target.value }))} /><button className="photo-remove" type="button" disabled={saving} onClick={() => removePhoto(photo.id)}>Remove photo</button></> : <span>{photo.caption || 'a little moment, a lasting memory ♡'}</span>}</figcaption>
      </figure>)}
    </div> : <div className="japan-empty-gallery">
      <div className="empty-polaroids" aria-hidden="true">{['♡', '✧', '☆'].map(icon => <div className="empty-polaroid" key={icon}><span className="scrapbook-tape" /><span className="empty-photo">{icon}</span><span className="empty-caption">a memory to keep</span></div>)}</div>
      <p>Room for a few favorite memories.<br /><span>Photos from my trip are coming soon.</span></p>
    </div>}
    {import.meta.env.DEV && <div className="japan-editor">
      <button className="text-link scrapbook-edit-toggle" type="button" disabled={saving || Object.keys(draftCaptions).length > 0} onClick={() => setEditing(!editing)} aria-expanded={editing} aria-controls="japan-photo-editor">{editing ? 'Close photo editor' : '✎ Edit my scrapbook'}</button>
      {editing && <div id="japan-photo-editor" className="japan-editor-controls">
        <p>Add your Japan photos and give each one a little caption.</p>
        <div className="japan-editor-buttons"><label className={`button photo-upload-label ${saving ? 'is-disabled' : ''}`}><input className="sr-only" type="file" multiple accept="image/jpeg,image/png,image/webp" disabled={saving} onChange={addPhotos} /><span>＋ Add photos</span></label>{photos.length > 0 && <button className="button" type="button" disabled={saving || !Object.keys(draftCaptions).length} onClick={saveCaptions}>Save captions</button>}</div>
        <p className="japan-upload-help">JPG, PNG, or WebP · multiple photos welcome · up to 30 photos.<br />Saved with your portfolio, ready for your next publish.</p>
      </div>}
      <p className="japan-save-status" role="status">{message}</p>{error && <p className="japan-save-error" role="alert">{error}</p>}
    </div>}
    <p className="japan-signoff">a piece of the world, always with me. <span aria-hidden="true">♡</span></p>
    <dialog className="japan-lightbox" ref={dialogRef} aria-labelledby="japan-lightbox-heading" aria-describedby="japan-lightbox-caption" onClose={() => setActiveId(null)} onCancel={() => setActiveId(null)} onKeyDown={lightboxKeyDown} onClick={event => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}>
      {activePhoto && <div className="japan-lightbox-content"><div className="japan-lightbox-toolbar"><h3 id="japan-lightbox-heading">Postcards from Japan</h3><button type="button" className="icon-button" aria-label="Close enlarged photo" autoFocus onClick={() => dialogRef.current?.close()}>×</button></div>
        <img className="japan-lightbox-image" src={activePhoto.src} alt={activePhoto.caption || `A moment from Hunter's solo trip to Japan, photo ${activeIndex + 1}`} />
        <div className="japan-lightbox-footer">{photos.length > 1 && <button className="button" type="button" onClick={() => movePhoto(-1)} aria-label="Previous photo">←</button>}<div aria-live="polite"><p id="japan-lightbox-caption">{activePhoto.caption || 'a little moment, a lasting memory ♡'}</p><span>{activeIndex + 1} / {photos.length}</span></div>{photos.length > 1 && <button className="button" type="button" onClick={() => movePhoto(1)} aria-label="Next photo">→</button>}</div>
      </div>}
    </dialog>
  </RetroBox>;
}
