"use client";

type QuickAddButtonProps = {
  book: any;
  onQuickAdd: (book: any) => void;
};

export default function QuickAddButton({
  book,
  onQuickAdd,
}: QuickAddButtonProps) {
  return (
    <button
      onClick={() => onQuickAdd(book)}
      className="
        w-full
        mt-3

        rounded-xl

        border
        border-green-700

        bg-white
        text-green-700

        py-3

        font-medium

        hover:bg-green-700
        hover:text-white

        active:scale-[0.98]

        transition-all
        duration-200

        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-green-600
        focus-visible:ring-offset-2
      "
    >
      + Add to Cart
    </button>
  );
}