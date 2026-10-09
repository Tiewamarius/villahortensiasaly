import Header from "../Components/Header";
import Footer from "../Components/Footer";
import MapSection from "../Components/MapSection";
import ChatWidget from "../Components/Chatwidget";

import { BookingProvider } from "../Components/HotelLinkWidget";

export default function MainLayout({ children }) {
    return (
        <BookingProvider>
            <div className="knsl-app">
                <Header />

                <main className="knsl-main">
                    {/* Widget WhatsApp si nécessaire */}
                    {/* <ChatWidget /> */}

                    {children}
                </main>

                <MapSection />

                <Footer />
            </div>
        </BookingProvider>
    );
}