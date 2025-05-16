"use client"
import { useForm } from 'react-hook-form';
import { UserSettingsSchema } from '@/lib/zod';
import z from 'zod';
import { updateSettingsActions } from '@/actions/settings';
import { useAction } from 'next-safe-action/hooks';
import { Loader2 } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Toaster } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardTitle, CardHeader } from "@/components/ui/card";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { user } from '@/db/schema';

type UserProps = z.infer<typeof UserSettingsSchema>;


const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})


export default function SettingsForm(userSettings: UserProps) {
    const form = useForm({
        defaultValues: {
            pronouns: userSettings.pronouns || "",
            firstName: userSettings.firstName || "",
            lastName: userSettings.lastName || "",
        }
    });


    const { execute, status } = useAction(updateSettingsActions, {
        onSuccess: ({ }) => {
            console.log("Updated Succesfuly")
        },
        onError: (error) => {
            <Toaster className="error"></Toaster>

        }
    })
    const isLoading = status === "executing"

   


    return (
        <div>
            <form onSubmit={form.handleSubmit((data) => {

                execute(data)

            })}>
                    <Card className='w-[300px] rounded-5 px-3 py-1 sm:flex-column'>
                        {/* <CardHeader>
                            <CardTitle className="text-2xl font-black">Settings</CardTitle>
                        </CardHeader> */}

                        <Form {...form}>
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem className='grid gap-4'>
                                        <div className='max-w-sm '>
                                            <FormLabel className='text-1xl font-black flex'>First Name</FormLabel>
                                            <FormControl>
                                                <Input className='w-50 bg-background' {...field} />
                                            </FormControl>
                                        </div>

                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem className='grid gap-4'>
                                        <div className='max-w-sm '>
                                            <FormLabel className='text-1xl font-black flex'>Last Name</FormLabel>
                                            <FormControl>
                                                <Input className='w-50 bg-background' {...field} />
                                            </FormControl>
                                        </div>

                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="pronouns"
                                render={({ field }) => (
                                    <FormItem className='grid gap-4'>
                                        <div className='max-w-sm '>
                                            <FormLabel className='text-1xl font-black flex'>Pronouns</FormLabel>
                                            <FormControl>
                                                <Input className='w-50 bg-background' {...field} />
                                            </FormControl>
                                        </div>

                                    </FormItem>
                                )}
                            />

                        </Form>
                        <Button type="submit" className='w-50 mt-4'>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Update"}
                        </Button>
                    </Card>


            </form>
        </div >
    )
}