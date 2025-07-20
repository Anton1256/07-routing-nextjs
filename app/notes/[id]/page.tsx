import { fetchNoteById } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NoteDetailsClient from "./NoteDetails.client";

type NoteDetailsProps = {
  params: Promise<{id: string}>
}

const NoteDetails = async ({ params }: NoteDetailsProps) => {
  const queryClient = new QueryClient();
  const { id } = await params;
  const idNum = Number(id);

  await queryClient.prefetchQuery({
    queryKey: ['note', idNum],
    queryFn: () => fetchNoteById(idNum),
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient />
      </HydrationBoundary>
    </div>
  )
}

export default NoteDetails