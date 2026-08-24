import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string;
};

export default function Modal({
  open,
  onClose,
  children,
  maxWidth = "max-w-md",
}: ModalProps) {
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/40
        p-4
        backdrop-blur-sm
        animate-in
        fade-in
        duration-300
        ease-out
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          relative
          w-full
          ${maxWidth}
          rounded-2xl
          bg-white
          p-8
          shadow-2xl
          animate-in
          fade-in
          zoom-in-95
          duration-300
          ease-out
        `}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="
            absolute
            right-4
            top-4
            text-gray-400
            transition-all
            duration-150
            hover:text-gray-700
            active:scale-90
          "
        >
          <X size={22} />
        </button>

        {children}
      </div>
    </div>
  );
}