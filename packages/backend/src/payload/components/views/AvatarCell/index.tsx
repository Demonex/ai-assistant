// @ts-nocheck
import React, {memo, useEffect, useState} from 'react';
import {useConfig} from '@stigma-io/payload/dist/admin/components/utilities/Config';
import useIntersect from '@stigma-io/payload/dist/admin/hooks/useIntersect';
import {
  useListRelationships
} from '@stigma-io/payload/dist/admin/components/views/collections/List/RelationshipProvider';
import {useTranslation} from 'react-i18next';
import {formatUseAsTitle} from '@stigma-io/payload/dist/admin/hooks/useTitle';
import {getTranslation} from '@stigma-io/payload/dist/utilities/getTranslation';
import type {CellComponentProps} from '@stigma-io/payload/dist/admin/components/views/collections/List/Cell/types';
import type {RelationshipField} from '@stigma-io/payload/dist/fields/config/types';
import {Link} from 'react-router-dom';

type Value = { relationTo: string; value: number | string }
const baseClass = 'avatar-cell';
const totalToShow = 3;

export const AvatarCell = memo<CellComponentProps<RelationshipField>>((props) => {
  const {cellData, field, collection, rowData} = props;
  const config = useConfig();
  const {collections, routes} = config;
  const [intersectionRef, entry] = useIntersect();
  const [values, setValues] = useState<Value[]>([]);
  const {documents, getRelationships} = useListRelationships();
  const [hasRequested, setHasRequested] = useState(false);
  const {i18n, t} = useTranslation('general');
  const isAboveViewport = entry?.boundingClientRect?.top < window.innerHeight;

  useEffect(() => {
    if (cellData && isAboveViewport && !hasRequested) {
      const formattedValues: Value[] = [];

      const arrayCellData = Array.isArray(cellData) ? cellData : [cellData];
      arrayCellData
        .slice(0, arrayCellData.length < totalToShow ? arrayCellData.length : totalToShow)
        .forEach((cell) => {
          if (typeof cell === 'object' && 'relationTo' in cell && 'value' in cell) {
            formattedValues.push(cell);
          }
          if (
            (typeof cell === 'number' || typeof cell === 'string') &&
            'relationTo' in field &&
            typeof field.relationTo === 'string'
          ) {
            formattedValues.push({
              relationTo: field.relationTo,
              value: cell
            });
          }
        });
      getRelationships(formattedValues);
      setHasRequested(true);
      setValues(formattedValues);
    }
  }, [cellData, field, collections, isAboveViewport, routes.api, hasRequested, getRelationships]);

  return (
    <Link className={baseClass} ref={intersectionRef}
          to={`${config.routes.admin}/collections/${collection.slug}/${rowData.id}`}>
      {values.map(({relationTo, value}, i) => {
        const document = documents[relationTo][value];
        const relatedCollection = collections.find(({slug}) => slug === relationTo);

        const label = formatUseAsTitle({
          collection: relatedCollection,
          config,
          doc: document === false ? null : document,
          i18n
        });

        return (
          <React.Fragment key={i}>
            {document === false && `${t('untitled')} - ID: ${value}`}
            {document === null && `${t('loading')}...`}
            {document && (
              <img src={(document as any)?.url} width={64} height={64}/> || `${t('untitled')} - ID: ${value}`)}
            {values.length > i + 1 && ', '}
          </React.Fragment>
        );
      })}
      {Array.isArray(cellData) &&
        cellData.length > totalToShow &&
        t('fields:itemsAndMore', {count: cellData.length - totalToShow, items: ''})}
      {values.length === 0 && t('noLabel', {label: getTranslation(field?.label || '', i18n)})}
    </Link>
  );
});
export default AvatarCell;
