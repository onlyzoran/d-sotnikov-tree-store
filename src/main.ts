import { createApp } from 'vue'
import { ModuleRegistry } from 'ag-grid-community'
import { TreeDataModule, LicenseManager } from 'ag-grid-enterprise'
import App from './App.vue'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

ModuleRegistry.registerModules([TreeDataModule])
LicenseManager.setLicenseKey(
    '[TRIAL]_this_is_a_trial_key_for_evaluation_only___Contact_info@ag-grid.com_for_a_valid_license___',
)

createApp(App).mount('#app')
