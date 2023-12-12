'use client';
import ExpDialog from './ExpDialog';
import { Checkbox } from '@/components';

export default function Home() {
  return (
    <main className="">
      <ExpDialog />
      <Checkbox
        id="label"
        label="This is new label"
        onCheckedChange={(o) => {
          console.warn('checked?', o);
        }}
      />
    </main>
  );
}
