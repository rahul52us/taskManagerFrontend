import { Spinner, Text, Box } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { observer } from "mobx-react-lite";
import { Bar } from "react-chartjs-2";
import './chart.css'

const BarChart = observer(
  ({ options = {}, data = [], loading = true }: any) => {
    ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend
    );

    if (loading) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          background="#F0F0F0"
          borderRadius="4px"
          boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            padding="20px"
          >
            <Spinner color="blue.500" thickness="4px" size="lg" />
            <Text
              color="#333"
              fontSize="sm"
              marginTop={2}
              fontWeight="bold"
              style={{
                animation: "text-fade 1s ease-in-out infinite", // Text animation
              }}
            >
              Loading Chart...
            </Text>
          </Box>
        </Box>
      );
    }

    const chartOptions =
      options && Object.keys(options).length ? options : { responsive: true };
    const chartData = data && data.datasets ? data : { datasets: [] };

    return <Bar options={chartOptions} data={chartData} />;
  }
);

export default BarChart;
