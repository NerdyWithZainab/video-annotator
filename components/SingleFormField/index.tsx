import { TextField, Typography } from "@mui/material";
import { FormattedMessage, IntlShape, useIntl } from "react-intl";
import { get } from "lodash-es";
import { Question } from "../../types";

const SingleFormField: React.FC<{ question: Question }> = ({ question }) => {
  // question.type = "Boop";
  const intl: IntlShape = useIntl();
  const handleChange: (event: React.ChangeEvent<HTMLInputElement>)=>void = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentVal: any = event?.currentTarget?.value;
    (question?.setValue && question?.actualValue && question?.label) ? question.setValue({...question.actualValue, [question.label]: currentVal}): undefined;
    const newIsValidBoolean: boolean = question.validatorMethod ? question.validatorMethod(currentVal) : true;
    (question?.setIsValid && question?.isValid && question?.label) ? question?.setIsValid({...question.isValid, [question.label]: newIsValidBoolean} ) : undefined;

  }
  console.log("deleteMe question is: ");
  console.log(question);
  const isError: boolean = Boolean(get(question, ["isValid", question?.label], false));
  console.log('deleteMe isError is: ');
  console.log(isError);
  switch(question?.type){
    case 'URL':
      return (<TextField
        required={question?.isRequired}
        fullWidth
        data-testid={question?.testId}
        error={isError}
        variant="filled"
        label={
          question?.label
        }
        helperText={
          question?.isValid
            ? intl.formatMessage({
                id: question?.invalidInputMessage,
                defaultMessage: "Cannot be blank",
              })
            : ""
        }
        style={{ marginBottom: 10, maxWidth: 400 }}
        onChange={handleChange}
        value={question?.actualValue}
      ></TextField>);
    default:
      return (<Typography>
        <FormattedMessage id="SOMETHING_WENT_WRONG_CONTACT_DEVELOPER" defaultMessage="Something went wrong. Alert a developer by leaving feedback"/>
      </Typography>);
  }
};

export default SingleFormField;
