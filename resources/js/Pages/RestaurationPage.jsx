import { Head } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import Restauration from '../Components/Restauration';'../Components/Restauration';
import Header from '../Components/Header';

export default function RestaurationPage() {
    return (
        <MainLayout>
            <Head title="RESTAURATION" />
            <Header/>
            <Restauration />
        </MainLayout>
    );
}