const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function createZip(sourceDir, zipPath, includeRootFolder = true) {
  const files = [];
  const dirs = new Set();

  const baseParent = includeRootFolder ? path.dirname(sourceDir) : sourceDir;

  function walk(dir) {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        const relDir = path.relative(baseParent, fullPath).replace(/\\/g, '/') + '/';
        if (relDir !== './') dirs.add(relDir);
        walk(fullPath);
      } else {
        const relFile = path.relative(baseParent, fullPath).replace(/\\/g, '/');
        const dirName = path.dirname(relFile).replace(/\\/g, '/') + '/';
        if (dirName !== './' && dirName !== '') {
          dirs.add(dirName);
        }
        files.push({ fullPath, relFile, mtime: stat.mtime });
      }
    });
  }

  walk(sourceDir);

  const entries = [];

  // Add directories first
  Array.from(dirs).sort().forEach(dirName => {
    entries.push({
      isDir: true,
      name: dirName,
      data: Buffer.alloc(0),
      crc: 0,
      uncompressedSize: 0,
      compressedSize: 0,
      mtime: new Date()
    });
  });

  // Add files
  files.forEach(f => {
    const rawData = fs.readFileSync(f.fullPath);
    const compressedData = zlib.deflateRawSync(rawData);

    // Calculate CRC32
    let crc = 0 ^ (-1);
    for (let i = 0; i < rawData.length; i++) {
      crc = (crc >>> 8) ^ crc32Table[(crc ^ rawData[i]) & 0xFF];
    }
    crc = (crc ^ (-1)) >>> 0;

    entries.push({
      isDir: false,
      name: f.relFile,
      data: compressedData,
      crc: crc,
      uncompressedSize: rawData.length,
      compressedSize: compressedData.length,
      mtime: f.mtime
    });
  });

  // Build ZIP buffer
  const parts = [];
  const cdParts = [];
  let offset = 0;

  entries.forEach(e => {
    const nameBuf = Buffer.from(e.name, 'utf8');
    
    const date = e.mtime || new Date();
    const dosTime = (date.getHours() << 11) | (date.getMinutes() << 5) | (Math.floor(date.getSeconds() / 2));
    const dosDate = (((date.getFullYear() - 1980) & 0x7f) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();

    // Local Header
    const lh = Buffer.alloc(30 + nameBuf.length);
    lh.writeUInt32LE(0x04034b50, 0);
    lh.writeUInt16LE(20, 4);
    lh.writeUInt16LE(0, 6);
    lh.writeUInt16LE(e.isDir ? 0 : 8, 8);
    lh.writeUInt16LE(dosTime, 10);
    lh.writeUInt16LE(dosDate, 12);
    lh.writeUInt32LE(e.crc, 14);
    lh.writeUInt32LE(e.isDir ? 0 : e.compressedSize, 18);
    lh.writeUInt32LE(e.isDir ? 0 : e.uncompressedSize, 22);
    lh.writeUInt16LE(nameBuf.length, 26);
    lh.writeUInt16LE(0, 28);
    nameBuf.copy(lh, 30);

    const entryOffset = offset;
    parts.push(lh);
    offset += lh.length;

    if (!e.isDir) {
      parts.push(e.data);
      offset += e.data.length;
    }

    // Central Directory Header
    const cd = Buffer.alloc(46 + nameBuf.length);
    cd.writeUInt32LE(0x02014b50, 0);
    cd.writeUInt16LE(20, 4);
    cd.writeUInt16LE(20, 6);
    cd.writeUInt16LE(0, 8);
    cd.writeUInt16LE(e.isDir ? 0 : 8, 10);
    cd.writeUInt16LE(dosTime, 12);
    cd.writeUInt16LE(dosDate, 14);
    cd.writeUInt32LE(e.crc, 16);
    cd.writeUInt32LE(e.isDir ? 0 : e.compressedSize, 20);
    cd.writeUInt32LE(e.isDir ? 0 : e.uncompressedSize, 24);
    cd.writeUInt16LE(nameBuf.length, 28);
    cd.writeUInt16LE(0, 30);
    cd.writeUInt16LE(0, 32);
    cd.writeUInt16LE(0, 34);
    cd.writeUInt16LE(e.isDir ? 0x10 : 0, 36);
    cd.writeUInt32LE(e.isDir ? 0x10 : 0x20, 38);
    cd.writeUInt32LE(entryOffset, 42);
    nameBuf.copy(cd, 46);

    cdParts.push(cd);
  });

  const cdBuffer = Buffer.concat(cdParts);
  const cdOffset = offset;
  const cdSize = cdBuffer.length;

  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(0, 4);
  eocd.writeUInt16LE(0, 6);
  eocd.writeUInt16LE(entries.length, 8);
  eocd.writeUInt16LE(entries.length, 10);
  eocd.writeUInt32LE(cdSize, 12);
  eocd.writeUInt32LE(cdOffset, 16);
  eocd.writeUInt16LE(0, 20);

  const finalBuffer = Buffer.concat([...parts, cdBuffer, eocd]);
  fs.writeFileSync(zipPath, finalBuffer);
  console.log(`Generated ${zipPath} (${finalBuffer.length} bytes, ${entries.length} entries)`);
}

const crc32Table = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let j = 0; j < 8; j++) {
    c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crc32Table[i] = c;
}

createZip('d:/dr water care/aqua-solve-theme', 'd:/dr water care/aqua-solve-theme.zip', true);
createZip('d:/dr water care/aqua-solve-theme', 'd:/dr water care/aqua-solve-theme-direct.zip', false);
