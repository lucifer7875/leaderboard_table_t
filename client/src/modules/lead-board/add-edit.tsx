
import { DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { LeadBoardAddEditProps } from '@/models/lead-board';
import ActivityForm from './components/form';

/**
 * @param {string} name - The name of the lead board.
 * @param {function} handleClose - The function to handle the close event.
 * @returns {React.ReactNode} - The lead board add edit page.
 */
function LeadBoardAddEditPage({ name, handleClose }: LeadBoardAddEditProps) {
  return (
    <>
      <DrawerHeader className="pl-0">
        <DrawerTitle>Lead Board</DrawerTitle>
        <DrawerDescription>{name} lead board</DrawerDescription>
      </DrawerHeader>
      <ActivityForm handleClose={handleClose} />
    </>
  );
}

export default LeadBoardAddEditPage;
