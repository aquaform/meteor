type Props = {
  status: boolean;
  className?: string;
};

function AuthSessionStatus({ status, className = "", ...props }: Props) {
  return (
    status && (
      <div
        className={`${className} font-medium text-sm text-green-600`}
        {...props}
      >
        {status}
      </div>
    )
  );
}

export default AuthSessionStatus;
