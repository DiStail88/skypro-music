type FilterItemProps = {
  value: string;
  isSelected: boolean;
  onClick: (value: string) => void;
};

export default function FilterItem({
  value,
  isSelected,
  onClick,
}: FilterItemProps) {
  return <div onClick={() => onClick(value)}>{value}</div>;
}
