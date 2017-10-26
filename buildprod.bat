cd config
copy global.prod.js global.js /y
cd ../src/assets/js
copy rxUtils.prod.js rxUtils.js /y
cd ../../../
npm run build
