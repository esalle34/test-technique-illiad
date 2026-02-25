import { type Dispatch, type SetStateAction } from "react";

interface Props {
  label: string;
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
}

export default function AcceptCGU({ label, checked, setChecked }: Props) {
  return (
    <label className="flex gap-2 items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      {label}
    </label>
  );
}
