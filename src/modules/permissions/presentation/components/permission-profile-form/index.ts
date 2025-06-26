'use client'

import { PermissionProfileFormInputNameComponent } from './permission-profile-form-input-name.component'
import { PermissionProfileFormInputEnabledComponent } from './permission-profile-form-input-enabled.component'
import { PermissionProfileFormSubmitComponent } from './permission-profile-form-submit.component'
import { PermissionProfileFormComponent } from './permission-profile-form.component'
import { PermissionProfileFormInputFeaturesComponent } from './permission-profile-form-input-features.component'

export const PermissionProfileForm = {
  Form: PermissionProfileFormComponent,
  Submit: PermissionProfileFormSubmitComponent,
  Input: {
    Name: PermissionProfileFormInputNameComponent,
    Features: PermissionProfileFormInputFeaturesComponent,
    Enabled: PermissionProfileFormInputEnabledComponent
  }
}
