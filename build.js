const { promisify } = require('util');
const sass = require('sass');
const fs = require('fs');
const path = require('path');

const writeFile = promisify(require('fs').writeFile);

const srcPath = path.join(__dirname, 'src');
const stylesSrcPath = path.join(srcPath, 'styles');
const scssSrcPath = path.join(stylesSrcPath, 'app.scss');

const publicPath = path.join(__dirname, 'public');
const stylesPublicPath = path.join(publicPath, 'styles');
const cssPublicPath = path.join(stylesPublicPath, 'app.css');
const cssMapPublicPath = path.join(stylesPublicPath, 'app.css.map');

new Promise((resolve, reject) => {
  sass.render(
    {
      file: scssSrcPath,
      outFile: cssPublicPath,
      outputStyle: 'compressed',
      sourceMap: true,
    },
    (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    },
  )
})
.then(({ css, map }) => {
  fs.mkdirSync(stylesPublicPath, { recursive: true });
  writeFile(cssPublicPath, css.toString());
  writeFile(cssMapPublicPath, map.toString());
})
.catch((error) => {
  console.log(error);
});
