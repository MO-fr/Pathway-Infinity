import SavedResultDetailClient from './client';

export default async function SavedResultDetail({ params }) {
    // Await params to handle Next.js 13+ App Router behavior
    const resolvedParams = await params;
    
    return <SavedResultDetailClient params={resolvedParams} />;
}