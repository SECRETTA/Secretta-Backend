//CHECKSUM:cef7d6345b9b3b1c371c2a911d40c74c94113a18f4778a792a3db58ab3acc5b7
const axios = require('axios')

/**
 * Update the session nluContexts for a specific intent
 * @hidden true
 * @param intentName The name of the intent to get contexts from
 */
const updateContexts = async intentName => {
  const botId = event.botId
  const axiosConfig = await bp.http.getAxiosConfigForBot(botId, { localUrl: true })
  const { data } = await axios.get(`/nlu/intents/${intentName}`, axiosConfig)

  const nluContexts = data.contexts.map(context => {
    return {
      context,
      ttl: 1000
    }
  })
  event.state.session.nluContexts = nluContexts
  temp.tryFillSlotCount = 1
  temp.extracted = false
  temp.notExtracted = false
  temp.alreadyExtracted = false
}

return updateContexts(args.intentName)
