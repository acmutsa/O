"use client"
import { useForm } from 'react-hook-form';
import { UserSettingsSchema } from '@/lib/zod';
import z from 'zod';
import { updateSettingsActions } from '@/actions/settings';
import { useAction } from 'next-safe-action/hooks';
import { Loader2 } from 'lucide-react';


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
        }
    })
    const isLoading = status === "executing"





    return (
        <div>
            <form onSubmit={handleSubmit((data) => {

                execute(data)

            })}>
                <input {...register("firstName", { required: true })} placeholder='First name' />
                <input {...register("lastName", { required: true, minLength: 4 })} placeholder='Last Name' />
                <input {...register("pronouns", { required: true })} placeholder='They/Them' />

                {isLoading ? (<Loader2 className="animate-spin" />) : (<input type="submit" />)}

            </form>
        </div>
    )
}