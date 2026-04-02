// Generate new code batches for cart and checkout recovery

function generateCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'SIPSY5-';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Generate 100 new EMAIL2 codes (cart recovery)
const newEmail2 = [];
for (let i = 0; i < 100; i++) {
  newEmail2.push(generateCode());
}

// Generate 100 new EMAIL3 codes (checkout recovery)
const newEmail3 = [];
for (let i = 0; i < 100; i++) {
  newEmail3.push(generateCode());
}

console.log('EMAIL2_CODES (new):');
console.log(JSON.stringify(newEmail2, null, 2));
console.log('\n\nEMAIL3_CODES (new):');
console.log(JSON.stringify(newEmail3, null, 2));
