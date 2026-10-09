import { Head } from "@inertiajs/react";
import MainLayout from "../Layouts/MainLayout";
import HotelLinkWidget from "../Components/HotelLinkWidget";

export default function Reservation() {
    return (
        <MainLayout>
            <Head title="Réservation" />

            <section className="reservation-page">
                <HotelLinkWidget />
            </section>
        </MainLayout>
    );
}