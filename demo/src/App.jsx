import React from 'react'
import { HashRouter } from 'react-router-dom'
import RouteView from './route'



export default function App() {
  return (
    <HashRouter>
      <RouteView />
      {/* 如果有底部导航菜单 可以放在这里 */}
    </HashRouter>
  )
}
