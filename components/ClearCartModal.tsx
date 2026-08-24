"use client";

import { Trash2 } from "lucide-react";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

type ClearCartModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ClearCartModal({
  open,
  onClose,
  onConfirm,
}: ClearCartModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
          <Trash2
            size={26}
            className="text-red-600"
          />
        </div>

        <h2 className="mt-5 text-2xl font-bold text-gray-900">
          Clear your cart?
        </h2>

        <p className="mt-3 text-gray-600">
          This will remove all books and quantities
          from your shopping cart.
        </p>

        <div className="mt-8 space-y-3">
          <Button
            type="button"
            variant="outline"
            fullWidth
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="danger"
            fullWidth
            onClick={onConfirm}
          >
            <span className="flex items-center justify-center gap-2">
              <Trash2 size={18} />

              <span>Yes, Clear Cart</span>
            </span>
          </Button>
        </div>
      </div>
    </Modal>
  );
}