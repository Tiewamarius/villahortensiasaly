import Header from "../Components/Header";
import Footer from "../Components/Footer";
import MapSection from '../Components/MapSection';
import ChatWidget from "../Components/Chatwidget";

export default function MainLayout({ children }) {
    return (
        <div className="knsl-app">
            <Header />

            <main className="knsl-main">
                {/* WhatsApp */}
                {/* <ChatWidget /> */}
                {children}
            </main>
            <MapSection />
            <Footer />
        </div>
    );
}
