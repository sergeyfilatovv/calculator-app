import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Коэффициенты и цены — вынесены сюда, чтобы PDF совпадал с расчётом в slice.
// В идеале — импортировать из общего модуля (см. ниже).
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

const GROOVE_SIZE_COEFF = {
  '20x20': 1.0,
  '40x40': 1.5,
};

const PANEL_TYPE_COEFF = {
  surface: 1.0,
  flush: 1.3,
};

const EXTRA_PRICES = {
  grounding: 1500,
  measurements: 2500,
  trashRemoval: 800,
  masterVisit: 1100,
};

const WALL_MATERIAL_LABELS = {
  concrete: 'Бетон',
  brick: 'Кирпич',
  gypsum: 'Гипсокартон',
  wood: 'Дерево',
};

const PANEL_TYPE_LABELS = {
  surface: 'Накладной',
  flush: 'Встраиваемый',
};

const formatMoney = (value) =>
  new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(value) + ' ₽';

/**
 * @param {object} state — объект из Redux (state.estimator)
 * @param {object} [options]
 * @param {string} [options.fileName]
 * @param {string} [options.fontUrl] — путь к TTF-шрифту с кириллицей
 */
export async function generateEstimatePDF(state, options = {}) {
  const {
    fileName = `Смета_${new Date().toISOString().slice(0, 10)}.pdf`,
    fontUrl = '/fonts/Roboto-Regular.ttf',
  } = options;

  const doc = new jsPDF({ unit: 'pt', format: 'a4' });

// --- Подключение шрифта с поддержкой кириллицы ---
// Положите Roboto-Regular.ttf (и при желании Bold) в /public/fonts/
const [regular, bold] = await Promise.all([
fetch('/fonts/Roboto-Regular.ttf').then((r) => r.arrayBuffer()),
fetch('/fonts/Roboto-Bold.ttf').then((r) => r.arrayBuffer()),
]);

doc.addFileToVFS('Roboto-Regular.ttf', arrayBufferToBase64(regular));
doc.addFileToVFS('Roboto-Bold.ttf', arrayBufferToBase64(bold));
doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
doc.addFont('Roboto-Bold.ttf', 'Roboto', 'bold');
doc.setFont('Roboto', 'normal');

  // --- Заголовок ---
  doc.setFontSize(18);
  doc.text('Смета на электромонтажные работы', 40, 50);

  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text(`Дата: ${new Date().toLocaleDateString('ru-RU')}`, 40, 68);
  doc.setTextColor(0);

  // --- Секция 1. Кабель и штробы ---
  const cableRows = [
    [
      'Кабель',
      `${state.cableLength} м`,
      formatMoney(PRICES.cablePerMeter),
      formatMoney(state.cableLength * PRICES.cablePerMeter),
    ],
  ];

  if (state.groovingLength > 0) {
    cableRows.push([
      `Штробление (${state.grooveSize}, ${WALL_MATERIAL_LABELS[state.wallMaterial] || state.wallMaterial})`,
      `${state.groovingLength} м`,
      formatMoney(
        PRICES.groovePerMeter *
          GROOVE_SIZE_COEFF[state.grooveSize] *
          GROOVE_COEFFICIENTS[state.wallMaterial]
      ),
      formatMoney(
        state.groovingLength *
          PRICES.groovePerMeter *
          GROOVE_SIZE_COEFF[state.grooveSize] *
          GROOVE_COEFFICIENTS[state.wallMaterial]
      ),
    ]);
  }

  if (state.distroBoxes > 0) {
    cableRows.push([
      'Распределительные коробки',
      `${state.distroBoxes} шт`,
      formatMoney(PRICES.distroBox),
      formatMoney(state.distroBoxes * PRICES.distroBox),
    ]);
  }

  autoTable(doc, {
    startY: 90,
    head: [['Секция 1. Кабель и штробы', 'Кол-во', 'Цена', 'Сумма']],
    body: cableRows,
    foot: [['', '', 'Итого:', formatMoney(state.sectionCableTotal)]],
    styles: { font: 'Roboto', fontSize: 10 },
    headStyles: { fillColor: [41, 128, 185], font: 'Roboto' },
    footStyles: { fillColor: [236, 240, 241], textColor: 0, font: 'Roboto' },
    theme: 'grid',
  });

  // --- Секция 2. Розетки и выключатели ---
  const pointsRows = [];
  if (state.socketHoles > 0)
    pointsRows.push([
      'Подрозетники (штробление отверстий)',
      `${state.socketHoles} шт`,
      formatMoney(PRICES.socketHole),
      formatMoney(state.socketHoles * PRICES.socketHole),
    ]);
  if (state.sockets > 0)
    pointsRows.push([
      'Установка розеток',
      `${state.sockets} шт`,
      formatMoney(PRICES.socket),
      formatMoney(state.sockets * PRICES.socket),
    ]);
  if (state.switches > 0)
    pointsRows.push([
      'Установка выключателей',
      `${state.switches} шт`,
      formatMoney(PRICES.switch),
      formatMoney(state.switches * PRICES.switch),
    ]);

  if (pointsRows.length === 0) pointsRows.push(['—', '', '', '']);

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 20,
    head: [['Секция 2. Розетки и выключатели', 'Кол-во', 'Цена', 'Сумма']],
    body: pointsRows,
    foot: [['', '', 'Итого:', formatMoney(state.sectionPointsTotal)]],
    styles: { font: 'Roboto', fontSize: 10 },
    headStyles: { fillColor: [39, 174, 96], font: 'Roboto' },
    footStyles: { fillColor: [236, 240, 241], textColor: 0, font: 'Roboto' },
    theme: 'grid',
  });

  // --- Секция 3. Электрощит ---
  const panelRows = [];
  if (state.panelModules > 0)
    panelRows.push([
      `Корпус щита (${PANEL_TYPE_LABELS[state.panelType] || state.panelType})`,
      `${state.panelModules} мод.`,
      formatMoney(PRICES.panelModule * PANEL_TYPE_COEFF[state.panelType]),
      formatMoney(
        state.panelModules * PRICES.panelModule * PANEL_TYPE_COEFF[state.panelType]
      ),
    ]);

  const autos = [
    ['Автомат 1P', state.auto1P, PRICES.auto1P],
    ['Автомат 2P', state.auto2P, PRICES.auto2P],
    ['Автомат 3P', state.auto3P, PRICES.auto3P],
    ['Автомат 4P', state.auto4P, PRICES.auto4P],
    ['УЗО 2P', state.rccb2P, PRICES.rccb2P],
    ['УЗО 4P', state.rccb4P, PRICES.rccb4P],
    ['Реле 1P', state.relay1P, PRICES.relay1P],
    ['Реле 3P', state.relay3P, PRICES.relay3P],
  ];
  autos.forEach(([label, qty, price]) => {
    if (qty > 0)
      panelRows.push([label, `${qty} шт`, formatMoney(price), formatMoney(qty * price)]);
  });

  if (panelRows.length === 0) panelRows.push(['—', '', '', '']);

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 20,
    head: [['Секция 3. Электрощит', 'Кол-во', 'Цена', 'Сумма']],
    body: panelRows,
    foot: [['', '', 'Итого:', formatMoney(state.sectionPanelTotal)]],
    styles: { font: 'Roboto', fontSize: 10 },
    headStyles: { fillColor: [192, 57, 43], font: 'Roboto' },
    footStyles: { fillColor: [236, 240, 241], textColor: 0, font: 'Roboto' },
    theme: 'grid',
  });

  // --- Секция 4. Дополнительно ---
  const extrasRows = [];
  if (state.grounding)
    extrasRows.push(['Заземление', '1', formatMoney(EXTRA_PRICES.grounding), formatMoney(EXTRA_PRICES.grounding)]);
  if (state.measurements)
    extrasRows.push(['Замеры', '1', formatMoney(EXTRA_PRICES.measurements), formatMoney(EXTRA_PRICES.measurements)]);
  if (state.trashRemoval)
    extrasRows.push(['Вывоз мусора', '1', formatMoney(EXTRA_PRICES.trashRemoval), formatMoney(EXTRA_PRICES.trashRemoval)]);
  if (state.masterVisit)
    extrasRows.push(['Выезд мастера', '1', formatMoney(EXTRA_PRICES.masterVisit), formatMoney(EXTRA_PRICES.masterVisit)]);

  if (extrasRows.length > 0) {
    const extrasTotal = extrasRows.reduce(
      (sum, r) => sum + Number(String(r[3]).replace(/[^\d]/g, '')),
      0
    );
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      head: [['Секция 4. Дополнительно', 'Кол-во', 'Цена', 'Сумма']],
      body: extrasRows,
      foot: [['', '', 'Итого:', formatMoney(extrasTotal)]],
      styles: { font: 'Roboto', fontSize: 10 },
      headStyles: { fillColor: [142, 68, 173], font: 'Roboto' },
      footStyles: { fillColor: [236, 240, 241], textColor: 0, font: 'Roboto' },
      theme: 'grid',
    });
  }

  // --- Итог ---
  const finalY = doc.lastAutoTable.finalY + 30;
  doc.setFontSize(14);
  doc.setFont('Roboto', 'normal');
  doc.text(`ИТОГО: ${formatMoney(state.totalAmount)}`, 40, finalY);

  doc.save(fileName);
}

// Конвертация ArrayBuffer -> base64 (для jsPDF.addFileToVFS)
function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}