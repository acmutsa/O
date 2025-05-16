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

type UserProps = z.infer<typeof UserSettingsSchema>;


const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})

export function ProfileForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    })
}

export default function SettingsForm(userSettings: UserProps) {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            ...userSettings
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

    const form = useForm()







    return (
        <div>
            <form onSubmit={handleSubmit((data) => {

                execute(data)

            })}>
                {/* <input {...register("firstName", { required: true })} placeholder='First name' />
                <input {...register("lastName", { required: true, minLength: 4 })} placeholder='Last Name' />
                <input {...register("pronouns", { required: true })} placeholder='They/Them' /> */

                    // <div className='items-center justify-center'>
                    //     <Label>First Name</Label>
                    //     <Input {...register("firstName")} placeholder="First Name" className='w-50'></Input>

                    //     <Label>Last Name</Label>
                    //     <Input {...register("lastName")} placeholder="Last Name" className='w-100'></Input>

                    //     <Label>Pronouns</Label>
                    //     <Input {...register("pronouns")} placeholder="They/Them" className='w-50'></Input>
                    // </div>
                    <Card className='w-[300px] rounded-5 bg-blue-50 px-3 py-1 sm:flex-column'>
                        <CardHeader>
                            <CardTitle className="text-2xl font-black">Settings</CardTitle>
                        </CardHeader>

                        <Form {...form}>
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem className='grid gap-4'>
                                        <div className='max-w-sm '>
                                            <FormLabel className='text-1xl font-black flex'>First Name</FormLabel>
                                            <FormControl>
                                                <Input {...register("firstName")} placeholder={userSettings.firstName} className='w-50 bg-background' {...field} />
                                            </FormControl>
                                        </div>
                                        <div>
                                            <FormLabel className='text-1xl font-black'>Last Name</FormLabel>
                                            <FormControl>
                                                <Input {...register("lastName")} placeholder={userSettings.lastName} className='w-100 bg-background' {...field} />
                                            </FormControl>

                                        </div>
                                        <div>
                                            <FormLabel className='text-1xl font-black'>Pronouns</FormLabel>
                                            <FormControl>
                                                <Input {...register("pronouns")} placeholder={userSettings.pronouns} className='w-50 bg-background' {...field} />
                                            </FormControl>

                                        </div>
                                        <div className='px-20'>
                                            {isLoading ? (<Loader2 className="animate-spin" />) : (<Button type="submit" className='border'>Submit</Button>)}
                                        </div>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </Form>
                    </Card>


                    //

                }



            </form>
        </div >
    )
}