import { spawn } from 'node:child_process'

let testFile = ''

// The path to node is always arg[0]. The path to this file is always arg[1]. If we have an arg[2] it'll be the
// $relativeFile value passed on from VSCode or one specified on the command line
if (process.argv.length > 2) {
  let relativeFile = process.argv[2]

  // If we have a test file do not manipulate anything
  if (relativeFile.endsWith('.test.js')) {
    testFile = relativeFile

    // Else if we have a .js file that starts with app/ there is a good chance we can find the matching test file
  } else if (relativeFile.endsWith('.js') && relativeFile.startsWith('app/')) {
    relativeFile = relativeFile.replace('app/', 'test/')
    relativeFile = relativeFile.replace('.js', '.test.js')

    testFile = relativeFile
  }
}

// We use spawn() over exec() so that output from Ava and C8 is immediately relayed. If we used exec() you have to wait
// till the process has finished before you get the output returned.
//
// The args to spawn() are to retain the colour and formatting c8 and Ava uses. Normally you use command.on('data`) to
// handle the output. If you do though you'll get an error because output is already being handled by `process` due to
// us telling `spawn()` to inherit stdio.
const command = spawn('c8', ['ava', testFile], { shell: true, stdio: 'inherit' })

// We get shouted at if we don't handle errors!
command.on('error', (error) => {
  console.error(error)
})

// If we don't call exit() when the spawned process exists VScode or the shell think the tests are still running
command.on('exit', () => {
  process.exit(0)
})
