// src/toolkitRedux/catalogSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeCategory: 'all', // 'all' | 'apartment' | 'house' | 'office' | 'shop'
  items: [
    {
      id: '1',
      title: 'Электромонтаж в 3-к квартире 78 м²',
      category: 'Апартаменты',
      images: [
        '/images/catalog/apt-1-before.jpg',
        '/images/catalog/apt-1-after.jpg'
      ],
      summary: 'Полная замена проводки, щит на 24 модуля, розетки и выключатели Legrand.',
      priceRange: 'от 95 000 ₽',
      durationDays: 5,
      rating: 4.9,
      tags: ['замена проводки', 'щит', 'Legrand']
    },
    {
      id: '2',
      title: 'Электрика в частном доме 140 м²',
      category: 'Дома',
      images: [
        '/images/catalog/house-1-floor.jpg',
        '/images/catalog/house-1-panel.jpg'
      ],
      summary: 'Ввод 380 В, щит на 36 модулей, заземление, молниезащита, розеточные группы.',
      priceRange: 'от 180 000 ₽',
      durationDays: 10,
      rating: 4.8,
      tags: ['380В', 'заземление', 'молниезащита']
    },
    {
      id: '3',
      title: 'Офисное помещение 65 м² — быстрый монтаж',
      category: 'Офисы',
      images: [
        '/images/catalog/office-1-layout.jpg',
        '/images/catalog/office-1-final.jpg'
      ],
      summary: 'Разводка под рабочие места, освещение, слаботочка, щит на 18 модулей.',
      priceRange: 'от 75 000 ₽',
      durationDays: 4,
      rating: 4.7,
      tags: ['офис', 'слаботочка', 'освещение']
    },
    {
      id: '4',
      title: 'Магазин 90 м²: освещение и розетки',
      category: 'Магазины',
      images: [
        '/images/catalog/shop-1-hall.jpg',
        '/images/catalog/shop-1-panel.jpg'
      ],
      summary: 'Освещение треками, розеточные группы, щит, аварийное освещение.',
      priceRange: 'от 110 000 ₽',
      durationDays: 6,
      rating: 4.6,
      tags: ['трековое освещение', 'аварийное освещение']
    },
      {
      id: '5',
      title: 'Магазин 130 м²: освещение и розетки',
      category: 'Магазины',
      images: [
        '/images/catalog/shop-1-hall.jpg',
        '/images/catalog/shop-1-panel.jpg'
      ],
      summary: 'Освещение треками, розеточные группы, щит, аварийное освещение.',
      priceRange: 'от 150 000 ₽',
      durationDays: 9,
      rating: 4.5,
      tags: ['трековое освещение', 'аварийное освещение']
    },
    {
      id: '6',
      title: 'Сборка шкафа управления',
      category: 'ШУ',
      images: [
        '/images/catalog/apt-1-before.jpg',
        '/images/catalog/apt-1-after.jpg'
      ],
      summary: 'Полная сборка шкафа управления 4-мя нагрузками',
      priceRange: 'от 950 000 ₽',
      durationDays: 14,
      rating: 5.0,
      tags: ['сборка ШУ', 'щит']
    },
    {
      id: '7',
      title: 'Сборка вводно-распределительного устройства',
      category: 'ВРУ',
      images: [
        '/images/catalog/apt-1-before.jpg',
        '/images/catalog/apt-1-after.jpg'
      ],
      summary: 'Полная сборка вводно-распределительного устройства ',
      priceRange: 'от 450 000 ₽',
      durationDays: 11,
      rating: 5.0,
      tags: ['сборка ВРУ', 'щит']
    },
       {
      id: '8',
      title: 'Комплекс работ по элетромонтажу',
      category: 'Локальные виды работ',
      images: [
        '/images/catalog/apt-1-before.jpg',
        '/images/catalog/apt-1-after.jpg'
      ],
      summary: 'Монтаж кабеля 2*2,5 и 2*4 в сумме 32 метра, высверливание дырок подрозетника 5 шт, установка блока розеток 5 шт, монтаж однополюсных АВ в количестве 2 шт ',
      priceRange: 'от 17 000 ₽',
      durationDays: 11,
      rating: 5.0,
      tags: ['Монтаж кабеля', 'электрощит, сверление подрозетников, монтаж розеток']
    }
    
  ],
  isLoading: false,
  error: null
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    toggleFavorite: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        item.isFavorite = !item.isFavorite;
      }
    }
  }
});

export const { setActiveCategory, addItem, removeItem, toggleFavorite } = catalogSlice.actions;
export default catalogSlice.reducer;
