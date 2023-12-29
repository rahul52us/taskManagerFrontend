import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  SimpleGrid,
} from "@chakra-ui/react";
import { FieldArray, Form, Formik } from "formik";
import { FaPlus, FaTimes } from "react-icons/fa";
import CustomInput from "../../../../../../config/component/CustomInput/CustomInput";
import CountrySelect from "../../../../../../config/component/LocationSelector/CountrySelect";
import StateSelect from "../../../../../../config/component/LocationSelector/StateSelect";
import CitySelect from "../../../../../../config/component/LocationSelector/CitySelect";
import {
  insertUniqueFile,
  removeDataByIndex,
} from "../../../../../../config/constant/function";
import ShowFileUploadFile from "../../../../../../config/component/common/ShowFileUploadFile/ShowFileUploadFile";
import { travelModes, tripTypes } from "../../utils/constant";

const AddTravelDetailButton: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => (
  <Button
    type="button"
    onClick={onClick}
    leftIcon={<FaPlus />}
    colorScheme="blue"
    variant="solid"
    size="sm"
  >
    Add Travel Detail
  </Button>
);

const TripForm = ({
  loading,
  onClose,
  onSubmit,
  initialValues,
  thumbnail,
  setThumbnail,
}: any) => {
  return (
    <Box>
      <Formik<any>
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values, resetForm);
        }}
      >
        {({ handleChange, setFieldValue, values }) => {
          console.log(values);
          return (
            <Form>
              <SimpleGrid columns={2} spacing={4}>
                <GridItem colSpan={2}>
                  <Flex>
                    {thumbnail.length === 0 ? (
                      <CustomInput
                        type="file-drag"
                        name="thumbnail"
                        value={thumbnail}
                        isMulti={false}
                        onChange={(e: any) => {
                          insertUniqueFile(
                            setThumbnail,
                            thumbnail,
                            e.target.files
                          );
                        }}
                      />
                    ) : (
                      <Box mt={-5} width="100%">
                        <ShowFileUploadFile
                          files={thumbnail}
                          removeFile={(_: any, index: number) =>
                            setThumbnail(removeDataByIndex(thumbnail, index))
                          }
                        />
                      </Box>
                    )}
                  </Flex>
                </GridItem>
              </SimpleGrid>
              <Grid
                columnGap={4}
                templateColumns={{ base: "1fr", lg: "1fr 1fr 1fr" }}
              >
                <GridItem>
                  <CustomInput
                    name="title"
                    placeholder="Enter the Title"
                    label="Title"
                    required={true}
                    onChange={handleChange}
                    value={values.title}
                  />
                </GridItem>
                <GridItem>
                  <CustomInput
                    label="Trip Type"
                    required={true}
                    type="select"
                    name="type"
                    value={values.type}
                    options={tripTypes}
                    onChange={(e: any) => setFieldValue("type", e)}
                  />
                </GridItem>
                <GridItem>
                  <CountrySelect
                    label="Countries"
                    name={`country`}
                    value={values.country}
                    onChange={(e) => {
                      setFieldValue(`country`, e);
                    }}
                  />
                </GridItem>
                {values.type && values.type?.value === "group" && (
                  <GridItem>
                    <CountrySelect
                      label="Participants"
                      placeholder="Select Participants"
                      name={`country`}
                      value={values.country}
                      onChange={(e) => {
                        setFieldValue(`country`, e);
                      }}
                      props={{isMulti : true}}
                    />
                  </GridItem>
                )}
              </Grid>
              <GridItem colSpan={2}>
                <CustomInput
                  type="textarea"
                  name="description"
                  placeholder="Enter the Description"
                  label="Description"
                  required={true}
                  onChange={handleChange}
                  value={values.description}
                />
              </GridItem>
              <Box mt={4}>
                <Flex alignItems="center">
                  <Box flexGrow={1}>
                    <strong>Travel Details</strong>
                  </Box>
                  <AddTravelDetailButton
                    onClick={() => {
                      setFieldValue("travelDetails", [
                        ...values.travelDetails,
                        {
                          state: "",
                          city: "",
                          locality: "",
                          startDate: new Date(),
                          endDate: new Date(),
                          isCab: false,
                          travelMode: "",
                        },
                      ]);
                    }}
                  />
                </Flex>
                <FieldArray name="travelDetails">
                  {({ remove }) => (
                    <SimpleGrid columns={1} spacing={4}>
                      {values.travelDetails.map((travel: any, index: any) => (
                        <Box
                          key={index}
                          p={4}
                          borderRadius="md"
                          boxShadow="md"
                          bg="gray.100"
                        >
                          <Grid templateColumns="repeat(3, 1fr)" gap={4} mt={2}>
                            <StateSelect
                              name={`travelDetails[${index}].state`}
                              country={values.country}
                              label="State"
                              onChange={(e: any) => {
                                setFieldValue(
                                  `travelDetails[${index}].state`,
                                  e
                                );
                                setFieldValue(
                                  `travelDetails[${index}].city`,
                                  ""
                                );
                              }}
                              value={travel.state}
                            />
                            <CitySelect
                              country={values.country}
                              state={travel.state}
                              name={`travelDetails[${index}].city`}
                              label="City"
                              onChange={(e: any) =>
                                setFieldValue(`travelDetails[${index}].city`, e)
                              }
                              value={travel.city}
                            />
                          </Grid>
                          <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={2}>
                            <CustomInput
                              type="date"
                              name={`travelDetails[${index}].startDate`}
                              placeholder="Start Date"
                              label="Start Date"
                              required={true}
                              onChange={(e: any) => {
                                setFieldValue(
                                  `travelDetails[${index}].startDate`,
                                  e
                                );
                              }}
                              value={travel.startDate}
                            />
                            <CustomInput
                              type="date"
                              name={`travelDetails[${index}].endDate`}
                              placeholder="End Date"
                              label="End Date"
                              required={true}
                              onChange={(e: any) => {
                                setFieldValue(
                                  `travelDetails[${index}].endDate`,
                                  e
                                );
                              }}
                              minDate={travel.startDate}
                              value={travel.endDate}
                            />
                          </Grid>
                          <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={2}>
                            <CustomInput
                              name={`travelDetails[${index}].travelMode`}
                              value={travel.travelMode}
                              type="select"
                              options={travelModes}
                              onChange={(e) => {
                                setFieldValue(
                                  `travelDetails[${index}].travelMode`,
                                  e
                                );
                              }}
                              label="Travel Mode"
                            />
                            <CustomInput
                              label="Amount"
                              type="text"
                              name={`travelDetails[${index}].amount`}
                              onChange={handleChange}
                              value={travel.amount}
                            />
                          </Grid>
                          <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={2}>
                            <CustomInput
                              name={`travelDetails[${index}].isCab`}
                              type="radio"
                              label="Do you need a Cab?"
                              options={[
                                { value: "true", label: "Yes" },
                                { value: "false", label: "No" },
                              ]}
                              value={travel.isCab}
                              onChange={(e) =>
                                setFieldValue(
                                  `travelDetails[${index}].isCab`,
                                  e
                                )
                              }
                            />
                            {travel.isCab === "true" && (
                              <CustomInput
                                label="Amount"
                                type="text"
                                name={`travelDetails[${index}].amount`}
                                onChange={handleChange}
                                value={travel.amount}
                              />
                            )}
                          </Grid>
                          <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={2}>
                            <CustomInput
                              name={`travelDetails[${index}].isAccommodation`}
                              type="radio"
                              label="Do you need Accommodation?"
                              options={[
                                { value: "true", label: "Yes" },
                                { value: "false", label: "No" },
                              ]}
                              value={travel.isAccommodation}
                              onChange={(e) =>
                                setFieldValue(
                                  `travelDetails[${index}].isAccommodation`,
                                  e
                                )
                              }
                            />
                            {travel.isAccommodation === "true" && (
                              <Box>
                                <CustomInput
                                  type="textarea"
                                  name={`travelDetails[${index}].locality`}
                                  placeholder="Locality"
                                  label="Locality"
                                  required={true}
                                  onChange={handleChange}
                                  value={travel.locality}
                                />
                                <CustomInput
                                  type="number"
                                  name={`travelDetails[${index}].durationOfStay`}
                                  placeholder="No. of Days for Stays"
                                  label="No. Of Days For Stays"
                                  required={true}
                                  onChange={handleChange}
                                  value={travel.durationOfStay}
                                />
                                <CustomInput
                                  type="number"
                                  name={`travelDetails[${index}].accommodationCost`}
                                  placeholder="Accommodation Total Cost"
                                  label="Accommodation Total Cost"
                                  required={true}
                                  onChange={handleChange}
                                  value={travel.accommodationCost}
                                />
                              </Box>
                            )}
                          </Grid>

                          <Button
                            type="button"
                            mt={4}
                            onClick={() => remove(index)}
                            leftIcon={<FaTimes />}
                            colorScheme="red"
                            variant="outline"
                            size="sm"
                          >
                            Remove
                          </Button>
                        </Box>
                      ))}
                    </SimpleGrid>
                  )}
                </FieldArray>
              </Box>
              <Flex justifyContent="end" mt={5} mr={3}>
                <Button
                  type="button"
                  leftIcon={<FaTimes />}
                  onClick={onClose}
                  mr={4}
                  variant="outline"
                  size="sm"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  leftIcon={<FaPlus />}
                  colorScheme="blue"
                  isLoading={loading}
                  size="sm"
                >
                  Create
                </Button>
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default TripForm;
