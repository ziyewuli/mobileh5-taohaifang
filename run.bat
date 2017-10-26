cd config
copy global.test.js global.js /y
cd ../src/assets/js
copy rxUtils.test.js rxUtils.js /y
cd ../../../
npm run dev
