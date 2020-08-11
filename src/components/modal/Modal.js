import React, { useContext } from "react";
import { RecipesContext } from "../../context/RecipesContext";
import PieChart from "react-minimal-pie-chart";
import Close from "../../assets/img/cancel.png";
import PropTypes from "prop-types";

const Modal = () => {
  const { closeModal, modalObj } = useContext(RecipesContext);

  const getNum = (num) => {
    const newNum = parseInt(num, 10);
    return newNum;
  };

  return (
    <div className="modal" data-type="close" onClick={closeModal}>
      <div className="modal__wrapper">
        <img
          className="modal__close"
          src={Close}
          alt="close icon"
          data-type="close"
        />
        <p className="modal__title">{modalObj.label}</p>
        <ul className="modal__healt-labels">
          {modalObj.healthLabels.map((label, index) => {
            return (
              <li className="modal__label" key={index}>
                {label}
              </li>
            );
          })}
        </ul>
        <div className="modal__ingredients">
          <p>Ingredients :</p>
          <ul className="modal__ingredients-wrapper">
            {modalObj.ingredients.map((ingredient, index) => {
              return (
                <li className="modal__ingredient" key={index}>
                  - {ingredient}
                </li>
              );
            })}
          </ul>
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
                  color: "#E38627",
                  title: modalObj.totalNutrients.FAT.label,
                  value: getNum(modalObj.totalNutrients.FAT.quantity),
                },
                {
                  color: "#C13C37",
                  title: modalObj.totalNutrients.PROCNT.label,
                  value: getNum(modalObj.totalNutrients.PROCNT.quantity),
                },
                {
                  color: "#6A2135",
                  title: modalObj.totalNutrients.CHOCDF.label,
                  value: getNum(modalObj.totalNutrients.PROCNT.quantity),
                },
              ]}
              label
              labelPosition={50}
              labelStyle={{
                fill: "#121212",
                fontFamily: "sans-serif",
                fontSize: "5px",
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
              viewBoxSize={[100, 100]}
            />
          </div>
          <div className="modal__info">
            <div className="modal__protein-item">
              <span></span>Proteins
            </div>
            <div className="modal__fat-item">
              <span></span>Fat
            </div>
            <div className="modal__carbs-item">
              <span></span>Carbs
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func,
  modalObj: PropTypes.array,
};

export default Modal;
