import { Drivers, Storage } from '@ionic/storage';

const storage = new Storage({
    name: 'pruebaIonicdb',
    driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
  });

export default storage;

