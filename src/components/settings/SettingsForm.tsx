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

type UserProps = z.infer<typeof UserSettingsSchema>;


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
        onError: ({ }) => {
            <Toaster></Toaster>

        }
    })
    const isLoading = status === "executing"





    return (
        <div>
            <form onSubmit={handleSubmit((data) => {

                execute(data)

            })}>
                {/* <input {...register("firstName", { required: true })} placeholder='First name' />
                <input {...register("lastName", { required: true, minLength: 4 })} placeholder='Last Name' />
                <input {...register("pronouns", { required: true })} placeholder='They/Them' /> */

                    <div className='items-center justify-center'>
                        <Label>First Name</Label>
                        <Input {...register("firstName")} placeholder="First Name" className='w-50'></Input>

                        <Label>Last Name</Label>
                        <Input {...register("lastName")} placeholder="Last Name" className='w-100'></Input>

                        <Label>Pronouns</Label>
                        <Input {...register("pronouns")} placeholder="They/Them" className='w-50'></Input>
                    </div>

                }

                {isLoading ? (<Loader2 className="animate-spin" />) : (<Button type="submit" className='border'>Submit</Button>)}

            </form>
        </div>
    )
}