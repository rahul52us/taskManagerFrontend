import { useState } from "react";
import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import store from "../../../../store/store";
import { observer } from "mobx-react-lite";
import CustomInput from "../../../../config/component/CustomInput/CustomInput";
import FormModel from "../../../../config/component/common/FormModel/FormModel";
import { FaPlus, FaTimes } from "react-icons/fa";
import { videosCategoryValidation } from "../utils/videos.validation";

interface IProductForm {
  open: boolean;
  type: string;
  title: string;
  close: any;
}


function readFileAsBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String : any = reader.result as string;
      resolve(base64String);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}



const ProductForm = observer(({ open, close, type, title }: IProductForm) => {
  const [showError, setShowError] = useState(false);
  const [thumbnail, setThumbnail] = useState<any>(null)
  const {
    auth: { openNotification },
    VideoStore: { createVideoCategory },
  } = store;
  return (
    <FormModel
      open={open}
      close={() => {
        close();
        setThumbnail(null)
      }}
      title={`${title}`}
    >
      <Box p={4}>
        <Formik<any>
          initialValues={{
            title: "",
            details: "",
            description: "",
            discountPrice: "",
            originalPrice: "",
            pricingType: "",
            amountType: "",
          }}
          onSubmit={ async (values, { setSubmitting, resetForm }) => {
            if (type === "add")
            {

              const buffer = await readFileAsBuffer(thumbnail);
              const fileData = {
                buffer: buffer,
                filename: thumbnail.name,
                type: thumbnail.type,
              };


              createVideoCategory({...values, thumbnail : fileData})
                .then((data: any) => {
                  openNotification({
                    title: "Create Successfully",
                    message: data?.message,
                    type: "success",
                  });
                  resetForm();
                  close();
                })
                .catch((err: any) => {
                  openNotification({
                    title: "Create Failed",
                    message: err?.message,
                    type: "error",
                  });
                })
                .finally(() => {
                  setSubmitting(false);
                  setShowError(false);
                })
            }
          }}
          validationSchema={videosCategoryValidation}
        >
          {({ handleChange, values, errors, isSubmitting }) => (
            <Form>
              <Stack spacing={4}>
                <Flex
                  justifyContent="space-between"
                  columnGap={4}
                  flexDirection={{ base: "column", md: "row" }}
                >
                  <CustomInput label="Upload thumbnail" type="file" name="thumbnail" onChange={(e : any) => {setThumbnail(e.target.files[0]); console.log(e.target.files[0])}}/>
                  <CustomInput
                    name="title"
                    placeholder="Enter the Title"
                    label="Title"
                    required={true}
                    onChange={handleChange}
                    value={values.title}
                    error={errors.title}
                    showError={showError}
                  />
                  <CustomInput
                    name="details"
                    placeholder="Enter Details"
                    label="Details"
                    onChange={handleChange}
                    value={values.details}
                    error={errors.details}
                    showError={showError}
                  />
                </Flex>
                <Flex
                  justifyContent="space-between"
                  columnGap={4}
                  flexDirection={{ base: "column", md: "row" }}
                >
                  <CustomInput
                    name="discountPrice"
                    placeholder="Discount Price"
                    label="Discount Price"
                    onChange={handleChange}
                    value={values.discountPrice}
                    error={errors.discountPrice}
                    showError={showError}
                  />
                  <CustomInput
                    name="originalPrice"
                    placeholder="Original Price"
                    label="Original Price"
                    onChange={handleChange}
                    value={values.originalPrice}
                    error={errors.originalPrice}
                    showError={showError}
                  />
                </Flex>
                <Flex
                  justifyContent="space-between"
                  columnGap={4}
                  flexDirection={{ base: "column", md: "row" }}
                >
                  <CustomInput
                    name="pricingType"
                    placeholder="Pricing Type"
                    label="Pricing Type"
                    onChange={handleChange}
                    value={values.pricingType}
                    error={errors.pricingType}
                    showError={showError}
                  />
                  <CustomInput
                    name="amountType"
                    placeholder="Amount Type"
                    label="Amount Type"
                    onChange={handleChange}
                    value={values.amountType}
                    error={errors.amountType}
                    showError={showError}
                  />
                </Flex>
                <CustomInput
                  name="description"
                  placeholder="Description"
                  label="Description"
                  type="textarea"
                  error={errors.description}
                  onChange={handleChange}
                  value={values.description}
                  rows={4}
                  showError={showError}
                  required
                />

                <Flex justify="end" align="center" columnGap={4}>
                  <Button
                    leftIcon={<FaTimes />}
                    onClick={close}
                    colorScheme="red"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    leftIcon={<FaPlus />}
                    colorScheme="blue"
                    isLoading={isSubmitting}
                    onClick={() => {
                      setShowError(true);
                    }}
                  >
                    Create
                  </Button>
                </Flex>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </FormModel>
  );
});

export default ProductForm;