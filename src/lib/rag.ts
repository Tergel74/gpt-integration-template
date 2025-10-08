/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * RAG (Retrieval Augmented Generation) Implementation
 *
 * This file contains placeholder functions for implementing RAG functionality.
 * Uncomment and implement these functions when you need document-based chat.
 *
 * Features to implement:
 * - Document embedding and storage
 * - Semantic search functionality
 * - Context injection for chat responses
 *
 * Requirements:
 * - OpenAI embeddings API
 * - Vector database (Supabase pgvector or Pinecone)
 * - Document processing pipeline
 */

import { supabaseServer } from "./supabaseServer";

export async function saveDocumentVector({
    userId,
    docId,
    text,
    embeddings,
}: {
    userId: string;
    docId: string;
    text: string;
    embeddings: number[]; // or let provider compute
}) {
    // Example for Supabase vector extension:
    // await supabaseServer.from("documents").insert({ user_id: userId, doc_id: docId, content: text, embedding: embeddings });
    throw new Error(
        "Not implemented. See README: how to configure RAG (Supabase/Pinecone)"
    );
}

export async function searchRelevantDocs({
    userId,
    queryEmbedding,
    topK = 5,
}: {
    userId: string;
    queryEmbedding: number[];
    topK?: number;
}) {
    // Query vector DB provider and return array of {content, score}
    throw new Error(
        "Not implemented. See README: how to configure RAG (Supabase/Pinecone)"
    );
}
