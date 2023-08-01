/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-500': '#8334D2',
        'primary-600': '#5A0EA6'
      },
      backgroundImage: {
        'shadow-image': 'linear-gradient(180.08deg, rgba(29, 29, 29, 0.4) 0.07%, rgba(0, 0, 0, 0.6) 99.93%)',
        'shadow-tranparent': 'linear-gradient(180.08deg, rgba(29, 29, 29, 0) 0.07%, rgba(0, 0, 0, 0) 99.93%)',
      },
    },
  },
  plugins: [],
}
