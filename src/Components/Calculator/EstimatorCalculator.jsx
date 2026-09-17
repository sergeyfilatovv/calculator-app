import './style.css'
import {Container} from '../../StyledComponents/Container/Container.styles'
import * as S from './EstimatorCalculator.styles'

import { useDispatch, useSelector } from 'react-redux';
import {
  setCableLength,
  setWallMaterial,
  setGroovingLength,
  setGrooveSize,
  setDistroBoxes,
  setSocketHoles,
  setSockets,
  setSwitches,
  setPanelType,
  setPanelModules,
  setAuto1P,
  setAuto2P,
  setAuto3P,
  setAuto4P,
  setRccb2P,
  setRccb4P,
  setRelay1P,
  setRelay3P,
  toggleGrounding,
  toggleMeasurements,
  toggleTrashRemoval,
  toggleMasterVisit,
  calculate,
  resetEstimator,
} from '../../toolkitRedux/estimatorSlice';

function EstimatorCalculator() {
  const dispatch = useDispatch();
  const state = useSelector((s) => s.estimator);

  const handleNumberChange = (setter, value) => {
    const num = Number(value);
    dispatch(setter(isNaN(num) ? 0 : num));
    dispatch(calculate());
  };

  const handleSelectChange = (setter, e) => {
    dispatch(setter(e.target.value));
    dispatch(calculate());
  };

  const handleCheckboxToggle = (toggleAction) => {
    dispatch(toggleAction());
    dispatch(calculate());
  };

  return (
    <Container>
      <S.CalculatorHeader>
        <h1>Калькулятор электромонтажа</h1>
        <S.CalculatorSubtitle>
            Укажите параметры работ — покажем предварительную стоимость
        </S.CalculatorSubtitle>
      </S.CalculatorHeader>
      <S.CalculatorForm>
        {/* Кабель и штробы */}
        <S.CalculatorSection>
                 <h2 className="calculator-section-title">Кабель и штробы</h2>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label" htmlFor="cable-length">Длина кабеля, м</label>
              <input
                type="text"
                id="cable-length"
                className="calc-field"
                placeholder="0"
                value={state.cableLength}
                onChange={(e) => handleNumberChange(setCableLength, e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="wall-material">Материал стены</label>
              <select
                id="wall-material"
                className="calc-field calc-select"
                value={state.wallMaterial}
                onChange={(e) => handleSelectChange(setWallMaterial, e)}
              >
                <option value="concrete">Бетон</option>
                <option value="brick">Кирпич</option>
                <option value="gypsum">Гипс/ГКЛ</option>
                <option value="wood">Дерево</option>
              </select>
            </div>
          </div>

          <div className="form-group__wrapper">
            <div className="form-group">
              <label className="form-label" htmlFor="grooving-length">Длина штроб, м</label>
              <input
                type="text"
                id="grooving-length"
                className="calc-field"
                placeholder="0"
                value={state.groovingLength}
                onChange={(e) => handleNumberChange(setGroovingLength, e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="groove-size">Размер штробы</label>
              <select
                id="groove-size"
                className="calc-field calc-select"
                value={state.grooveSize}
                onChange={(e) => handleSelectChange(setGrooveSize, e)}
              >
                <option value="20x20">20 × 20 мм</option>
                <option value="40x40">40 × 40 мм</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="distro-boxes">Монтаж распределительных коробок, шт</label>
              <input
                type="text"
                id="distro-boxes"
                className="calc-field"
                placeholder="0"
                value={state.distroBoxes}
                onChange={(e) => handleNumberChange(setDistroBoxes, e.target.value)}
              />
            </div>

            <div className="section-total">
              <span className="section-total-label">Итого по секции:</span>
              <span className="section-total-value">{state.sectionCableTotal.toLocaleString('ru-RU')} ₽</span>
            </div>
          </div>
        </S.CalculatorSection>
         {/* Розетки и выключатели */}
        <S.CalculatorSection>
           <h2 className="calculator-section-title">Розетки и выключатели</h2>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label" htmlFor="socket-holes">Высверливание отверстий под подрозетники, шт</label>
              <input
                type="text"
                id="socket-holes"
                className="calc-field"
                placeholder="0"
                value={state.socketHoles}
                onChange={(e) => handleNumberChange(setSocketHoles, e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="sockets">Розетки, шт</label>
              <input
                type="text"
                id="sockets"
                className="calc-field"
                placeholder="0"
                value={state.sockets}
                onChange={(e) => handleNumberChange(setSockets, e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="switches">Выключатели, шт</label>
              <input
                type="text"
                id="switches"
                className="calc-field"
                placeholder="0"
                value={state.switches}
                onChange={(e) => handleNumberChange(setSwitches, e.target.value)}
              />
            </div>
          </div>

          <div className="section-total">
            <span className="section-total-label">Итого по секции:</span>
            <span className="section-total-value">{state.sectionPointsTotal.toLocaleString('ru-RU')} ₽</span>
          </div>
        </S.CalculatorSection>
        {/* Электрощит */}
        <S.CalculatorSection>
            <h2 className="calculator-section-title">Электрощит</h2>
          <div className="form-group__wrapper">
            <div className="form-group">
              <label className="form-label" htmlFor="panel-type">Тип щита</label>
              <select
                id="panel-type"
                className="calc-field calc-select"
                value={state.panelType}
                onChange={(e) => handleSelectChange(setPanelType, e)}
              >
                <option value="surface">Накладной (на стену)</option>
                <option value="flush">Встраиваемый (в нишу)</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="panel-modules">Модули щита, шт</label>
              <input
                type="text"
                id="panel-modules"
                className="calc-field"
                placeholder="0"
                value={state.panelModules}
                onChange={(e) => handleNumberChange(setPanelModules, e.target.value)}
              />
            </div>
          </div>

          {/* Автоматы */}
          <h3 className="calculator-subtitle-mini">Автоматы</h3>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label" htmlFor="auto-1p">Однополюсные, шт</label>
              <input
                type="text"
                id="auto-1p"
                className="calc-field"
                placeholder="0"
                value={state.auto1P}
                onChange={(e) => handleNumberChange(setAuto1P, e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="auto-2p">Двухполюсные, шт</label>
              <input
                type="text"
                id="auto-2p"
                className="calc-field"
                placeholder="0"
                value={state.auto2P}
                onChange={(e) => handleNumberChange(setAuto2P, e.target.value)}
              />
            </div>
          </div>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label" htmlFor="auto-3p">Трёхполюсные, шт</label>
              <input
                type="text"
                id="auto-3p"
                className="calc-field"
                placeholder="0"
                value={state.auto3P}
                onChange={(e) => handleNumberChange(setAuto3P, e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="auto-4p">Четырёхполюсные, шт</label>
              <input
                type="text"
                id="auto-4p"
                className="calc-field"
                placeholder="0"
                value={state.auto4P}
                onChange={(e) => handleNumberChange(setAuto4P, e.target.value)}
              />
            </div>
          </div>

          {/* УЗО */}
          <h3 className="calculator-subtitle-mini">УЗО</h3>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label" htmlFor="rccb-2p">Двухполюсные, шт</label>
              <input
                type="text"
                id="rccb-2p"
                className="calc-field"
                placeholder="0"
                value={state.rccb2P}
                onChange={(e) => handleNumberChange(setRccb2P, e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="rccb-4p">Четырёхполюсные, шт</label>
              <input
                type="text"
                id="rccb-4p"
                className="calc-field"
                placeholder="0"
                value={state.rccb4P}
                onChange={(e) => handleNumberChange(setRccb4P, e.target.value)}
              />
            </div>
          </div>

          {/* Реле напряжения */}
          <h3 className="calculator-subtitle-mini">Реле напряжения</h3>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label" htmlFor="relay-1p">Однофазные, шт</label>
              <input
                type="text"
                id="relay-1p"
                className="calc-field"
                placeholder="0"
                value={state.relay1P}
                onChange={(e) => handleNumberChange(setRelay1P, e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="relay-3p">Трёхфазные, шт</label>
              <input
                type="text"
                id="relay-3p"
                className="calc-field"
                placeholder="0"
                value={state.relay3P}
                onChange={(e) => handleNumberChange(setRelay3P, e.target.value)}
              />
            </div>
          </div>

          <div className="section-total">
            <span className="section-total-label">Итого по секции:</span>
            <span className="section-total-value">{state.sectionPanelTotal.toLocaleString('ru-RU')} ₽</span>
          </div>
        </S.CalculatorSection>
        {/* Дополнительно */}
        <S.CalculatorSection>
             <h2 className="calculator-section-title">Дополнительно</h2>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={state.grounding}
                onChange={() => handleCheckboxToggle(toggleGrounding)}
              />
              Монтаж заземления
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={state.measurements}
                onChange={() => handleCheckboxToggle(toggleMeasurements)}
              />
              Замеры и протокол
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={state.trashRemoval}
                onChange={() => handleCheckboxToggle(toggleTrashRemoval)}
              />
              Вывоз мусора
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={state.masterVisit}
                onChange={() => handleCheckboxToggle(toggleMasterVisit)}
              />
              Выезд мастера
            </label>
          </div>
        </S.CalculatorSection>
      </S.CalculatorForm>

      {/* Итог */}
      <S.CalculatorFooter>
         <div className="total-box">
          <span className="total-label">Предварительная сумма:</span>
          <span className="total-value">{state.totalAmount.toLocaleString('ru-RU')} ₽</span>
          </div>
          <div className="footer-actions">
          <button type="button" className="btn" onClick={() => dispatch(resetEstimator())}>
            Сбросить
          </button>
          <button type="button" className="btn btn-primary" onClick={() => alert('Заявка отправлена!')}>
            Отправить заявку
          </button>
        </div>
        <p className="disclaimer">Стоимость ориентировочная. Точный расчёт после выезда мастера.</p>
      </S.CalculatorFooter>
    </Container>
  );
}

export default EstimatorCalculator;
