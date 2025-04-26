import { filterSchema } from "@/validation-schema/lead-board";

import { z } from "zod";
import { Form, FormField, FormItem,  FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Selectable from "@/components/common/dropdown";
import { PERIOD_OPTIONS } from "@/constant/static-data";
import { formattedOptions } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/custom/button";

interface FilterProps {
    form: UseFormReturn<z.infer<typeof filterSchema>>;
    onSubmit: (data: z.infer<typeof filterSchema>) => void;
}

/**
 * @param {FilterProps} props - The props for the Filter component.
 * @returns {React.ReactNode} - The Filter component.
 */
function Filter({ form, onSubmit }: FilterProps) {
        return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {/* Name */}
                    <div className="flex items-center gap-2 w-full">

                        <FormField
                            control={form.control}
                            name="search"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Search by id"
                                        {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    
                    {/* Period */}
                    <FormField
                        control={form.control}
                        name="period"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Selectable
                                        list={formattedOptions(PERIOD_OPTIONS, "_id", "name")}
                                        placeholder="Sort by"
                                        className="w-40"
                                        {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button variant="destructive" onClick={() => {
                        form.reset({
                            search: "",
                            period: {
                                label: "",
                                value: "",
                            },
                        });
                    }}
                    className="text-white">
                        Clear Filter
                    </Button>
                    </div>
                    
                </form>
            </Form>
        </div>
    );
}

export default Filter;
