import Loader from "@/components/common/loader";
import { useGetLeadBoardQuery, useAddLeadBoardMutation } from "@/services/lead-board";
import { useState } from "react";
import useColumns from "./utils/use-columns";
import { Button } from "@/components/custom/button";
import { Card, CardContent } from "@/components/ui/card";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Calculator } from "lucide-react";
import DataTable from "@/components/common/data-table";
import LeadBoardAddEditPage from "./add-edit";
import Filter from "./filter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { filterSchema } from "@/validation-schema/lead-board";

/**
 * @memberof lead-board
 * @name LeadBoardPage
 * @description LeadBoardPage component renders screen with list of lead-board with option to sort and search fields.
 * @returns {JSX.Element} - The rendered LeadBoardPage component.
 */

function LeadBoardPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState<string | null>(null);
 
  const form = useForm<z.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
        search: "",
        period: {
            label: "",
            value: "",
        },
    },
});


  const { data, isLoading, refetch } = useGetLeadBoardQuery(
    {
      search: form.watch("search"),
      period: form.watch("period")?.value || "",
    },
    {
      selectFromResult: ({ data, ...rest }) => ({
        data: data?.result,
        ...rest,
      }),
      refetchOnMountOrArgChange: true,
    }
  );

  /**
   * @param {z.infer<typeof filterSchema>} data - The data to be submitted.
   * @description This function is used to submit the form.
   */
  function onSubmit(data: z.infer<typeof filterSchema>) {
    refetch();
  }

  /**
   * @param {string | null} id - The id of the lead board.
   * @description This function is used to handle the open event.
   */
  const [addLeadBoard] = useAddLeadBoardMutation();

  /**
   * @param {string | null} id - The id of the lead board.
   * @description This function is used to handle the open event.
   */
  const handleOpen = () => {
    setIsOpen(true);
  }

  /**
   * @description This function is used to handle the close event.
   */
  const handleClose = () => {
    setIsOpen(false);
  }
const handleAddLeadBoard = () => {
    const data = {
      name: "seeder",
    }
    addLeadBoard(data);
  }

  const handleRecalculation = () => {
    refetch();
  }

  const columns = useColumns()

  return (
    <>
      <div className="flex justify-between px-4 py-2 items-center h-[52px]">

        <div className="flex items-center">
          <h1 className="font-semibold text-lg">Leaderboard</h1>
          <Button className='ml-2 flex items-center' variant="default" onClick={handleRecalculation}><Calculator size={15} className='mr-1' />Recalculation</Button>
        </div>
        <div className="flex items-center">
          <Filter form={form} onSubmit={onSubmit}/>
          <Button variant="outline" className='ml-2' onClick={handleAddLeadBoard}>Add Users By Seeder</Button>
          <Button variant="default" className='ml-2' onClick={() => handleOpen()}>Add Users Activity</Button>
        </div>
      </div>
      <Card>
        <CardContent className="p-4">
          {isLoading ? (
            <Loader />
          ) : (
            <DataTable columns={columns} data={data || []} />
          )}
        </CardContent>
      </Card>
      <Drawer direction='right' open={isOpen} onOpenChange={setIsOpen} onClose={handleClose}>
        <DrawerContent className='p-4'>
          <LeadBoardAddEditPage name={"Add"} handleClose={handleClose} />
        </DrawerContent>
      </Drawer>

    </>
  );
}

export default LeadBoardPage;
