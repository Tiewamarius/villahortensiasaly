import { Head } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import HotelLinkWidget from '../Components/HotelLinkWidget';
import Header from '../Components/Header';

export default function Reservation() {
    return (
        <MainLayout>
            <Head title="Réservation" />
            <Header/>
            <HotelLinkWidget />
        </MainLayout>
    );
}