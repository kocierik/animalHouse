module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lyellow: '#f8f362',
        lgreen: '#53db99',
        lblue: '#8fe3d9',
        llime: '#f6ffe9',
        text: '#34393e',
        dyellow: '#f6ef31',
        dgreen: '#364545',
        wrong: '#f8afa6',
        right: '#a3ebb1'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
