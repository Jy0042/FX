import { ColumnDef, getCoreRowModel, useReactTable, flexRender, Row } from '@tanstack/react-table';
import styled from '@emotion/styled';
import { Fragment } from 'react';

const Table = () => {
  const headers = [
    {
      text: 'Name',
      value: 'name',
    },
    {
      text: 'Version',
      value: 'version',
    },
    {
      text: 'Launch Date',
      value: 'launch',
    },
  ];

  const items = [
    {
      name: 'React',
      version: '18.2.0',
      launch: '2013-05-29',
    },
    {
      name: 'Vue',
      version: '3.2.45',
      launch: '2014-02',
    },
    {
      name: 'jQuery',
      version: '3.3',
      disabled: true,
      launch: '2006-08-26',
    },
    {
      name: 'Svelte',
      version: '3.53.1',
      launch: '2016-11-26',
    },
  ];

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header.text}>
              {header.text} {/* 컬럼명 바인딩 */}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{/* TODO 테이블 데이터 바인딩 */}</tbody>
    </table>
  );
};

export default Table;
