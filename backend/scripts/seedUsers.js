const bcrypt = require('bcryptjs');
const prisma = require('../src/db/prismaClient');

async function main() {
  const adminPassword = 'adminpass';
  const userPassword = 'password123';

  const adminHash = bcrypt.hashSync(adminPassword, 10);
  const userHash = bcrypt.hashSync(userPassword, 10);

  const admin = await prisma.user.upsert({
    where: { username: 'adminuser' },
    update: { name: 'Admin User', password: adminHash, role: 'ADMIN' },
    create: { username: 'adminuser', name: 'Admin User', password: adminHash, role: 'ADMIN' }
  });

  const user = await prisma.user.upsert({
    where: { username: 'testuser' },
    update: { name: 'Test User', password: userHash, role: 'USER' },
    create: { username: 'testuser', name: 'Test User', password: userHash, role: 'USER' }
  });

  console.log('Seeded users:');
  console.log({ admin: { username: admin.username, password: adminPassword, role: admin.role } });
  console.log({ user: { username: user.username, password: userPassword, role: user.role } });
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
