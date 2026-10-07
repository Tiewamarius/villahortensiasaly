
import { Link } from "@inertiajs/react";
import { FaHome, FaArrowLeft, FaSearch } from "react-icons/fa";

import "./../../Components/css/HttpError.css";

const ERROR_CONTENT = {
    403: {
        title: "Accès non autorisé",
        description:
            "Vous ne disposez pas des autorisations nécessaires pour accéder à cette page.",
    },
    404: {
        title: "Page introuvable",
        description:
            "La page que vous recherchez n'existe pas ou a été déplacée.",
    },
    419: {
        title: "Session expirée",
        description:
            "Votre session a expiré. Veuillez actualiser la page et réessayer.",
    },
    429: {
        title: "Trop de requêtes",
        description:
            "Vous effectuez trop de requêtes. Veuillez patienter quelques instants.",
    },
    500: {
        title: "Une erreur est survenue",
        description:
            "Nous rencontrons actuellement un problème technique. Notre équipe travaille à sa résolution.",
    },
    503: {
        title: "Service temporairement indisponible",
        description:
            "Le site est momentanément indisponible. Merci de revenir dans quelques instants.",
    },
};

export default function Http({ status = 404 }) {
    const error = ERROR_CONTENT[status] || ERROR_CONTENT[500];

    return (
        <main className="http-error">

            <div className="http-error__content">

                <Link href="/" className="http-error__logo">
                    <img
                        src="/img/logo.png"
                        alt="Résidence Néhémie"
                    />
                </Link>

                <span className="http-error__code">
                    {status}
                </span>

                <span className="http-error__eyebrow">
                    Oups ! Une petite interruption
                </span>

                <h1>{error.title}</h1>

                <p>{error.description}</p>

                <div className="http-error__actions">

                    <Link href="/" className="http-error__primary">
                        <FaHome />
                        Retour à l'accueil
                    </Link>

                    <button
                        type="button"
                        className="http-error__secondary"
                        onClick={() => window.history.back()}
                    >
                        <FaArrowLeft />
                        Page précédente
                    </button>

                </div>

                <div className="http-error__help">
                    <FaSearch />
                    <span>
                        Vous pouvez également découvrir nos appartements
                        et préparer votre prochain séjour.
                    </span>
                </div>

                <Link
                    href="/rooms"
                    className="http-error__rooms"
                >
                    Découvrir nos appartements
                </Link>

            </div>

            <div className="http-error__footer">
                © {new Date().getFullYear()} Résidence Néhémie.
                Tous droits réservés.
            </div>

        </main>
    );
}