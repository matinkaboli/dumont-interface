import { Button, Input } from '@/components';

const Amount = () => {
  return (
   <div className="bg-gradiant-border-amount bg-origin-border border border-transparent rounded-lg w-full h-full">
     <div className="flex flex-col justify-between bg-primary-800 px-4 py-6 rounded-lg w-full h-full">
       <div>
         <Input label="Amount" size="sm" placeholder="Enter amount" />

         <ul className="flex flex-col gap-3 mt-4">
           <li className="flex-between text-sm font-medium">
             <span>Odd</span>
             <span>--</span>
           </li>
           <li className="flex-between text-sm font-medium">
             <span>Total</span>
             <span>--</span>
           </li>
         </ul>
       </div>

       <Button fullWidth size="md" radius="lg" className="!font-semibold">
         Connect Wallet
       </Button>
     </div>
   </div>
  );
};

export default Amount;
