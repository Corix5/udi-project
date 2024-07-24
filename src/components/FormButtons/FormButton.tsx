interface FormButtonProps {
  type: "submit" | "button";
  svg?: string;
  text?: string;
  method?: () => void;
  className?: string;
}

const FormButton = ({type, svg, text, method, className}: FormButtonProps ) => {
  return (
    <>
      <button onClick={method} type={type} className={className}>
        <img src={svg} alt="button" />
        {text}
        </button>
    </>
  );
};

export default FormButton;
