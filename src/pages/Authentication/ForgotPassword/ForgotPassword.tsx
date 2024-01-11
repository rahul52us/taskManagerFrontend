import {
  Box,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import CustomInput from "../../../config/component/CustomInput/CustomInput";
import { Form, Formik } from "formik";
import { ForgotEmailValidation } from "../utils/validation";
import { authentication } from "../../../config/constant/routes";
import { useNavigate } from "react-router-dom";
import store from "../../../store/store";
import { observer } from "mobx-react-lite";
import { useState } from "react";

const ForgotPassword = observer(() => {
  const [showError, setShowError] = useState(false)
  const {auth : { openNotification, forgotPasswordStore}} = store
  const navigate = useNavigate()

  return (
    <Box
      bg={useColorModeValue("", "gray.800")}
    >
           <Stack align={"center"} mb={10}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of
             our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
     
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Formik
            initialValues={{ username: "" }}
            validationSchema={ForgotEmailValidation}
            onSubmit={(values, { setSubmitting }) => {
              forgotPasswordStore(values).then((data) => {
                console.log(data)
                openNotification({
                  title: "Mail has been sent Successfully",
                  message: data,
                  type: "success",
                });
                navigate('/')
              }).catch((err : any) => {
                openNotification({
                  title: "Requested Failed",
                  message: err.message,
                  type: 'error',
                });
              }).finally(() => {
                setSubmitting(false)
              })
            }}
          >
            {({ values, handleSubmit, handleChange, isSubmitting, errors }) => (
              <Form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                  <CustomInput
                    type="text"
                    name="username"
                    label="Email"
                    placeholder="Enter the email"
                    required={true}
                    value={values.username}
                    onChange={handleChange}
                    error={errors.username}
                    showError={showError}
                  />
                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      align={"start"}
                      justify={"space-between"}
                    >
                      <Checkbox>Remember me</Checkbox>
                      <Link color={"blue.400"} onClick={() => navigate(authentication.login)}>Sign in?</Link>
                    </Stack>
                    <Button
                      type="submit"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                      isLoading={isSubmitting}
                      onClick={() => {
                        setShowError(true)
                      }}
                    >
                      Submit
                    </Button>
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
    </Box>
  );
});

export default ForgotPassword;
