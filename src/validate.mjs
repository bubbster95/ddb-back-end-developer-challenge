// validate an array of inputs and return an error for one or all missing values
const validateinputs = (inputs) => {
  let errors = Object.keys(inputs).filter((input) => {
    return (
      (inputs[input] === undefined ||
        inputs[input] === "" ||
        inputs[input] === null) &&
      input
    );
  });

  let errorMessage = "Please fix the folowing input errors:";
  errors.map((error) => [
    (errorMessage = `${errorMessage} ${error}: "${inputs[error]}"`),
  ]);

  return errors.length > 0 && errorMessage;
};

export default validateinputs;
