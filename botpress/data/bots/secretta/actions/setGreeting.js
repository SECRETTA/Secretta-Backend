  /**
   * Small description of your action
   * @title The title displayed in the flow editor
   * @category Custom
   * @author Your_Name
   * @param {string} name - An example string variable
   * @param {any} value - Another Example value
   */
  const myAction = async (name, value) => {
    let hour = new Date(Date.now()).getHours()
    if (5 <= hour && hour < 12) {
      var greeting = 'Bom dia'
    } else if (12 <= hour && hour < 18) {
      var greeting = 'Boa tarde'
    } else {
      var greeting = 'Boa noite'
    }

    temp.greeting = `${greeting}, eu sou a Secretta. Como posso te ajudar?`
  }

  return myAction(args.name, args.value)