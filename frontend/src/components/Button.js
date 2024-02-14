import { ButtonLoading } from "./ButtonLoading";

export const Button = ({
  loading,
  id,
  content,
  functionOnClick,
  className,
}) => {
  if (!loading) {
    return (
      <button id={id} className={className} onClick={functionOnClick}>
        {content}
      </button>
    );
  } else {
    return <ButtonLoading />;
  }
};
