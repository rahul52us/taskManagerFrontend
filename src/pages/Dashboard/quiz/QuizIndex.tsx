import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import store from "../../../store/store";
import QuizTable from "./component/QuizTable/QuizTable";
import ChartIndex from "./component/ChartIndex/ChartIndex";
import CustomDrawer from "../../../config/component/Drawer/CustomDrawer";
import { Box } from "@chakra-ui/react";
import QuizCategories from "./component/Forms/QuizCategories";
import QuestionForm from "./component/Forms/QuestionForm";
import { currentYear, oneYearLater } from "../../../config/constant/dateUtils";
import DashPageHeader from "../../../config/component/common/DashPageHeader/DashPageHeader";
import { headerHeight } from "../../../config/constant/variable";
import { quizBreadCrumb } from "../utils/breadcrumb.constant";

const QuizIndex = observer(() => {
  const [quizForm, setQuizForm] = useState({
    open: false,
    data: null,
    type: "create",
  });
  const [questionForm, setQuestionForm] = useState({
    open: false,
    data: null,
    type: "create",
  });

  const {
    quiz: {
      dashQuiz: { hasFetch },
      getDashQuiz,
    },
    auth: { openNotification },
    classStore: { getClasses },
  } = store;

  useEffect(() => {
    if (!hasFetch) {
      getDashQuiz()
        .then(() => {})
        .catch((err) => {
          openNotification({ message: err.message, title: "Get Quiz Failed" });
        });
    }
  }, [hasFetch, getDashQuiz, openNotification]);

  useEffect(() => {
    getClasses({ startYear: currentYear, endYear: oneYearLater })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        openNotification({
          title: "Failed to Get Classes",
          message: err.message,
          type: "error",
        });
      });
  }, [getClasses, openNotification]);

  return (
    <Box minHeight={`calc(100vh - ${headerHeight})`} m={-2} p={3}>
      <DashPageHeader title="Videos" breadcrumb={quizBreadCrumb} />
      <ChartIndex setQuizForm={setQuizForm} setQuestionForm={setQuestionForm} />
      <Box mt={5}>
        <QuizTable />
      </Box>
      <CustomDrawer
        title="CREATE QUIZ"
        open={quizForm.open}
        close={() => {
          setQuizForm({ type: "create", data: null, open: false });
        }}
      >
        <QuizCategories />
      </CustomDrawer>
      <CustomDrawer
        title="CREATE QUIZ"
        open={questionForm.open}
        close={() => {
          setQuestionForm({ type: "create", data: null, open: false });
        }}
      >
        <QuestionForm />
      </CustomDrawer>
    </Box>
  );
});

export default QuizIndex;
