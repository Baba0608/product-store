import { ButtonLoading } from "./ButtonLoading";

export const Button = ({
  loading,
  content,
  functionOnClick,
  className,
  disabled,
}) => {
  if (!loading) {
    return (
      <button
        className={className}
        onClick={functionOnClick}
        disabled={disabled}
      >
        {content}
      </button>
    );
  } else {
    return <ButtonLoading />;
  }
};
