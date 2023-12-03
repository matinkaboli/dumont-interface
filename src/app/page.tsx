import { Button } from '@/components';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/Dialog';

export default function Home() {
  return (
    <main className="">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="primary">open</Button>
        </DialogTrigger>
        <DialogContent size="md" showCloseButton>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when yore done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">part 1</div>
            <div className="grid grid-cols-4 items-center gap-4">part 2</div>
          </div>
          <DialogFooter>
            <DialogTrigger asChild>
              <Button type="submit">Save changes</Button>
            </DialogTrigger>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
