'use client'

import { PermissionProfileFormInputNameComponent } from './permission-profile-form-input-name.component'
import { PermissionProfileFormSubmitComponent } from './permission-profile-form-submit.component'
import { PermissionProfileFormComponent } from './permission-profile-form.component'
import { PermissionProfileFormInputFeaturesComponent } from './permission-profile-form-input-features.component'
import { PermissionProfileFormInputDescriptionComponent } from './permission-profile-form-input-description.component'

export const PermissionProfileForm = {
  Form: PermissionProfileFormComponent,
  Submit: PermissionProfileFormSubmitComponent,
  Input: {
    Name: PermissionProfileFormInputNameComponent,
    Description: PermissionProfileFormInputDescriptionComponent,
    Features: PermissionProfileFormInputFeaturesComponent
  }
}
