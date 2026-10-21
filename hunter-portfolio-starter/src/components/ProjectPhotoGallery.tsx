import { useEffect, useId, useRef, useState } from 'react';
import type { ProjectPhoto } from '../data';

export default function ProjectPhotoGallery({ photos, projectTitle }: { photos: ProjectPhoto[]; projectTitle: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingId = useId();
  const captionId = useId();
  const activePhoto = activeIndex === null ? undefined : photos[activeIndex];
  const isOpen = Boolean(activePhoto);

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog?.showModal();
    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog?.open) dialog.close();
      if (trigger?.isConnected) trigger.focus();
    };
  }, [isOpen]);

  function movePhoto(direction: number) {
    setActiveIndex(index => index === null ? null : (index + direction + photos.length) % photos.length);
  }

  return <section className="project-photo-gallery" aria-label={`${projectTitle} photo gallery`}>
    <h3>Photo gallery</h3>
    <p className="project-gallery-help">A few moments to keep. Select a photo to see it larger.</p>
    <div className="project-photo-grid">
      {photos.map((photo, index) => <figure className="project-photo" key={photo.src}>
        <button className="project-photo-button" type="button" aria-haspopup="dialog" aria-label={`Enlarge photo ${index + 1}: ${photo.caption}`} onClick={() => setActiveIndex(index)}>
          <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" />
          <span className="photo-enlarge" aria-hidden="true">↗</span>
        </button>
        <figcaption>{photo.caption}</figcaption>
      </figure>)}
    </div>
    <dialog className="project-lightbox" ref={dialogRef} aria-labelledby={headingId} aria-describedby={captionId} onClose={() => setActiveIndex(null)} onKeyDown={event => {
      if (event.key === 'Tab') {
        const controls = event.currentTarget.querySelectorAll<HTMLButtonElement>('button:not([disabled])');
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        movePhoto(event.key === 'ArrowLeft' ? -1 : 1);
      }
    }}>
      {activePhoto && <div className="project-lightbox-content">
        <div className="project-lightbox-toolbar"><h3 id={headingId}>{projectTitle} · Photo gallery</h3><button type="button" className="icon-button" aria-label="Close enlarged photo" autoFocus onClick={() => dialogRef.current?.close()}>×</button></div>
        <img className="project-lightbox-image" src={activePhoto.src} alt={activePhoto.alt} width={activePhoto.width} height={activePhoto.height} />
        <div className="project-lightbox-footer">
          <button className="button" type="button" aria-label="Previous photo" onClick={() => movePhoto(-1)}>←</button>
          <div aria-live="polite"><p id={captionId}>{activePhoto.caption}</p><span>{activeIndex! + 1} / {photos.length}</span></div>
          <button className="button" type="button" aria-label="Next photo" onClick={() => movePhoto(1)}>→</button>
        </div>
      </div>}
    </dialog>
  </section>;
}
