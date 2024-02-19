import ClipLoader from "react-spinners/ClipLoader";

export const ButtonLoading = () => {
  return (
    <button className=" py-1 bg-blue-400 mt-1 rounded-lg flex justify-center w-[100%] md:w-[30%]">
      <ClipLoader size={28} />
    </button>
  );
};
