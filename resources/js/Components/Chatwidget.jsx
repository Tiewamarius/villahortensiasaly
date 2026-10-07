import { useCallback, useEffect, useRef, useState } from "react";
import { FaCommentDots, FaXmark, FaPaperPlane } from "react-icons/fa6";
import "./css/ChatWidget.css";

const WELCOME = {
    role: "assistant",
    content:
        "Bonjour ! Je suis l'assistant de la Résidence Néhémie. Je peux vous renseigner sur les appartements, la restauration et les réservations.",
};

const SUGGESTIONS = [
    "Quels appartements proposez-vous ?",
    "Que propose la restauration ?",
    "Comment réserver ?",
];

const getCookie = (name) => {
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : "";
};

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([WELCOME]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const listRef = useRef(null);
    const inputRef = useRef(null);
    const launcherRef = useRef(null);
    const wasOpen = useRef(false);

    /* Scroll en bas à chaque nouveau message */
    useEffect(() => {
        const el = listRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [messages, loading, open]);

    /* Focus : champ de saisie à l'ouverture, bouton à la fermeture */
    useEffect(() => {
        if (open) inputRef.current?.focus();
        else if (wasOpen.current) launcherRef.current?.focus();
        wasOpen.current = open;
    }, [open]);

    /* Échap ferme le chat */
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && setOpen(false);
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open]);

    const send = useCallback(
        async (text) => {
            const content = text.trim();
            if (!content || loading) return;

            const next = [...messages, { role: "user", content }];
            setMessages(next);
            setInput("");
            setLoading(true);

            try {
                const response = await fetch("/chat", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
                    },
                    // On n'envoie pas le message d'accueil local
                    body: JSON.stringify({ messages: next.slice(1) }),
                });

                if (!response.ok) throw new Error("Erreur serveur");
                const data = await response.json();

                setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
            } catch {
                setMessages((m) => [
                    ...m,
                    {
                        role: "assistant",
                        content:
                            "Une erreur est survenue. Réessayez dans un instant ou contactez-nous par téléphone.",
                        error: true,
                    },
                ]);
            } finally {
                setLoading(false);
            }
        },
        [messages, loading],
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        send(input);
    };

    return (
        <>
            <section
                id="chat-panel"
                className={`chat-panel ${open ? "open" : ""}`}
                role="dialog"
                aria-label="Discussion avec l'assistant"
                aria-hidden={!open}
            >
                <div className="chat-head">
                    <div>
                        <strong>Assistant Néhémie</strong>
                        <span>Réponse immédiate</span>
                    </div>
                    <button
                        type="button"
                        className="chat-close"
                        aria-label="Fermer la discussion"
                        onClick={() => setOpen(false)}
                    >
                        <FaXmark aria-hidden="true" />
                    </button>
                </div>

                <div className="chat-messages" ref={listRef} aria-live="polite">
                    {messages.map((m, i) => (
                        <div key={i} className={`chat-msg ${m.role}${m.error ? " error" : ""}`}>
                            {m.content}
                        </div>
                    ))}

                    {loading && (
                        <div className="chat-msg assistant chat-typing" aria-label="L'assistant écrit">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    )}

                    {messages.length === 1 && !loading && (
                        <div className="chat-suggestions">
                            {SUGGESTIONS.map((s) => (
                                <button key={s} type="button" onClick={() => send(s)}>
                                    {s}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <form className="chat-form" onSubmit={handleSubmit}>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Écrivez votre message…"
                        aria-label="Votre message"
                        maxLength={500}
                        disabled={loading}
                    />
                    <button type="submit" aria-label="Envoyer" disabled={loading || !input.trim()}>
                        <FaPaperPlane aria-hidden="true" />
                    </button>
                </form>
            </section>

            <button
                ref={launcherRef}
                type="button"
                className="hero__whatsapp"
                aria-label={open ? "Fermer la discussion" : "Discuter avec l'assistant"}
                aria-expanded={open}
                aria-controls="chat-panel"
                onClick={() => setOpen((o) => !o)}
            >
                {open ? <FaXmark aria-hidden="true" /> : <FaCommentDots aria-hidden="true" />}
            </button>
        </>
    );
}