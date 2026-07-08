"use client";
import { CircleCheckBig } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  slug: string;
  quantity: number;
  onClose: () => void;
};

export default function CartToast({
  title,
  slug,
  quantity,
  onClose,
}: Props) {
  return (
    <div
  className="
    fixed

    top-24
    right-6

    z-[200]

    w-[360px]

    bg-white

    rounded-2xl

    shadow-2xl

    border

    p-5

    animate-in
    fade-in
    slide-in-from-right-5

    duration-300
    ease-out
  "
>
      <div className="flex justify-between items-start mb-4">

        <div>

          <div className="flex items-center gap-2">
    <CircleCheckBig
        size={18}
        className="text-green-700"
    />

    <p className="text-green-700 font-bold">
        Added to Cart
    </p>
</div>

          <p className="text-gray-500 text-sm">
            Item added to your cart
          </p>

        </div>

        <button
    onClick={onClose}
    className="
        text-gray-400

        hover:text-gray-700

        text-xl

        active:scale-90

        transition-all

        duration-150
    "
>
          ×
        </button>

      </div>

      <div className="flex gap-4">

        <Image
          src={`https://opigtrpgtyssktfybqqy.supabase.co/storage/v1/object/public/book-covers/${slug}.jpg`}
          alt={title}
          width={130}
          height={120}
          className="rounded-lg border"
        />

        <div className="flex-1">

          <h3 className="font-semibold text-gray-900 leading-5">
            {title}
          </h3>

          <p className="text-gray-500 mt-2">
            Quantity:
            <span className="font-semibold text-gray-800">
              {" "}
              {quantity}
            </span>
          </p>

          <Link
            href="/cart"
            className="
inline-block

mt-4

bg-green-700

text-white

px-4

py-2

rounded-xl

hover:bg-green-800

active:scale-[0.98]

transition-all

duration-200
"
          >
            View Cart →
          </Link>

        </div>

      </div>
    </div>
  );
}