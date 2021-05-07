// // 通过Chrome插件的API加载字体文件
// (function insertElementIcons() {
//     let elementIcons = document.createElement('style')
//     elementIcons.type = 'text/css';
//     elementIcons.textContent = `
//         @font-face {
//             font-family: "element-icons";
//             src: url('${ window.chrome.extension.getURL("fonts/element-icons.woff")}') format('woff'),
//             url('${ window.chrome.extension.getURL("fonts/element-icons.ttf ")}') format('truetype'); /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
//         }
//     `
//     document.head.appendChild(elementIcons);
// })();

import Vue from 'vue'
import './style.scss'
// import { Button } from 'element-ui'

// Vue.use(Button)

import ContentAPP from './App/App'

Vue.component('content-app', ContentAPP)

// 在target页面中新建一个带有id的dom元素，将vue对象挂载到这个dom上。
function insertContentAPP() {
  let button = document.createElement('div')
  button.id = 'vue-content-app'
  button.innerHTML = '<content-app></content-app>'
  document.body.appendChild(button)
  new Vue({
    el: '#vue-content-app'
  })
}

// 页面加载之后执行插入函数
document.body.onload = insertContentAPP
