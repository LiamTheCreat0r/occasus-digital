import { useEffect, useRef } from "react";
import { useT } from "~/i18n";
import { IconChevron, IconClose } from "./Icons";
import styles from "./Lightbox.module.css";

/** Accessible screenshot viewer built on <dialog> (focus trap + Esc for free). */
export function Lightbox({
  images,
  index,
  alt,
  onChange,
  onClose,
}: {
  images: string[];
  index: number | null;
  alt: string;
  onChange: (i: number) => void;
  onClose: () => void;
}) {
  const t = useT();
  const ref = useRef<HTMLDialogElement>(null);
  const open = index !== null;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onChange((index + 1) % images.length);
      if (e.key === "ArrowLeft") onChange((index - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, images.length, onChange]);

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      aria-label={alt}
    >
      {open && (
        <>
          <img src={images[index]} alt={`${alt} ${index + 1}/${images.length}`} className={styles.img} />
          <button className={`${styles.btn} ${styles.close}`} onClick={onClose} aria-label={t("lightbox.close")}>
            <IconClose />
          </button>
          {images.length > 1 && (
            <>
              <button
                className={`${styles.btn} ${styles.prev}`}
                onClick={() => onChange((index - 1 + images.length) % images.length)}
                aria-label={t("lightbox.prev")}
              >
                <IconChevron dir="left" />
              </button>
              <button
                className={`${styles.btn} ${styles.next}`}
                onClick={() => onChange((index + 1) % images.length)}
                aria-label={t("lightbox.next")}
              >
                <IconChevron />
              </button>
              <p className={styles.count}>
                {index + 1} / {images.length}
              </p>
            </>
          )}
        </>
      )}
    </dialog>
  );
}
