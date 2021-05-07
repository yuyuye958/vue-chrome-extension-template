// import { service } from '../utils/request'

let linkedIn_request_headers = []

window.chrome.runtime.onInstalled.addListener(details => {

})

window.chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo['status'] === 'complete') {
    console.log(tabId, tab)
  }
})

/**
 * 获取 LinkedIn 的请求头
 */
window.chrome.webRequest.onBeforeSendHeaders.addListener(details => {
  if (details['initiator'].indexOf('chrome-extension://') !== 0) {
    linkedIn_request_headers = details['requestHeaders']
    // https://www.linkedin.com/sales/people/* 页面的特殊处理，否则返回数据的格式不一样
    const accept_header = linkedIn_request_headers.find(header => header.name === 'Accept')
    if (accept_header) accept_header.value = 'application/vnd.linkedin.normalized+json+2.1'
  }
}, { urls: ['*://www.linkedin.com/voyager/api/*', '*://www.linkedin.com/recruiter/api/*', '*://www.linkedin.com/sales-api/*'] }, ['requestHeaders'])

/**
 * 接收 Content 传来的消息
 */
window.chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  switch (msg['type']) {
    case 'get_linkedIn_profile':
      getLinkedInProfileInfo(msg['id']).then(sendResponse).catch(sendResponse)
      break
    default:
      break
  }
  return true
})

/**
 * 调用 LinkedIn 的接口 获取 Profile
 * @param linkedin_user_id
 * @returns {Promise<any>}
 */
function getLinkedInProfileInfo(linkedin_user_id) {
  if (linkedin_user_id) return fetch(`http://www.linkedin.com/voyager/api/identity/profiles/${linkedin_user_id}/profileView`, { headers: getLinkedInHeaders() })
    .then(response => response.json())
}

function getLinkedInHeaders() {
  let headers = {}
  linkedIn_request_headers.forEach(item => {
    headers[item['name'].toLowerCase()] = item['value']
  })
  return headers
}
