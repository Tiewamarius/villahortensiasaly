
import MainLayout from '../Layouts/MainLayout';
import Hero from "../Components/Hero";
import Amenities from "../Components/Amenities";
import AboutResidence from "../Components/AboutResidence";

import AppartSection from "../Components/AppartSection";
import Footer from "../Components/Footer";

export default function Home() {
    return (
        <>
            <MainLayout>
                <main>
                    <Hero />

                    <div id="content">
                        <Amenities />
                        <AboutResidence />
                        <AppartSection />
                    </div>

                    {/* Les prochaines sections viendront ici */}
                </main>
            </MainLayout>
        </>
    );
}
