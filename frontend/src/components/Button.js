import { ButtonLoading } from "./ButtonLoading";

export const Button = ({ loading, id, content, submitFormData }) => {
  if (!loading) {
    return (
      <button type="submit" id={id} onClick={submitFormData}>
        {content}
      </button>
    );
  } else {
    return <ButtonLoading />;
  }
};
