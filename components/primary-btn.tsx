import { type LucideIcon } from "lucide-react";

export default function PrimaryBtn({
  label,
  onClick,
  disabled,
  classname,
  title,
  icon: Icon,
}: {
  label?: string;
  onClick: () => void;
  disabled?: boolean;
  classname?: string;
  title?: string;
  icon?: LucideIcon;
}) {
  return (
    <button onClick={onClick} disabled={disabled} className={classname}>
      {Icon && <Icon size={20} />}
      {label}
    </button>
  );
}