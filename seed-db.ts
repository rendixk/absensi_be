import { prisma } from "./src/config/prisma"
import chalk from "chalk"
import { hash_password } from './src/config/auth_policy/bcrypt'
import { Role } from "./src/generated"

async function seed() {
  const commonPassword = await hash_password('123')

  console.log(chalk.blueBright('Seeding data...'))

  // 1. Admin
  // await prisma.admin.create({
  //   data: {
  //     username: 'admin_utama',
  //     password: commonPassword,
  //     role: 'admin'
  //   },
  // })

  // 2. Guru BK
  await prisma.guru_bk.create({
    data: {
      nip: '198903102013011023',
      username: 'desuka',
      password: commonPassword,
      role: Role.guru_bk
    },
  })

  // 3. Wali Kelas
  await prisma.wali_kelas.create({
    data: {
        username: 'isuka',
        nip: '198502022005021002',
        mapel: "Code Dev",
        password: commonPassword,
        role: Role.wali_kelas
    },
  })

  // 4. Guru
  await prisma.guru.create({
    data: {
        username: 'mateo',
        nip: '197911202004011025',
        mapel: 'Math',
        password: commonPassword,
        role: Role.guru
    },
  })

  console.log(chalk.greenBright('Seeding finished successfully!'))
}

seed()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })