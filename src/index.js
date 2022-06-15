const core = require('@actions/core')

const enablePages = require('./enable-pages')
const getPagesBaseUrl = require('./get-pages-base-url')

// All variables we need from the runtime are loaded here
const getContext = require('./context')

async function main() {
  try {
    const context = getContext()
    //await enablePages(context)
    await getPagesBaseUrl(context)
  } catch (error) {
    core.setFailed(error)
    process.exit(1)
  }
}


// Main
main()
