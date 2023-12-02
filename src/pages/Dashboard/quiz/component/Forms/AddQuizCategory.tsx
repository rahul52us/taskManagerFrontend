import QuizCategoryForm from "./QuizCategoryForm";
import { observer } from "mobx-react-lite";
import store from "../../../../../store/store";
import { QuizCategoryValue } from "./utils/dto";
import { readFileAsBase64 } from "../../../../../config/constant/function";

const AddQuizCategory = observer(() => {
  const {
    quiz: { CreateQuiz },
    auth: { openNotification },
  } = store;

  const initialValues = {
    title: "",
    description: "",
    class: undefined,
    section: undefined,
    thumbnail: "",
    categories: [{ title: "", description: "", thumbnail: "" }],
  };

  const addCategoryStore = async (
    values: QuizCategoryValue,
    setSubmitting: (val: boolean) => void,
    resetForm: () => void,
    setShowError: any
  ) => {
    if (values.thumbnail.length) {
      const buffer = await readFileAsBase64(values.thumbnail[0]);
      const fileData = {
        buffer: buffer,
        filename: values.thumbnail[0].name,
        type: values.thumbnail[0].type,
      };
      values.thumbnail = fileData;
    }
    if (values.categories === 0) {
      delete values.categories;
    }
    CreateQuiz({
      ...values,
      class: values.class?._id,
      section: values.section?._id,
    })
      .then((data: any) => {
        openNotification({
          title: "Create Successfully",
          message: data.message,
        });
        resetForm();
        setShowError(false);
      })
      .catch((err: any) => {
        if (err.statusCode === 422) {
          openNotification({
            title: "Create Failed",
            message: err.data?.message,
            type: "error",
          });
        } else {
          openNotification({
            title: "Create Failed",
            message: err?.message,
            type: "error",
          });
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <QuizCategoryForm
      submitForm={addCategoryStore}
      initialValues={initialValues}
    />
  );
});

export default AddQuizCategory;
