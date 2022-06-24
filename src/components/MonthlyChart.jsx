import ReactEcharts from "echarts-for-react";
import dayjs from "dayjs";
import _ from "lodash";
import { useSelector } from "react-redux";
import { getAllTrans } from "../store/dataSlice";

const MonthlyChart = (props) => {
  const { month: date, ...rest } = props;
  const transactions = useSelector(getAllTrans);

  const newTransInthisMonth = transactions.filter(
    (trans) => dayjs(trans.date).month() === date
  );

  const expense = _.reduce(
    newTransInthisMonth,
    (obj, trans) => {
      if (Number(trans.transType) === -1) {
        const date = dayjs(trans.date).date();
        obj[date] = (obj[date] || 0) + Number(trans.amount);
      }
      return obj;
    },
    {}
  );

  const income = _.reduce(
    newTransInthisMonth,
    (obj, trans) => {
      if (Number(trans.transType) === 1) {
        const date = dayjs(trans.date).date();
        obj[date] = (obj[date] || 0) + Number(trans.amount);
      }
      return obj;
    },
    {}
  );

  const maxDay = dayjs(new Date(2022, date + 1, 0)).date();

  const expenseFilled = [...Array(maxDay).keys()].map((i) =>
    Number(expense[`${i + 1}`] || 0).toFixed(2)
  );
  const incomeFilled = [...Array(maxDay).keys()].map((i) =>
    Number(income[`${i + 1}`] || 0).toFixed(2)
  );
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    xAxis: {
      name: "day",
      type: "category",
      data: [...Array(maxDay).keys()].map((i) => `${i + 1}`),
    },
    yAxis: {
      name: "Amount",
      type: "value",
    },
    series: [
      {
        name: "expense",
        type: "bar",
        stack: "total",
        emphasis: {
          focus: "series",
        },
        data: expenseFilled,
      },
      {
        name: "income",
        type: "bar",
        stack: "total",
        emphasis: {
          focus: "series",
        },
        data: incomeFilled,
      },
    ],
  };

  return <ReactEcharts {...rest} option={option} />;
};

export default MonthlyChart;
