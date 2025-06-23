import React, { useEffect, useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import api from '../../services/api';

const ReferralList = () => {
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;

  const columns = useMemo(
    () => [
      {
        header: 'Parrain',
        accessorFn: row => row.referrer?.email || row.referrer?.username || 'N/A',
        id: 'referrer',
      },
      {
        header: 'Filleuls',
        accessorKey: 'signups',
      },
      {
        header: 'Clics',
        accessorKey: 'clicks',
      },
    ],
    []
  );

  useEffect(() => {
    setLoading(true);
    api
      .get(`/referral/leaderboard?page=${pageIndex + 1}&limit=${pageSize}`)
      .then(res => {
        setData(res.data.items || res.data);
        setPageCount(Math.ceil((res.data.total || res.data.length) / pageSize));
      })
      .finally(() => setLoading(false));
  }, [pageIndex]);

  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    manualPagination: true,
    onPaginationChange: up => {
      if (typeof up === 'function') {
        const next = up({ pageIndex, pageSize });
        setPageIndex(next.pageIndex);
      } else {
        setPageIndex(up.pageIndex);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
  });

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Leaderboard Parrainage</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                Chargement...
              </td>
            </tr>
          ) : table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                Aucun parrain trouvé
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-4 py-2 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          className="btn"
        >
          {'<<'}
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="btn"
        >
          {'<'}
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} sur {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="btn"
        >
          {'>'}
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          className="btn"
        >
          {'>>'}
        </button>
      </div>
    </div>
  );
};

export default ReferralList; 