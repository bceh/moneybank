import ReactEcharts from "echarts-for-react";
import { getCateIdNameMap, getAllTransById } from "../store/dataSlice";
import { useSelector } from "react-redux";
import _ from "lodash";
import dayjs from "dayjs";

const CategoryGraph = (props) => {
  const { month: date, transType } = props;
  const userId = useSelector((state) => state.status.currentUserId);
  const cateMap = useSelector(getCateIdNameMap(userId));
  const transactions = useSelector(getAllTransById(userId));

  const newTransInMonth = transactions.filter(
    (trans) => dayjs(trans.date).month() === date
  );

  const cateData = _.reduce(
    newTransInMonth,
    (obj, trans) => {
      if (Number(trans.transType) === transType) {
        const cateName = cateMap.get(trans.cateId);
        obj[cateName] = (obj[cateName] || 0) + trans.amount;
      }
      return obj;
    },
    {}
  );
  const oriData = Object.keys(cateData).map((key) => {
    return {
      value: cateData[key],
      name: key,
    };
  });

  const sortedData = _.orderBy(oriData, ["value"], ["desc"]);

  const stringData = sortedData.map((point) => {
    return {
      name: point.name,
      value: Number(point.value).toFixed(2),
    };
  });
  const data = stringData;

  const option = {
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: `${transType === -1 ? "Expense" : "Income"} in Category`,
        type: "pie",
        radius: "50%",

        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0,0,0,0.5)",
          },
        },
      },
    ],
  };

  return <ReactEcharts option={option} />;
};

export default CategoryGraph;
