import { createApp } from 'vue'
import { CellStyleModule, ClientSideRowModelModule, ModuleRegistry, ValidationModule } from 'ag-grid-community'
import { TreeDataModule } from 'ag-grid-enterprise'
import App from './App.vue'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import './style.css'

ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    CellStyleModule,
    TreeDataModule,
    ...(import.meta.env.DEV ? [ValidationModule] : []),
])

createApp(App).mount('#app')
