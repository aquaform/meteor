type Props = {
  className?: string;
  children: React.ReactNode;
};

function Label({ className = "", children, ...props }: Props) {
  return (
    <label
      className={`${className} block font-medium text-sm text-gray-700`}
      {...props}
    >
      {children}
    </label>
  );
}

export default Label;
