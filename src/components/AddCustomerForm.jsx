import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Collapse,
  Paper,
  IconButton,
  Input,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// const steps = ["Customer Details", "Customer Administrator"];

const AddCustomerForm = ({onBack}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  // const [isEditingStep1, setIsEditingStep1] = useState(false);
  const [userFormValues, setUserFormValues] = useState({
    role: "Admin", // default value
  });

  const [formValues, setFormValues] = useState({
    source: "Internal",
    type: "Ethanol Company",
    customerName: "",
    plantName: "",
    plantId: "",
    locationName: "",
    locationId: "",
    adminFirstName: "",
    adminLastName: "",
    email: "",
    phone: "",
  });

  const handleReportChange = (e) => {
    setUserFormValues(e.target.value);
  };

  const handleChange = (field) => (e) => {
    setFormValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const isStep1Valid = () => {
    const { customerName, type, plantName, plantId, locationName, locationId } =
      formValues;
    if (!customerName) return false;
    if (type === "Ethanol Company") return !!plantName && !!plantId;
    if (type === "Retailer") return !!locationName && !!locationId;
    return false;
  };

  const isStep2Valid = () => {
    const { adminFirstName, adminLastName, email } = formValues;
    return !!adminFirstName && !!adminLastName && !!email;
  };

  useEffect(() => {
    if (isStep1Valid() && !completedSteps.includes(0)) {
      setCompletedSteps((prev) => [...prev, 0]);
    }
    if (isStep2Valid() && !completedSteps.includes(1)) {
      setCompletedSteps((prev) => [...prev, 1]);
    }
  }, [formValues]);

  const CustomStepIcon = (props) => {
    const { active, completed, icon } = props;
    const index = parseInt(icon, 10) - 1;

    if (completed && index === 0) {
      return (
        <IconButton
          size="small"
          onClick={() => {
            setActiveStep(0);
            // setIsEditingStep1(true); // mark we're editing
          }}
        >
          <EditIcon color="primary" />
        </IconButton>
      );
    }
    return (
      <Box
        sx={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          backgroundColor: active ? "primary.main" : "#ccc",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.8rem",
        }}
      >
        {icon}
      </Box>
    );
  };

  return (
    <Paper sx={{ p: 3, m: 2, borderRadius: 2 }}>
      <Box display="flex" alignItems="center" mb={2}>
         <IconButton onClick={onBack}>
          <ArrowBackIcon />
        </IconButton>
      <Typography variant="h6" ml={1} >
        New Customer Account
      </Typography>
</Box>
      <Stepper
        orientation="vertical"
        nonLinear
        activeStep={activeStep}
        connector={null}
      >
        {/* Step 1 */}
        <Step completed={completedSteps.includes(0)}>
          <StepLabel StepIconComponent={CustomStepIcon}>
            Customer Details
          </StepLabel>
          <StepContent>
            <Collapse in={activeStep === 0}>
              <Box mb={2}>
                <Typography variant="subtitle2">Source *</Typography>
                <RadioGroup
                  row
                  value={formValues.source}
                  onChange={handleChange("source")}
                >
                  <FormControlLabel
                    value="Internal"
                    control={<Radio />}
                    label="Internal"
                  />
                  <FormControlLabel
                    value="External"
                    control={<Radio />}
                    label="External"
                  />
                </RadioGroup>

                <Typography variant="subtitle2" mt={2}>
                  Customer Type *
                </Typography>
                <RadioGroup
                  row
                  value={formValues.type}
                  onChange={handleChange("type")}
                >
                  <FormControlLabel
                    value="Ethanol Company"
                    control={<Radio />}
                    label="Ethanol Company"
                  />
                  <FormControlLabel
                    value="Retailer"
                    control={<Radio />}
                    label="Retailer"
                  />
                </RadioGroup>

                <Grid container spacing={2} mt={1} width="50%">
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Customer Name *"
                      value={formValues.customerName}
                      onChange={handleChange("customerName")}
                    />
                  </Grid>

                  {formValues.type === "Ethanol Company" ? (
                    <>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Plant Name *"
                          value={formValues.plantName}
                          onChange={handleChange("plantName")}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Plant ID (ERP ID) *"
                          value={formValues.plantId}
                          onChange={handleChange("plantId")}
                        />
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Location Name *"
                          value={formValues.locationName}
                          onChange={handleChange("locationName")}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Location ID (ERP ID) *"
                          value={formValues.locationId}
                          onChange={handleChange("locationId")}
                        />
                      </Grid>
                    </>
                  )}
                </Grid>

                <Box mt={2}>
                  <Button variant="text" color="secondary">
                    {formValues.type === "Ethanol Company"
                      ? "+ Add Plant"
                      : "+ Add Location"}
                  </Button>
                </Box>
              </Box>

              <Box mt={3} display="flex" justifyContent="space-between">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    if (isStep1Valid()) {
                      setCompletedSteps([...new Set([...completedSteps, 0])]);
                      setActiveStep(1);
                    } else {
                      alert("Please complete Step 1.");
                    }
                  }}
                >
                  Next
                </Button>
              </Box>
            </Collapse>
          </StepContent>
        </Step>

        {/* Step 2 */}
        <Step completed={completedSteps.includes(1)}>
          <StepLabel>Customer Administrator</StepLabel>
          <StepContent>
            <Collapse in={activeStep === 1}>
              <Grid container spacing={2} width="50%">
                <Grid item xs={6} md={12}>
                  <TextField
                    fullWidth
                    label="First Name *"
                    value={formValues.adminFirstName}
                    onChange={handleChange("adminFirstName")}
                  />
                </Grid>
                <Grid item xs={6} md={12}>
                  <TextField
                    fullWidth
                    label="Last Name *"
                    value={formValues.adminLastName}
                    onChange={handleChange("adminLastName")}
                  />
                </Grid>
                <Grid item xs={6} md={12}>
                  <TextField
                    fullWidth
                    label="Email *"
                    value={formValues.email}
                    onChange={handleChange("email")}
                    helperText="Email will used for login"
                  />
                </Grid>
                <Grid item xs={6} md={12}>
                  <TextField
                    fullWidth
                    label="User ID (ERP ID) *"
                    value={formValues.userId}
                    onChange={handleChange("userId")}
                    helperText="Email will used for login"
                  />
                </Grid>
                <Grid item xs={6} md={12}>
                  <FormControl fullWidth>
                    <InputLabel id="role-label">User Role</InputLabel>
                    <Select
                      labelId="role-label"
                      value={userFormValues.role}
                      label="User Role"
                      onChange={handleReportChange}
                      disabled // this disables the dropdown
                    >
                      <MenuItem value="Admin">Administrator</MenuItem>
                      <MenuItem value="User">User</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Box mt={3}>
                <Button variant="outlined" onClick={() => setActiveStep(0)}>
                  Back
                </Button>
                <Button
                  sx={{ ml: 1 }}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    if (isStep2Valid()) {
                      setCompletedSteps([...new Set([...completedSteps, 1])]);
                      onBack();
                      alert("Form Submitted");
                    } else {
                      alert("Please complete Step 2.");
                    }
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Collapse>
          </StepContent>
        </Step>
      </Stepper>
    </Paper>
  );
};

export default AddCustomerForm;
