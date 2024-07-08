/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      agbalumo: ['Agbalumo'],
      dancing_script: ['Dancing Script']
    },
    extend: {
      backgroundColor: {
        "main-50": "#EDEFF6", 
        "main-100": "#DBDFEC", 
        "main-200": "#B7BFD9", 
        "main-300": "#92A0C7", 
        "main-400": "#6E80B4", 
        "main-500": "#4A60A1", 
        "main-600": "#3B4D81", 
        "main-700": "#2C3A61", 
        "main-800": "#1E2640", 
        "main-900": "#0F1320", 
      },
      colors: {
        "main-50": "#EDEFF6", 
        "main-100": "#DBDFEC", 
        "main-200": "#B7BFD9", 
        "main-300": "#92A0C7", 
        "main-400": "#6E80B4", 
        "main-500": "#4A60A1", 
        "main-600": "#3B4D81", 
        "main-700": "#2C3A61", 
        "main-800": "#1E2640", 
        "main-900": "#0F1320", 
        "overlay-70": "rgba(0,0,0,0.7)",
        "overlay-30": "rgba(0,0,0,0.3)",
        "overlay-50": "rgba(0,0,0,0.5)",
        "overlay-90": "rgba(0,0,0,0.9)",
      },
      width:{
        main: '1200px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  mode: 'jit'
}