const ambientlib = require('ambient-attx4');
const accellib = require('accel-mma84');
const tessel = require('tessel');

const ambient = ambientlib.use(tessel.port['A']);
const accel = accellib.use(tessel.port['B']);

ambient.on('ready', () => {
  setInterval(() => {
    ambient.getLightLevel( (err, lightdata) => {
      if (err) throw err;
      ambient.getSoundLevel( (err, sounddata) => {
        if (err) throw err;
        console.log('Light level:', lightdata.toFixed(8));
        console.log('Sound level:', sounddata.toFixed(8));
      });
    });
  }, 5000);
});

ambient.on('error', (err) => {
  console.log('Ambient error:', err);
});

accel.on('ready', () => {
  accel.on('data', (xyz) => {
    console.log(
      `x: `, xyz[0].toFixed(2),
      `y: `, xyz[1].toFixed(2),
      'z: ', xyz[2].toFixed(2)
    );
  }, 5000);
});

accel.on('error', (err) => {
  console.log('Accel error:', err);
})