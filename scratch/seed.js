const { PrismaClient } = require('../src/generated/prisma');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || 'maxwelljohnpaul29@gmail.com';
  const existingAdmin = await prisma.admin.findUnique({ where: { email } });
  
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.admin.create({
      data: {
        name: 'Admin',
        email,
        password: hashedPassword,
        role: 'SUPER_ADMIN'
      }
    });
    console.log('Admin user created: ' + email + ' / admin123');
  } else {
    console.log('Admin already exists');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
