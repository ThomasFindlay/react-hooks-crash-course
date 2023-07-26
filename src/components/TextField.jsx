import { forwardRef, memo, useImperativeHandle, useRef } from "react";

const TextField = (props, ref) => {
  const { label, ...inputProps } = props;
  console.log("text field rerendered");
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current?.focus();
    },
  }));
  return (
    <div className="flex flex-col">
      <label className="mb-2 text-left">{label}</label>
      <input
        className="px-4 py-3 border border-slate-200 shadow"
        ref={inputRef}
        {...inputProps}
      />
    </div>
  );
};

export default memo(forwardRef(TextField));
