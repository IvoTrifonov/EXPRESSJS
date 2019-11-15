const storage = require('./storage');

storage.put('ivaka', 'js web');
storage.update('ivaka', 'js web madafaka');
storage.put('pesho', 'js core');
storage.save();
storage.clear();
storage.load();
console.log(storage.getAll());


