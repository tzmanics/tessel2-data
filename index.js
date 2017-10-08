const ambientlib = require('ambient-attx4');
const firebase = require('firebase');
const tessel = require('tessel');

const ambient = ambientlib.use(tessel.port['A']);

const config = {
  apiKey: "<insert firebase credentials>",
  authDomain: "<insert firebase credentials>",
  databaseURL: "<insert firebase credentials>",
  projectId: "<insert firebase credentials>",
  storageBucket: "<insert firebase credentials>",
  messagingSenderId: "<insert firebase credentials>"
};

firebase.initializeApp(config);

const db = firebase.database();
const ref = db.ref('sensor-data');

ambient.on('ready', () => {
  setInterval(() => {
    ambient.getLightLevel( (err, lightdata) => {
      if (err) throw err;
      ambient.getSoundLevel( (err, sounddata) => {
        if (err) throw err;
        const ambienceRef = ref.child('ambience/' + Date.now());
        ambienceRef.set({
          light: lightdata.toFixed(4) * 100,
          sound: sounddata.toFixed(4) * 100
        });
      });
    });
  }, 30000);
});

ambient.on('error', (err) => {
  console.log('Ambient error:', err);
});
