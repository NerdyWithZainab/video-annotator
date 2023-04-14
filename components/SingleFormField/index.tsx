import { TextField, Typography } from "@mui/material";
import { FormattedMessage, IntlShape, useIntl } from "react-intl";
import { get } from "lodash-es";
import { Collection, FormFieldGroup, Question } from "../../types";
import { useState } from "react";

const SingleFormField: React.FC<{ question: Question, collection: Collection }> = ({ question, collection }) => {
  // question.type = "Boop";
  const [formValues, setFormValues] = useState<{}>({});
  const [areFormValuesInvalid, setAreFormValuesInvalid] = useState<{}>({});



  const shamFormFieldGroup: FormFieldGroup = {
    setValues: setFormValues,
    actualValues: formValues,
    isInvalids: areFormValuesInvalid,
    setIsInvalids: setAreFormValuesInvalid
  };
  collection.formFieldGroup = shamFormFieldGroup;

  const intl: IntlShape = useIntl();
  const currentIsInvalid: boolean = get(collection, ["formFieldGroup", "isInvalids", question?.label], false);
  const handleChange: (event: React.ChangeEvent<HTMLInputElement>)=>void = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentVal: any = event?.currentTarget?.value;
    // const theRightAttributesExist: boolean = Boolean(collection && collection.formFieldGroup && collection.formFieldGroup.setValues);
    console.log('deleteMe currentVal is: ');
    console.log(currentVal);
    // const newActualValues = {...collection?.formFieldGroup?.actualValues, [question.label]: currentVal};
    const newActualValue: {} = {[question.label]: currentVal};
    collection?.formFieldGroup?.setValues ? collection.formFieldGroup.setValues((prevState: {})=>{
      return {...prevState, ...newActualValue};
    }) : undefined;
      // if(theRightAttributesExist){
      //   const deleteMeCombinedVals = {...collection?.formFieldGroup?.actualValues, [question.label]: currentVal};
      //   console.log('deleteMe deleteMeCombinedVals are: ');
      //   console.log(deleteMeCombinedVals);
      //   // collection.formFieldGroup.setValues({...collection.formFieldGroup.actualValues, [question.label]: currentVal});
      //   collection?.formFieldGroup?.setValues((prevState: {})=>{
      //     return {...prevState, ...deleteMeCombinedVals};
      //   });
      // }

    const currentFormIsInvalid = question.validatorMethod ? !question.validatorMethod(currentVal) : false;


    (collection?.formFieldGroup?.setIsInvalids && collection?.formFieldGroup?.isInvalids && question?.label) ? collection.formFieldGroup.setIsInvalids({...collection.formFieldGroup.isInvalids, [question.label]: currentFormIsInvalid} ) : undefined;


  }
  // console.log("deleteMe question is: ");
  // console.log(question);
  // const isError: boolean = Boolean(get(collection, ["formFieldGroup","isValids", question?.label], false));
  // console.log('deleteMe isError is: ');
  // console.log(isError);
  switch(question?.type){
    case 'URL':
      return (<TextField
        required={question?.isRequired}
        fullWidth
        data-testid={question?.testId}
        error={currentIsInvalid}
        variant="filled"
        label={
          question?.label
        }
        helperText={
          currentIsInvalid
            ? intl.formatMessage({
                id: question?.invalidInputMessage,
                defaultMessage: "Cannot be blank",
              })
            : ""
        }
        style={{ marginBottom: 10, maxWidth: 400 }}
        onChange={handleChange}
        value={get(collection, ["formFieldGroup", "actualValues",question?.label], "")}
      ></TextField>);
    default:
      return (<Typography>
        <FormattedMessage id="SOMETHING_WENT_WRONG_CONTACT_DEVELOPER" defaultMessage="Something went wrong. Alert a developer by leaving feedback"/>
      </Typography>);
  }
};

export default SingleFormField;
