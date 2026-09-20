import React from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function DynamicTable({ 
  columns = [], 
  data = [], 
  actions = {}, 
  emptyMessage = "No tutors found." 
}) {
  if (!data || data.length === 0) {
    return (
      <div className="w-full p-8 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 mx-auto bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 rounded-full flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">No Tutors Available</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  const hasActions = actions && (actions.onView || actions.onEdit || actions.getEditPath || actions.onDelete);

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
      <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-xs text-left text-slate-700 dark:text-slate-300">
        <thead className="bg-slate-50 dark:bg-slate-800/60 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <tr>
            {columns.map((col) => (
              <th key={col.key} scope="col" className="px-5 py-3.5">
                {col.label}
              </th>
            ))}
            {hasActions && (
              <th scope="col" className="px-5 py-3.5 text-center">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {data.map((row, rowIndex) => (
            <tr key={row._id || row.id || rowIndex} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
              {columns.map((col) => (
                <td key={col.key} className="px-5 py-3.5 whitespace-nowrap">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
              {hasActions && (
                <td className="px-5 py-3.5 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    
                    {/* View Action */}
                    {actions.onView && (
                      <div className="relative group flex items-center justify-center">
                        {typeof actions.onView === 'function' ? (
                          <button
                            onClick={() => actions.onView(row)}
                            className="p-1.5 text-slate-500 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors inline-flex items-center justify-center"
                            aria-label="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        ) : (
                          <Link 
                            href={`/tutors/${row._id || row.id}`}
                            className="p-1.5 text-slate-500 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors inline-flex items-center justify-center"
                            aria-label="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        )}
                        <span className="absolute bottom-full mb-1.5 hidden group-hover:flex flex-col items-center z-20 pointer-events-none">
                          <span className="bg-slate-900 dark:bg-slate-800 text-white text-[10px] rounded py-1 px-2 whitespace-nowrap shadow-lg">
                            View Details
                          </span>
                          <span className="w-1.5 h-1.5 -mt-1 rotate-45 bg-slate-900 dark:bg-slate-800"></span>
                        </span>
                      </div>
                    )}

                    {/* Edit Action */}
                    {(actions.onEdit || actions.getEditPath) && (
                      <div className="relative group flex items-center justify-center">
                        {actions.onEdit ? (
                          <button
                            onClick={() => actions.onEdit(row)}
                            className="p-1.5 text-slate-500 hover:text-amber-600 dark:text-slate-400 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-lg transition-colors inline-flex items-center justify-center"
                            aria-label="Edit Tutor"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        ) : (
                          <Link
                            href={actions.getEditPath ? actions.getEditPath(row) : '#'}
                            className="p-1.5 text-slate-500 hover:text-amber-600 dark:text-slate-400 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-lg transition-colors inline-flex items-center justify-center"
                            aria-label="Edit Tutor"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                        )}
                        <span className="absolute bottom-full mb-1.5 hidden group-hover:flex flex-col items-center z-20 pointer-events-none">
                          <span className="bg-slate-900 dark:bg-slate-800 text-white text-[10px] rounded py-1 px-2 whitespace-nowrap shadow-lg">
                            Edit Tutor
                          </span>
                          <span className="w-1.5 h-1.5 -mt-1 rotate-45 bg-slate-900 dark:bg-slate-800"></span>
                        </span>
                      </div>
                    )}

                    {/* Delete Action */}
                    {actions.onDelete && (
                      <div className="relative group flex items-center justify-center">
                        <button
                          onClick={() => actions?.onDelete(row)}
                          className="p-1.5 text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors inline-flex items-center justify-center"
                          aria-label="Delete Tutor"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <span className="absolute bottom-full mb-1.5 hidden group-hover:flex flex-col items-center z-20 pointer-events-none">
                          <span className="bg-slate-900 dark:bg-slate-800 text-white text-[10px] rounded py-1 px-2 whitespace-nowrap shadow-lg">
                            Delete Entry
                          </span>
                          <span className="w-1.5 h-1.5 -mt-1 rotate-45 bg-slate-900 dark:bg-slate-800"></span>
                        </span>
                      </div>
                    )}

                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}