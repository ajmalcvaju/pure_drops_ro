const fs = require('fs');

// Simple ZIP central directory parser
const zipBuffer = fs.readFileSync('aqua-solve-theme.zip');

let pos = zipBuffer.length - 22;
// Find End of Central Directory record (0x06054b50)
while (pos > 0) {
  if (zipBuffer.readUInt32LE(pos) === 0x06054b50) {
    break;
  }
  pos--;
}

if (pos <= 0) {
  console.log('EOCD record not found');
  process.exit(1);
}

const cdEntriesCount = zipBuffer.readUInt16LE(pos + 10);
const cdOffset = zipBuffer.readUInt32LE(pos + 16);

let cdPos = cdOffset;
console.log(`Total Central Directory Entries: ${cdEntriesCount}`);
console.log('First 20 entries:');

for (let i = 0; i < cdEntriesCount; i++) {
  if (cdPos >= pos) break;
  const sig = zipBuffer.readUInt32LE(cdPos);
  if (sig !== 0x02014b50) break;
  
  const fileNameLen = zipBuffer.readUInt16LE(cdPos + 28);
  const extraLen = zipBuffer.readUInt16LE(cdPos + 30);
  const commentLen = zipBuffer.readUInt16LE(cdPos + 32);
  
  const fileName = zipBuffer.toString('utf8', cdPos + 46, cdPos + 46 + fileNameLen);
  if (i < 25 || fileName.includes('style.css')) {
    console.log(`Entry [${i}]: "${fileName}"`);
  }
  
  cdPos += 46 + fileNameLen + extraLen + commentLen;
}
