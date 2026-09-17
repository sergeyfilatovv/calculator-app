import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Кабель и штробы
  cableLength: 0,
  wallMaterial: 'concrete',
  groovingLength: 0,
  grooveSize: '20x20',
  distroBoxes: 0,

  // Розетки и выключатели
  socketHoles: 0,
  sockets: 0,
  switches: 0,

  // Электрощит
  panelType: 'surface',
  panelModules: 0,
  auto1P: 0,
  auto2P: 0,
  auto3P: 0,
  auto4P: 0,
  rccb2P: 0,
  rccb4P: 0,
  relay1P: 0,
  relay3P: 0,

  // Дополнительно (чекбоксы)
  grounding: false,
  measurements: false,
  trashRemoval: false,
  masterVisit: false,

  // Итоги (секции и общий)
  sectionCableTotal: 0,
  sectionPointsTotal: 0,
  sectionPanelTotal: 0,
  totalAmount: 0,
};

const estimatorSlice = createSlice({
  name: 'estimator',
  initialState,
  reducers: {
    setCableLength: (state, action) => { state.cableLength = Math.max(0, Number(action.payload) || 0); },
    setWallMaterial: (state, action) => { state.wallMaterial = action.payload; },
    setGroovingLength: (state, action) => { state.groovingLength = Math.max(0, Number(action.payload) || 0); },
    setGrooveSize: (state, action) => { state.grooveSize = action.payload; },
    setDistroBoxes: (state, action) => { state.distroBoxes = Math.max(0, Number(action.payload) || 0); },

    setSocketHoles: (state, action) => { state.socketHoles = Math.max(0, Number(action.payload) || 0); },
    setSockets: (state, action) => { state.sockets = Math.max(0, Number(action.payload) || 0); },
    setSwitches: (state, action) => { state.switches = Math.max(0, Number(action.payload) || 0); },

    setPanelType: (state, action) => { state.panelType = action.payload; },
    setPanelModules: (state, action) => { state.panelModules = Math.max(0, Number(action.payload) || 0); },
    setAuto1P: (state, action) => { state.auto1P = Math.max(0, Number(action.payload) || 0); },
    setAuto2P: (state, action) => { state.auto2P = Math.max(0, Number(action.payload) || 0); },
    setAuto3P: (state, action) => { state.auto3P = Math.max(0, Number(action.payload) || 0); },
    setAuto4P: (state, action) => { state.auto4P = Math.max(0, Number(action.payload) || 0); },
    setRccb2P: (state, action) => { state.rccb2P = Math.max(0, Number(action.payload) || 0); },
    setRccb4P: (state, action) => { state.rccb4P = Math.max(0, Number(action.payload) || 0); },
    setRelay1P: (state, action) => { state.relay1P = Math.max(0, Number(action.payload) || 0); },
    setRelay3P: (state, action) => { state.relay3P = Math.max(0, Number(action.payload) || 0); },

    toggleGrounding: (state) => { state.grounding = !state.grounding; },
    toggleMeasurements: (state) => { state.measurements = !state.measurements; },
    toggleTrashRemoval: (state) => { state.trashRemoval = !state.trashRemoval; },
    toggleMasterVisit: (state) => { state.masterVisit = !state.masterVisit; },

    calculate: (state) => {
      const PRICES = {
        cablePerMeter: 120,
        groovePerMeter: 450,
        distroBox: 1000,
        socketHole: 700,
        socket: 300,
        switch: 350,
        panelModule: 220,
        auto1P: 150,
        auto2P: 200,
        auto3P: 280,
        auto4P: 320,
        rccb2P: 350,
        rccb4P: 420,
        relay1P: 400,
        relay3P: 600,
      };

      const GROOVE_COEFFICIENTS = {
        concrete: 1.4,
        brick: 1.1,
        gypsum: 1,
        wood: 0.7,
      };

        // Добавлен коэффициент для размера штробы
    const GROOVE_SIZE_COEFF = {
        '20x20': 1.0,
        '40x40': 1.5, // штроба 40×40 на 50% дороже
    };


      const PANEL_TYPE_COEFF = {
        surface: 1.0,
        flush: 1.3,
      };

      // Секция 1: Кабель и штробы
      const sectionCable =
        state.cableLength * PRICES.cablePerMeter +
        state.groovingLength * PRICES.groovePerMeter * GROOVE_SIZE_COEFF[state.grooveSize] * GROOVE_COEFFICIENTS[state.wallMaterial] +
        state.distroBoxes * PRICES.distroBox;

      state.sectionCableTotal = sectionCable;

      // Секция 2: Розетки и выключатели
      const sectionPoints =
        state.socketHoles * PRICES.socketHole +
        state.sockets * PRICES.socket +
        state.switches * PRICES.switch;

      state.sectionPointsTotal = sectionPoints;

      // Секция 3: Электрощит
      const panelBase = state.panelModules * PRICES.panelModule * PANEL_TYPE_COEFF[state.panelType];
      const automates =
        state.auto1P * PRICES.auto1P +
        state.auto2P * PRICES.auto2P +
        state.auto3P * PRICES.auto3P +
        state.auto4P * PRICES.auto4P;
      const rccb =
        state.rccb2P * PRICES.rccb2P +
        state.rccb4P * PRICES.rccb4P;
      const relays =
        state.relay1P * PRICES.relay1P +
        state.relay3P * PRICES.relay3P;

      const sectionPanel = panelBase + automates + rccb + relays;
      state.sectionPanelTotal = sectionPanel;

      // Дополнительно (цены условные)
      const extraPrices = {
        grounding: 1500,
        measurements: 2500,
        trashRemoval: 800,
        masterVisit: 1100,
      };
      const extras =
        (state.grounding ? extraPrices.grounding : 0) +
        (state.measurements ? extraPrices.measurements : 0) +
        (state.trashRemoval ? extraPrices.trashRemoval : 0) +
        (state.masterVisit ? extraPrices.masterVisit : 0);

      // Общая сумма
      state.totalAmount = sectionCable + sectionPoints + sectionPanel + extras;
    },
     // Новый экшен сброса
    resetEstimator: (state) => {
      return initialState;
    },
  },
});

export const {
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
} = estimatorSlice.actions;

export default estimatorSlice.reducer;
