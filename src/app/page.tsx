import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components';

export default function Home() {
  return (
    <main className="">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="primary">open</Button>
        </DialogTrigger>
        <DialogContent size="md" showCloseButton>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when yore done.
          </DialogDescription>
          <DialogTrigger asChild>
            <Button type="submit" className="mt-2">
              Save changes
            </Button>
          </DialogTrigger>
        </DialogContent>
      </Dialog>
    </main>
  );
}
