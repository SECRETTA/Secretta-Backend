//CHECKSUM:aa005dbbdda82940bc48aa8ceea156efa74faa2f231e528e8b10f0de9493aa9c
function extractPayload(type, data) {
  // for channel renderers
  return { type, ..._.pickBy(_.omit(data, 'event', 'temp', 'user', 'session', 'bot', 'BOT_URL'), v => v !== undefined) }
}

module.exports = {
  extractPayload: extractPayload
}
