
import { Suspense } from 'react';
import UserSettingsPage from '@/components/settings/SettingsPage';

//https://react-hook-form.com/form-builder
//https://playcode.io/react

export default function SettingsPage() {

    return (
        <div>
            <Suspense fallback={<h1>Loading</h1>}><UserSettingsPage /></Suspense>
        </div>
    )


}
