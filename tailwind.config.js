/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        'mobile': '550px',
        "tablet":"850px"
      },
      spacing:{
        "12/12":"95%",
        "18":"70px",
        "74":"300px",
        "98":"400px",
        "99":"430px",
        "100":"450px"
      }
    },
  },
  plugins: [],
}

