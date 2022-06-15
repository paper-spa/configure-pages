const core = require('@actions/core')
const axios = require('axios')

async function enablePages({ repositoryNwo, githubToken }) {
  const pagesEndpoint = `https://api.github.com/repos/${repositoryNwo}/pages`
  core.info("send request to " + pagesEndpoint)
  core.info("github token is secret" + githubToken)
  try {
    const response = await axios.post(
      pagesEndpoint,  { source: {branch: "main", path: "/"}, build_type: "workflow" },
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `Bearer ${githubToken}`
        },
        validateStatus: false,
      }
    )
    core.info(response)
    console.log(response)
    core.info('Created pages site')
  } catch (error) {
    if (error.response && error.response.status === 409) {
      core.info('Pages site exists')
      return
    }
    if (error.response && error.response.message){
      core.info(error.response.message)
    }
    core.error('Couldn\'t create pages site', error)
    console.log(error)
    throw error
  }
}

module.exports = enablePages
