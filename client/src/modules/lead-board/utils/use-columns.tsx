import { Button } from '@/components/custom/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { LeadBoardResponse } from '@/models/lead-board';



export default function useColumns() {

    //Datatable columns
    const columns: ColumnDef<LeadBoardResponse>[] = [
        {
            accessorKey: 'userId',
            id: 'userId',
            enableColumnFilter: true,
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className='pl-0'
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        ID
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: 'name',
            id: 'name',
            enableColumnFilter: true,
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className='pl-0'
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => row.original?.name || '-'
        },
        {
            accessorKey: 'points',
            id: 'points',
            enableColumnFilter: true,
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className='pl-0'
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        Points
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => row.original?.points || '0'
        },
        {
            accessorKey: 'rank',
            id: 'rank',
            enableColumnFilter: true,
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className='pl-0'
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        Rank
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                row.original?.rank ? <p className='font-semibold'>#{row.original?.rank}</p> : '-'
            )
        }
       ];

    return columns;
}
