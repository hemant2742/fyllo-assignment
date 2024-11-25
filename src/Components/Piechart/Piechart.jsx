import { PieChart, Pie, Cell, Tooltip } from "recharts"
import { getPieData } from "../../utils.js"
import {PRODUCT_COLOR_MAPPING} from "../../constants.js"

import "./Piechart.css"

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}
function Piechart({ data, title, dataKey }) {
  let chartData = getPieData(data, dataKey)
  return (
    <div className="piechart">
      <h3 className="piechartTitle">{title}</h3>
      <PieChart width={500} height={500} aspect={2 / 1}>
        <Pie
          data={chartData}
          cx={250}
          cy={220}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={170}
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={PRODUCT_COLOR_MAPPING[entry.name] || "#cccccc"}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <div className="piechart-legend">
        {chartData.map((entry, index) => (
          <div key={index} className="legend">
            <div
              className="legend-color"
              style={{
                backgroundColor:
                  PRODUCT_COLOR_MAPPING[entry.name] || "#cccccc",
              }}
            ></div>
            <div className="legend-name">{entry.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Piechart
