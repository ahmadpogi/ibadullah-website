import { randomBytes, scryptSync } from 'node:crypto';

if (!process.stdin.isTTY) {
  console.error('Run this command in an interactive terminal.');
  process.exit(1);
}
process.stdout.write('Staff password: ');
let password = '';
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', character => {
  if (character === '\u0003') process.exit(130);
  if (character === '\r' || character === '\n') {
    process.stdin.setRawMode(false);
    process.stdin.pause();
    process.stdout.write('\n');
    if (password.length < 16) {
      console.error('Use at least 16 characters.');
      process.exitCode = 1;
      return;
    }
    const salt = randomBytes(16);
    const hash = scryptSync(password, salt, 64);
    password = '';
    console.log(`ADMIN_PASSWORD_HASH=${salt.toString('hex')}:${hash.toString('hex')}`);
  } else if (character === '\u007f') {
    password = password.slice(0, -1);
  } else {
    password += character;
  }
});
