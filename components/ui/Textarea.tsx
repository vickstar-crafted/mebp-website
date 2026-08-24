import {
  forwardRef,
  TextareaHTMLAttributes,
} from "react";

type TextareaProps =
  TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ className = "", ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      {...props}
      className={`
        w-full
        rounded-xl
        border
        border-gray-300
        bg-white
        px-4
        py-3
        text-gray-900
        placeholder:text-gray-400
        outline-none
        transition
        resize-none
        focus:border-green-600
        focus:ring-2
        focus:ring-green-600/20
        disabled:bg-gray-100
        disabled:cursor-not-allowed
        ${className}
      `}
    />
  );
});

Textarea.displayName = "Textarea";

export default Textarea;