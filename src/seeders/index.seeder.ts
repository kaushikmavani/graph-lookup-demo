import { exec } from "child_process"

const seeders = ["./dist/seeders/admin.seeder.js"]

seeders.forEach((seeder) => {
  exec(`node ${seeder}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error in ${seeder}:\n${stderr}`)
    } else {
      console.log(`✅ Ran ${seeder}:\n${stdout}`)
    }
  })
})
