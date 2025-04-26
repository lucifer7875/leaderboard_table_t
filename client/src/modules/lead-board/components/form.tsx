import { activitySchema } from '@/validation-schema/lead-board';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/custom/button';
import Selectable from '@/components/common/dropdown';
import { formattedOptions } from '@/lib/utils';
import { ACTIVITY_OPTIONS, PERIOD_OPTIONS } from '@/constant/static-data';
import { useAddActivityMutation, useGetLeadBoardQuery } from '@/services/lead-board';
import { toast } from 'react-toastify';

interface ActivityFormProps {
    readonly handleClose: () => void;
}

/**
 * @param {ActivityFormProps} props - The props for the ActivityForm component.
 * @param {function} handleClose - The function to handle the close event.
 * @returns activity form component
 */
function ActivityForm({ handleClose }: ActivityFormProps) {
/**
 * @description This function is used to get the lead board data.
 */
    const { data, isLoading } = useGetLeadBoardQuery({
        search: "",
        period: "",
    }, {
        selectFromResult: ({ data, ...rest }) => ({
            data: data?.result,
            ...rest,
        }),
    });

    /**
     * @description This function is used to add the activity data.
     */
    const [addActivity] = useAddActivityMutation()

    /**
     * @description This function is used to use the form.
     */
    const form = useForm<z.infer<typeof activitySchema>>({
        resolver: zodResolver(activitySchema),
        defaultValues: {
            name: {
                label: "",
                value: "",
            },
            activity: {
                label: "",
                value: "",
            },
        },
    });

    /**
     * @description This function is used to submit the form.
     */
    const onSubmit = (data: z.infer<typeof activitySchema>) => {
        const payload = {
            userId: data.name.value,
            activity: data.activity.value,
            period: data.period.value,
        }
        addActivity(payload).unwrap().then((res) => {
            console.log(res)
            if (res.success) {
                toast.success(res.message)
                handleClose()
            }
        })
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Name */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex justify-start gap-1.5 items-center mt-5">
                                <FormLabel className="text-sm font-medium">
                                    Name<span className="text-red-500 text-lg" title="required">*</span>
                                </FormLabel>
                            </div>
                            <FormControl>
                                <Selectable
                                    list={formattedOptions(data, "_id", "name")}
                                    placeholder="Select Name"
                                    isLoading={isLoading}
                                    {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Activity */}
                <FormField
                    control={form.control}
                    name="activity"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex justify-start gap-1.5 items-center mt-5">
                                <FormLabel>
                                    Activity<span className="text-red-500 text-lg" title="required">*</span>
                                </FormLabel>
                            </div>
                            <FormControl>
                                <Selectable
                                    list={formattedOptions(ACTIVITY_OPTIONS, "_id", "name")}
                                    placeholder="Select Activity"
                                    {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Period */}
                <FormField
                    control={form.control}
                    name="period"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex justify-start gap-1.5 items-center mt-5">
                                <FormLabel>
                                    Time Period <span className="text-red-500 text-lg" title="required">*</span>
                                </FormLabel>
                            </div>
                            <FormControl>
                                <Selectable
                                    list={formattedOptions(PERIOD_OPTIONS, "_id", "name")}
                                    placeholder="Select time period"
                                    {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <Button type="submit" className="mt-4 w-full">
                    Add
                </Button>
            </form>
        </Form>
    )
}

export default ActivityForm;
