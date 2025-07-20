import axios from "axios";
import { Note } from "@/types/note";

const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const API_URL = 'https://notehub-public.goit.study/api/notes';

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface NewNoteData {
  title: string;
  content: string;
  tag: string;
}

export const fetchNotes = async (search: string, page: number, tag?: string): Promise<NotesResponse> => {
  const params: Record<string, string | number> = { page };
  if (search) params.search = search;
  if (tag) params.tag = tag;

  const { data } = await axios.get<NotesResponse>(API_URL, {
    params,
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  return data;
};

export const fetchNoteById = async (id: string | number): Promise<Note> => {
  const { data } = await axios.get<Note>(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  return data;
};

export const createNote = async (noteData: NewNoteData): Promise<Note> => {
  const { data } = await axios.post<Note>(API_URL, noteData, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  return data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const { data } = await axios.delete<Note>(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  return data;
};