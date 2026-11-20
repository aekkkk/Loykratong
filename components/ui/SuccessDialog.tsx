// Source: InitStudio (https://initstudio.aekkarat.com) by bballaek
// components/ui/SuccessDialog.tsx
"use client";

import { Dialog } from "@base-ui/react/dialog";
import { CircleCheck, X } from "lucide-react";
import styles from "./success-dialog.module.css";

export type SuccessDialogProps = {
  preview?: boolean;
  title?: string;
  description?: string;
  triggerLabel?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: () => void;
};

export function SuccessDialog({ preview = false, title = "Success heading", description = "Confirm what was completed and what happens next, in two lines or fewer.", triggerLabel = "Open dialog", confirmLabel = "Done", cancelLabel = "Cancel", open, onOpenChange, onConfirm }: SuccessDialogProps) {
  if (preview) return <section className={`${styles.popup} ${styles.preview}`} aria-label={title}>
    <button type="button" className={styles.close} aria-label="Close dialog preview"><X size={18} aria-hidden="true" /></button>
    <div className={styles.body}>
      <span className={styles.halo} aria-hidden="true"><span className={styles.icon}><CircleCheck size={28} strokeWidth={1.6} /></span></span>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
    <footer className={styles.footer}><button type="button" className={styles.cancel}>{cancelLabel}</button><button type="button" className={styles.confirm} onClick={onConfirm}>{confirmLabel}</button></footer>
  </section>;
  return <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Trigger className={styles.trigger}>{triggerLabel}</Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Backdrop className={styles.backdrop} />
      <Dialog.Popup className={styles.popup}>
        <Dialog.Close className={styles.close} aria-label="Close dialog"><X size={18} aria-hidden="true" /></Dialog.Close>
        <div className={styles.body}>
          <span className={styles.halo} aria-hidden="true"><span className={styles.icon}><CircleCheck size={28} strokeWidth={1.6} /></span></span>
          <Dialog.Title className={styles.title}>{title}</Dialog.Title>
          <Dialog.Description className={styles.description}>{description}</Dialog.Description>
        </div>
        <footer className={styles.footer}>
          <Dialog.Close className={styles.cancel}>{cancelLabel}</Dialog.Close>
          <Dialog.Close className={styles.confirm} onClick={onConfirm}>{confirmLabel}</Dialog.Close>
        </footer>
      </Dialog.Popup>
    </Dialog.Portal>
  </Dialog.Root>;
}
