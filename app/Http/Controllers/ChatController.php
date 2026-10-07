<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ChatController extends Controller
{
    private const SYSTEM_PROMPT = <<<'TXT'
Tu es l'assistant virtuel de la Résidence Néhémie, une résidence d'appartements meublés à Bingerville (Côte d'Ivoire).
Réponds en français, de façon chaleureuse, claire et courte (3 à 5 phrases maximum).

Informations que tu peux donner :
- Appartements : consulter la page /rooms pour les types et les tarifs.
- Restauration : petit-déjeuner, déjeuner, dîner et service en appartement (page /restauration).
- Réservation : via la page /reservation, ou par WhatsApp / téléphone au +225 05 00 32 68 68.
- E-mail : info@residencenehemie.com

Règles :
- N'invente jamais un prix, une disponibilité ou un horaire que tu ne connais pas. Dans ce cas, invite le client à appeler ou écrire sur WhatsApp.
- Reste sur le sujet de la résidence. Refuse poliment les autres demandes.
TXT;

    public function send(Request $request): JsonResponse
    {
        $data = $request->validate([
            'messages' => ['required', 'array', 'min:1', 'max:20'],
            'messages.*.role' => ['required', 'in:user,assistant'],
            'messages.*.content' => ['required', 'string', 'max:500'],
        ]);

        // On ne garde que les 12 derniers messages et on ignore les champs inattendus
        $messages = collect($data['messages'])
            ->take(-12)
            ->map(fn ($m) => ['role' => $m['role'], 'content' => $m['content']])
            ->values()
            ->all();

        // L'API exige que la conversation commence par un message "user"
        if (($messages[0]['role'] ?? null) !== 'user') {
            array_shift($messages);
        }

        try {
            $response = Http::withHeaders([
                'x-api-key' => config('services.anthropic.key'),
                'anthropic-version' => '2023-06-01',
            ])
                ->timeout(30)
                ->post('https://api.anthropic.com/v1/messages', [
                    'model' => 'claude-haiku-4-5-20251001',
                    'max_tokens' => 400,
                    'system' => self::SYSTEM_PROMPT,
                    'messages' => $messages,
                ]);

            if ($response->failed()) {
                Log::warning('Chat API error', ['status' => $response->status(), 'body' => $response->body()]);

                return response()->json(['message' => 'Service indisponible'], 502);
            }

            $reply = collect($response->json('content', []))
                ->where('type', 'text')
                ->pluck('text')
                ->implode("\n");

            return response()->json(['reply' => trim($reply)]);
        } catch (\Throwable $e) {
            Log::error('Chat exception', ['error' => $e->getMessage()]);

            return response()->json(['message' => 'Service indisponible'], 502);
        }
    }
}