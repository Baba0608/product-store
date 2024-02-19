import { ButtonLoading } from "./ButtonLoading";

export const Button = ({
  loading,
  content,
  functionOnClick,
  className,
  disabled,
}) => {
  if (!loading) {
    if (className === "update-product" || className === "add-to-cart") {
      return (
        <button
          className={`${className} mt-1 bg-blue-400 py-1 rounded-lg hover:bg-blue-500 text-lg w-[48%]`}
          onClick={functionOnClick}
          disabled={disabled}
        >
          {content}
        </button>
      );
    } else if (className === "view-product") {
      return (
        <button
          className={`${className} mt-1 bg-green-400 w-[48%] py-1 rounded-lg hover:bg-green-500 text-lg`}
          onClick={functionOnClick}
          disabled={disabled}
        >
          {content}
        </button>
      );
    } else if (className === "remove-from-cart") {
      return (
        <button
          className={`${className} mt-1 bg-red-400 py-1 rounded-lg hover:bg-red-500 text-lg w-[100%] md:w-[60%]`}
          onClick={functionOnClick}
          disabled={disabled}
        >
          {content}
        </button>
      );
    } else if (className === "delete-product") {
      return (
        <button
          className={`${className} mt-1 bg-red-400 w-[48%] py-1 rounded-lg hover:bg-red-500 text-lg`}
          onClick={functionOnClick}
          disabled={disabled}
        >
          {content}
        </button>
      );
    } else if (className === "add-product") {
      return (
        <button
          className={`${className} mt-1 bg-blue-400 py-1 rounded-lg hover:bg-blue-500 text-lg w-32`}
          onClick={functionOnClick}
          disabled={disabled}
        >
          {content}
        </button>
      );
    }
    return (
      <button
        className={`${className} mt-1 bg-blue-400 py-1 rounded-lg hover:bg-blue-500 text-lg w-[100%] sm:w-[30%]`}
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
