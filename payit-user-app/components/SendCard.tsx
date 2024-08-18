"use client";
import { Button } from "../@/shad/ui/button";
import { TextInput } from "./TextInput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransaction";
import * as React from "react";
import { Check, Loader2 } from "lucide-react";
import { cn } from "../@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../@/shad/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../@/shad/ui/popover";
import { Label } from "../@/shad/ui/label";
import { useToast } from "../@/shad/ui/use-toast";

export function SendCard({ alluser }: any) {
  let frameworks = alluser;
  const [amount, setAmount] = useState("");
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");
  const { toast } = useToast();
  const [loading, isLoading] = useState<boolean>(false);

  const filteredFrameworks = inputValue
    ? frameworks.filter((framework: any) =>
        framework.label.includes(inputValue)
      )
    : [];

  return (
    <div className="bg-white border rounded-xl p-8">
      <div className="min-w-72 pt-2 space-y-2">
        <div>
          <div className="text-2xl font-bold antialiased mb-2">
            Send Money To User
          </div>
          <div className="text-sm text-slate-600 antialiased">
            Verified Users Will Receive Money
          </div>
        </div>
        <div>
          <div className="mb-2">
            <Label>Number</Label>
          </div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {value
                  ? frameworks.find(
                      (framework: any) => framework.value === value
                    )?.label
                  : "Phone Number..."}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit p-0">
              <Command>
                <CommandInput
                  placeholder="Phone Number..."
                  value={inputValue}
                  onValueChange={(input) => setInputValue(input)}
                />
                <CommandList>
                  {filteredFrameworks.length == 0 ? (
                    <CommandEmpty>No Users Found</CommandEmpty>
                  ) : (
                    <CommandGroup>
                      {filteredFrameworks.map((framework: any) => (
                        <CommandItem
                          key={framework.value}
                          value={framework.value}
                          onSelect={(currentValue: any) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === framework.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {framework.name} {" - "} {framework.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <TextInput
          type={"number"}
          placeholder={"Amount"}
          label="Amount"
          onChange={(value) => {
            setAmount(value);
          }}
        />
        <div className="pt-4 flex justify-center">
          <Button
            disabled={loading}
            className="bg-black w-full text-white hover:bg-gray-700"
            onClick={async () => {
              if (Number(amount) > 0 && value) {
                isLoading(true);
                const res = await p2pTransfer(value, Number(amount));
                if (res.message) {
                  // do thing
                  toast({
                    title: "Money Transferred Successfully ✅",
                  });
                  isLoading(false);
                } else {
                  isLoading(false);
                  toast({
                    variant: "destructive",
                    title: "Error Occured ❌",
                    description:
                      "Please Enter the Neccessary Details for P2P Transfer",
                  });
                }
              } else {
                isLoading(false);
                toast({
                  variant: "destructive",
                  title: "Please Enter The Valid Details to Proceed Further",
                });
              }
            }}
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ""}
            {loading ? "Transferring ... " : "Send Money"}
          </Button>
        </div>
      </div>
    </div>
  );
}
