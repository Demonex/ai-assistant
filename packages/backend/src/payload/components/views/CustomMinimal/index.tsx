import React from 'react'

import Button from '@stigma-io/payload/dist/admin/components/elements/Button'
// As this is the demo project, we import our dependencies from the `src` directory.
import MinimalTemplate from '@stigma-io/payload/dist/admin/components/templates/Minimal'
import { useConfig } from '@stigma-io/payload/dist/admin/components/utilities/Config'

// In your projects, you can import as follows:
// import { MinimalTemplate } from '@stigma-io/payload/components/templates';
// import { Button } from '@stigma-io/payload/components/elements';
// import { useConfig } from '@stigma-io/payload/components/utilities';

import './index.scss'

const baseClass = 'custom-minimal-view'

const CustomMinimalView: React.FC = () => {
  const {
    routes: { admin: adminRoute },
  } = useConfig()

  return (
    <MinimalTemplate className={baseClass}>
      <div className={`${baseClass}__content`}>
        <h1>Custom Admin View</h1>
        <p>Here is a custom admin view that was added in the Payload config.</p>
        <div className={`${baseClass}__controls`}>
          <Button className={`${baseClass}__login-btn`} el="link" to={`${adminRoute}/login`}>
            Go to Login
          </Button>
          <Button buttonStyle="secondary" el="link" to={`${adminRoute}`}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    </MinimalTemplate>
  )
}

export default CustomMinimalView
