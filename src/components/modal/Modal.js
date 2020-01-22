import React, { useContext } from 'react';
import { MyRecipesContext } from '../../context/MyRecipesContext';
import PieChart from 'react-minimal-pie-chart';
import Close from '../../assets/img/cancel.png';


export default function Modal() {

  const { closeModal, modalObj } = useContext(MyRecipesContext)
  const getNum = (num) => {
    const newNum = parseInt(num, 10)
    return newNum
  }

  return (
    <div className="modal">
      <div className="modal__wrapper">
        <img className="modal__close" onClick={closeModal} src={Close} alt="close icon" />
        <p className="modal__title">{modalObj.label}</p>
        <div className="modal__healt-labels">
          {modalObj.healthLabels.map((label, index) => {
            return <div className="modal__label" key={index}>{label}</div>
          })}
        </div>
        <div className="modal__ingredients">
          <p>Ingredients :</p>
          <div className="modal__ingredients-wrapper">
            {modalObj.ingredients.map((ingredient, index) => {
              return <div className="modal__ingredient" key={index}>- {ingredient}</div>
            })}
          </div>
        </div>
        <div className="modal__info-wrapper">
          <div className="modal__chart">
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
          <div className="modal__info">
            <div className='modal__protein-item'><span></span>Proteins</div>
            <div className='modal__fat-item'><span></span>Fat</div>
            <div className='modal__carbs-item'><span></span>Carbs</div>
          </div>
        </div>
      </div>
    </div>
  )
}
