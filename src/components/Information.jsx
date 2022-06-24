import PaperContainer from "./PaperContainer";

import React, { useState } from "react";
import { getBasicInfoById, userChangedById } from "../store/usersSlice";

import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Information = () => {
  const dispatch = useDispatch();
  const Joi = require("joi-browser");
  const userId = useSelector((state) => state.status.currentUserId);
  const basicInfo = useSelector(getBasicInfoById(userId));
  let originData = {
    firstName: basicInfo.firstName,
    lastName: basicInfo.lastName,
    email: basicInfo.email,
  };
  const [data, setData] = useState(originData);
  const [errors, setErrors] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const schema = {
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required()
      .label("Email"),
    password: Joi.string().required().min(8).label("Password"),
  };
  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const newSchema = Joi.object({ [name]: schema[name] });
    const { error } = newSchema.validate(obj);
    return error ? error.details[0].message : null;
  };
  const handleChange = ({ currentTarget: input }) => {
    const newErrors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) newErrors[input.name] = errorMessage;
    else delete newErrors[input.name];
    const newData = { ...data };
    newData[input.name] = input.value;
    setData(newData);
    setErrors(newErrors || {});
    if (_.isEqual(newData, originData)) setIsChanged(false);
    else setIsChanged(true);
  };

  const handleDiscard = () => {
    setData(originData);
    setErrors({});
    setIsChanged(false);
  };

  const handleSave = () => {
    const newData = { ...data };
    dispatch(userChangedById({ userId, newData }));
    originData = newData;
    setIsChanged(false);
  };
  return (
    <PaperContainer subTitle="Personal Information">
      <Typography
        variant="h3"
        sx={{ mb: 4, alignSelf: "flex-start" }}
      >{`${basicInfo.firstName} ${basicInfo.lastName}`}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            value={data["firstName"]}
            onChange={handleChange}
            error={Boolean(errors["firstName"])}
            helperText={errors["firstName"]}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            value={data["lastName"]}
            onChange={handleChange}
            error={Boolean(errors["lastName"])}
            helperText={errors["lastName"]}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={data["email"]}
            onChange={handleChange}
            error={Boolean(errors["email"])}
            helperText={errors["email"]}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!isChanged}
            onClick={handleDiscard}
          >
            Discard Changes
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            fullWidth
            disabled={!isChanged}
            onClick={handleSave}
            variant="contained"
          >
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </PaperContainer>
  );
};

export default Information;
