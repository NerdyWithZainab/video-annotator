import { TextField, Typography } from "@mui/material";
import { FormattedMessage, IntlShape, useIntl } from "react-intl";
import { get } from "lodash-es";
import { Collection, FormFieldGroup, SingleFormField } from "../../types";
import { useState } from "react";

const SingleFormField: React.FC<{ question: SingleFormField, collection: Collection }> = ({ question, collection }) => {

  const intl: IntlShape = useIntl();
  const currentIsInvalid: boolean = get(collection, ["formFieldGroup", "isInvalids", question?.label], false);

  const handleChange: (event: React.ChangeEvent<HTMLInputElement>)=>void = (event: React.ChangeEvent<HTMLInputElement>) => {

    const currentVal: any = event?.currentTarget?.value;

    const newActualValue: {} = {[question.label]: currentVal};
    console.log('deleteMe newActualValue is: ');
    console.log(newActualValue);
    collection?.formFieldGroup?.setValues ? collection.formFieldGroup.setValues((prevState: {})=>{
      console.log('deleteMe prevState is: ');
      console.log(prevState);
      return {...prevState, ...newActualValue};
    }) : undefined; // I was getting silly linter errors if I didn't do something like this.

    const currentFormIsInvalid = question.validatorMethod ? !question.validatorMethod(currentVal) : false;
    (collection?.formFieldGroup?.setIsInvalids && collection?.formFieldGroup?.isInvalids && question?.label) ? collection.formFieldGroup.setIsInvalids({...collection.formFieldGroup.isInvalids, [question.label]: currentFormIsInvalid} ) : undefined;
    if(collection?.formFieldGroup?.isInvalids && question?.label){
      console.log('deleteMe collection.formFieldGroup.IsInvalids is: ');
      console.log(collection.formFieldGroup.isInvalids);
    }


  }

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
      case 'Text':
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
          value={get(collection, ["formFieldGroup", "actualValues", question?.label], "")}
        ></TextField>);
    default:
      return (<Typography>
        <FormattedMessage id="SOMETHING_WENT_WRONG_CONTACT_DEVELOPER" defaultMessage="Something went wrong. Alert a developer by leaving feedback"/>
      </Typography>);
  }
};

export default SingleFormField;
