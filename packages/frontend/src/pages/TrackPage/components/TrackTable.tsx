import React, { memo, useState} from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';
import {useArtistProfile} from '../../ArtistPage/hooks/useArtistProfile.js';
import '../../../index.css'
type Person = {
  id: number
  name: string
  email: string
  phone: string
}
const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor('id', {
    cell: info => info.getValue()
  }),
  columnHelper.accessor('name', {
    cell: info => info.getValue()
  }),
  // you can use different aproach here
  columnHelper.accessor(row => row.email, {
    id: 'email',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Email</span>
  }),
  columnHelper.accessor('phone', {
    header: () => 'Phone',
    cell: info => info.renderValue()
  })
];
const mockData = [
  {
    'id': 1,
    'name': 'John Doe',
    'email': 'johndoe@example.com',
    'phone': '123-456-7890'
  },
  {
    'id': 2,
    'name': 'Jane Smith',
    'email': 'janesmith@example.com',
    'phone': '987-654-3210'
  },
  {
    'id': 3,
    'name': 'Michael Johnson',
    'email': 'michaeljohnson@example.com',
    'phone': '555-123-4567'
  },
  {
    'id': 4,
    'name': 'Emily Wilson',
    'email': 'emilywilson@example.com',
    'phone': '999-888-7777'
  },
  {
    'id': 5,
    'name': 'Daniel Lee',
    'email': 'daniellee@example.com',
    'phone': '444-555-6666'
  },
  {
    'id': 6,
    'name': 'Olivia Martinez',
    'email': 'oliviamartinez@example.com',
    'phone': '777-999-1111'
  },
  {
    'id': 7,
    'name': 'William Thompson',
    'email': 'williamthompson@example.com',
    'phone': '222-333-4444'
  }
];

const TrackTable = memo(() => {
  const [data] = useState(() => mockData);
  const {data: artistData} = useArtistProfile();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className="w-full flex justify-center min-h-[100%] relative mb-[100px]">
      <table className="my-auto border border-gray-700 w-full bg-indigo-200/5 mt-10">
        <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr
            key={headerGroup.id}
            className="border-b border-gray-700 text-gray-300 uppercase">
            {headerGroup.headers.map(header => (
              <th
                key={header.id}
                className="px-4 pr-2 py-4 font-medium text-left">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id} className="border-b border-gray-700">
            {row.getVisibleCells().map(cell => (
              <td key={cell.id} className="px-4 pt-[14px] pb-[18px] text-indigo-500">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
      <div className="w-full h-full absolute backdrop-blur-[10px] z-20 top-0">
        <div className="w-full h-full flex flex-col justify-start items-center gap-2 p-4 mt-[10%]">
          <h1 className=" text-[18px] laptop::text-xl font-bold tracking-tight text-slate-200">Subscribe
            to {artistData?.account?.name} to unlock all stats for this track.</h1>
          <p className="capitalize flex text-xs leading-6 font-semibold text-gray-400 ">Every major playlist, chart
            position and milestone — curated for you to get comprehensive insights into your track performance!
          </p>
          <div className="relative button-wrapper w-fit h-[36px] mt-4 ">
            <button type="button"
                    className="w-full text-white block text-[12px] xl:text-[16px] font-normal p-1.5 bg-[#111827] rounded-[10px] cursor-pointer px-4 h-full">Subscribe
              to {artistData?.account?.name}
            </button>
            <div className="button-bg "></div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default TrackTable;
