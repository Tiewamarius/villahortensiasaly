import { Head } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import Gallery from '../Components/Gallery';
import Header from '../Components/Header';

export default function Rooms() {
    return (
        <MainLayout>
            <Head title="Nos Appartements" />
            <Header/>
            <Gallery />
        </MainLayout>
    );
}