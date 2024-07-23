interface FormButtonProps {
  type: "submit" | "button";
  svg?: string;
  text: string;
  method?: () => void;
}

const FormButton = ({type, svg, text, method}: FormButtonProps ) => {
  return (
    <>
      <button onClick={method} type={type} className="btn btn-light d-flex gap-2 align-center">
        <img src={svg} alt="button" />
        {text}
        </button>
    </>
  );
};

export default FormButton;
