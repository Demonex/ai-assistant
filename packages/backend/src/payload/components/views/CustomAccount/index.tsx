import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';

import type {CollectionEditViewProps} from '@stigma-io/payload/dist/admin/components/views/types';

import {DocumentControls} from '@stigma-io/payload/dist/admin/components/elements/DocumentControls';
import {DocumentHeader} from '@stigma-io/payload/dist/admin/components/elements/DocumentHeader';
import {LoadingOverlayToggle} from '@stigma-io/payload/dist/admin/components/elements/Loading';
import Form from '@stigma-io/payload/dist/admin/components/forms/Form';
import {LeaveWithoutSaving} from '@stigma-io/payload/dist/admin/components/modals/LeaveWithoutSaving';
import Meta from '@stigma-io/payload/dist/admin/components/utilities/Meta';
import {OperationContext} from '@stigma-io/payload/dist/admin/components/utilities/OperationProvider';

import {DocumentFields} from '../../DocumentFields';
import {AccountSettings} from './Settings';

import './index.scss';

const baseClass = 'account';

const CustomAccount: React.FC<CollectionEditViewProps> = memo((props) => {
  const {
    action,
    apiURL,
    collection,
    data,
    hasSavePermission,
    initialState,
    isLoading,
    permissions
  } = props;

  const {fields} = collection;

  const {t} = useTranslation('authentication');

  return (
    <React.Fragment>
      <Meta description={t('accountOfCurrentUser')} keywords={t('account')} title={t('account')}/>
      <LoadingOverlayToggle name="account" show={isLoading} type="withoutNav"/>
      {!isLoading && (
        <OperationContext.Provider value="update">
          <Form
            action={action}
            disabled={!hasSavePermission}
            initialState={initialState}
            method="patch"
          >
            {!(collection.versions?.drafts && collection.versions?.drafts?.autosave) && (
              <LeaveWithoutSaving/>
            )}
            <DocumentHeader apiURL={apiURL} collection={collection} data={data}/>
            <DocumentControls
              apiURL={apiURL}
              collection={collection}
              data={data}
              hasSavePermission={hasSavePermission}
              isAccountView
              permissions={permissions}
            />
            <DocumentFields
              AfterFields={() => <AccountSettings className={`${baseClass}__settings`}/>}
              fields={fields}
              hasSavePermission={hasSavePermission}
              permissions={permissions}
            />
          </Form>
        </OperationContext.Provider>
      )}
    </React.Fragment>
  );
});

export default CustomAccount;
