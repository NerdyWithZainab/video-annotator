import { Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { FormattedMessage, IntlShape, useIntl } from "react-intl";
import { get } from "lodash-es";
import { Collection, SingleFormField } from "../../types";
import { useState } from "react";
import InfoIcon from "../InfoIcon";

const SingleFormField: React.FC<{ question: SingleFormField, collection: Collection }> = ({ question, collection }) => {

  const intl: IntlShape = useIntl();
  const currentIsInvalid: boolean = get(collection, ["formFieldGroup", "isInvalids", question?.label], false);

  const handleTextChange: (event: React.ChangeEvent<HTMLInputElement>)=>void = (event: React.ChangeEvent<HTMLInputElement>) => {

    const currentVal: any = event?.currentTarget?.value;
    updateStates(currentVal);

  }

  const handleCheckChange: (event: any)=>void = (event: any) => {

    const currentVal: any = event?.target?.checked;
    updateStates(currentVal);
  }

const updateStates: (currentVal: any) => void = (currentVal: any) =>{
  const newActualValue: {} = {[question.label]: currentVal};
  collection?.formFieldGroup?.setValues ? collection.formFieldGroup.setValues((prevState: {})=>{
    console.log('deleteMe prevState is: ');
    console.log(prevState);
    return {...prevState, ...newActualValue};
  }) : undefined; // I was getting silly linter errors if I didn't do something like this.

  const currentFormIsInvalid = question.validatorMethod ? !question.validatorMethod(currentVal) : false;
  (collection?.formFieldGroup?.setIsInvalids && collection?.formFieldGroup?.isInvalids && question?.label) ? collection.formFieldGroup.setIsInvalids({...collection.formFieldGroup.isInvalids, [question.label]: currentFormIsInvalid} ) : undefined;
};

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
        onChange={handleTextChange}
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
          onChange={handleTextChange}
          value={get(collection, ["formFieldGroup", "actualValues", question?.label], "")}
        ></TextField>);
        case 'Checkbox':
          return (<div style={{ display: "flex", alignItems: "center" }}>
            <FormControlLabel
              style={{ marginRight: 10 }}
              control={<Checkbox />}
              value={get(collection, ["formFieldGroup", "actualValues", question?.label], true)}
              onChange={handleCheckChange}
              label={question?.label}
            />

          </div>);
    default:
      return (<Typography>
        <FormattedMessage id="SOMETHING_WENT_WRONG_CONTACT_DEVELOPER" defaultMessage="Something went wrong. Alert a developer by leaving feedback"/>
      </Typography>);
  }
};

export default SingleFormField;
