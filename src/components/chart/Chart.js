import React, { useContext } from 'react';
import { MyRecipesContext } from '../../context/MyRecipesContext';
import PieChart from 'react-minimal-pie-chart';








export default function Diagram() {

  const { closeModal, modalObj } = useContext(MyRecipesContext)

  // FAT PROCNT CHOCDF quantity

  const getNum = (num) => {
    const newNum = parseInt(num, 10)

    return newNum
  }





  return <div className="chart">
    {console.log(Math.round(modalObj.totalNutrients.FAT.quantity * 100))}

    <p>{modalObj.label}</p>
    <p>{modalObj.totalNutrients.FAT.label}</p>
    <button onClick={closeModal}>CLOSE</button>
    <PieChart
      animate={false}
      animationDuration={500}
      animationEasing="ease-out"
      cx={50}
      cy={50}
      data={[
        {
          color: '#E38627',
          title: modalObj.totalNutrients.FAT.label,
          value: getNum(modalObj.totalNutrients.FAT.quantity)
        },
        {
          color: '#C13C37',
          title: modalObj.totalNutrients.PROCNT.label,
          value: getNum(modalObj.totalNutrients.PROCNT.quantity),
        },
        {
          color: '#6A2135',
          title: modalObj.totalNutrients.CHOCDF.label,
          value: getNum(modalObj.totalNutrients.PROCNT.quantity)
        }
      ]}
      label
      labelPosition={50}
      labelStyle={{
        fill: '#121212',
        fontFamily: 'sans-serif',
        fontSize: '5px'
      }}
      lengthAngle={360}
      lineWidth={100}
      onClick={undefined}
      onMouseOut={undefined}
      onMouseOver={undefined}
      paddingAngle={0}
      radius={50}
      rounded={false}
      startAngle={0}
      viewBoxSize={[
        100,
        100
      ]}
    />
  </div>
}