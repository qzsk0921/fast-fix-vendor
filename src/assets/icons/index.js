import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon' //svg component

Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requestAll = requestContext => requestContext.keys().map(requestContext)
requestAll(req)