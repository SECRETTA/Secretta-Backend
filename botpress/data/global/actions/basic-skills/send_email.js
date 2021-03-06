//CHECKSUM:b36a7620453588ade2ea28318667ea97b85a9847f01e5316804e7072b98a2883
const _ = require('lodash')
const nodemailer = require('nodemailer')
const Promise = require('bluebird')

/**
 * @hidden true
 */

const getTransport = async botId => {
  const config = await bp.config.getModuleConfigForBot('basic-skills', botId)

  if (!config || !config.transportConnectionString || config.transportConnectionString === '<<change me>>') {
    throw new Error(
      `You must configure the "basic-skills" module with valid SMTP credentials to send emails. Please see 'global/config/basic-skills.json'.`
    )
  }

  return config.transportConnectionString
}

const extractTextFromPayloads = (payloads, text_msg_type='text') => {
  const text = _.get(payloads.find(p => p.type === text_msg_type), 'text', '')
  return text.replace('(missing translation) ', '').replace(/([A-Z0-9_ -]+: )/gi, '')
}

const sendEmail = async () => {
  try {
    const transport = await getTransport(event.botId)
    const transporter = nodemailer.createTransport(transport)

    const params = {
      event,
      user: _.get(event, 'state.user', {}),
      session: _.get(event, 'state.session', {}),
      temp: _.get(event, 'state.temp', {}),
      bot: _.get(event, 'state.bot', {})
    }

    const renderedSubject = await bp.cms.renderElement('!' + args.subjectElement, params, event)
    const renderedContent = await bp.cms.renderElement('!' + args.contentElement, params, event)

    const text_msg_type = event.channel === 'teams' ? 'message' : 'text'
    const subject = extractTextFromPayloads(renderedSubject, text_msg_type)
    const content = extractTextFromPayloads(renderedContent, text_msg_type)

    const mailOptions = {
      from: args.fromAddress,
      to: args.toAddress,
      cc: args.ccAddress,
      bcc: args.bccAddress,
      subject: subject,
      text: content,
      html: content
    }

    await Promise.fromCallback(cb => transporter.sendMail(mailOptions, cb))
    event.state.temp.success = true
  } catch (error) {
    event.state.temp.success = false
    event.state.temp.onErrorFlowTo = '#'

    throw error
  }
}

return sendEmail()
