interface FormButtonProps {
  type: "submit" | "button";
  svg?: string;
  text?: string;
  method?: () => void | Promise<any>;
  className?: string;
}

const FormButton = ({type, svg, text, method, className}: FormButtonProps ) => {
  const handleClick = () => {
    if (method) {
      const result = method();
      if (result instanceof Promise) {
        result.then(() => {
          console.log('Action completed');
        }).catch((error) => {
          console.error('Action failed', error);
        });
      }
    }
  };

  return (
    <button onClick={handleClick} type={type} className={className}>
      {svg && <img src={svg} alt="button" />}
      {text}
    </button>
  );
};

export default FormButton;
