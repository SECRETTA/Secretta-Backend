//CHECKSUM:6c68661dcd33b717b27af1b54a3c547ea74ae7b9f14c63131044f78358621c1e
const URL = require('url').URL
const path = require('path')

function isBpUrl(str) {
  const re = /^\/api\/.*\/bots\/.*\/media\/.*/

  return re.test(str)
}

function isUrl(str) {
  try {
    new URL(str)
    return true
  } catch {
    return false
  }
}

function formatURL(baseUrl, url) {
  if (isBpUrl(url)) {
    return `${baseUrl}${url}`
  } else {
    return url
  }
}

function extractFileName(file) {
  let fileName = path.basename(file)
  if (fileName.includes('-')) {
    fileName = fileName
      .split('-')
      .slice(1)
      .join('-')
  }

  return fileName
}

function extractPayload(type, data) {
  // for channel renderers
  return { type, ..._.pickBy(_.omit(data, 'event', 'temp', 'user', 'session', 'bot', 'BOT_URL'), v => v !== undefined) }
}

module.exports = {
  formatURL: formatURL,
  isUrl: isUrl,
  extractPayload: extractPayload,
  extractFileName: extractFileName
}
