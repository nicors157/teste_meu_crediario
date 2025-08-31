/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        //Cores Primárias
        primaria: "#006151",
        primariaDark: "#004A3F",
        primariaLight: "#00856E",
        primariaLightest: "#8CBFB7",
        //Cores Secundarias
        secundaria: "#01865F", 
        secundariaDark: "#016F4F", 
        secundariaLight: "#02E09F",
        //Outras Cores Úteis
        corTexto: "#505050",
        background: "#F1F6F5",
      },
    },
  },
  plugins: [],
}
