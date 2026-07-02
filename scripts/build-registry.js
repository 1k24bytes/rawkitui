import fs from 'fs'
import path from 'path'

const rootDir = process.cwd()
const registryPath = path.join(rootDir, 'registry.json')
const publicRDir = path.join(rootDir, 'public', 'r')
const distRDir = path.join(rootDir, 'dist', 'r')

// Ensure target directories exist
if (!fs.existsSync(publicRDir)) {
  fs.mkdirSync(publicRDir, { recursive: true })
}

const registryData = JSON.parse(fs.readFileSync(registryPath, 'utf8'))

// Generate master index.json
fs.writeFileSync(path.join(publicRDir, 'index.json'), JSON.stringify(registryData, null, 2))
console.log(`Generated master registry index: public/r/index.json`)

// Generate individual component JSON items
registryData.items.forEach((item) => {
  const itemFiles = item.files.map((file) => {
    const content = fs.readFileSync(path.join(rootDir, file.path), 'utf8')
    return {
      path: file.target,
      content: content,
      type: file.type
    }
  })

  const outputPayload = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    dependencies: item.dependencies || [],
    files: itemFiles
  }

  const outputPath = path.join(publicRDir, `${item.name}.json`)
  fs.writeFileSync(outputPath, JSON.stringify(outputPayload, null, 2))
  console.log(`Generated registry item: public/r/${item.name}.json`)
})

// If dist folder exists, copy public/r/* to dist/r/*
if (fs.existsSync(path.join(rootDir, 'dist'))) {
  if (!fs.existsSync(distRDir)) {
    fs.mkdirSync(distRDir, { recursive: true })
  }
  fs.cpSync(publicRDir, distRDir, { recursive: true })
  console.log(`Copied registry output to dist/r/`)
}

console.log(`✅ Shadcn registry build complete! (${registryData.items.length} items)`)
