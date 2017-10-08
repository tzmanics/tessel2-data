const ambientlib = require('ambient-attx4');
const firebase = require('firebase');
const tessel = require('tessel');

const ambient = ambientlib.use(tessel.port['A']);

const config = {
  apiKey: "<enter apiKey",
  authDomain: "<enter authDomain>",
  databaseURL: "<enter databaseURL>",
  projectId: "<enter projectId>",
  storageBucket: "<enter storageBuckets>",
  messagingSenderId: "<enter messagingSenderId>"
};

firebase.initializeApp(config);

const db = firebase.database();
const ref = db.ref("sensor-data");
const ambianceRef = ref.child("ambiance");
const newAmbianceRef = ambianceRef.push();

ambient.on('ready', () => {
  setInterval(() => {
    ambient.getLightLevel( (err, lightdata) => {
      if (err) throw err;
      ambient.getSoundLevel( (err, sounddata) => {
        if (err) throw err;
        newAmbianceRef.set({
          light: lightdata.toFixed(4),
          sound: sounddata.toFixed(4)
        })
        console.log('Light level:', lightdata.toFixed(4));
        console.log('Sound level:', sounddata.toFixed(4));
      });
    });
  }, 30000);
});

ambient.on('error', (err) => {
  console.log('Ambient error:', err);
});
