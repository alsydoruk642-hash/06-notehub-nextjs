import axios from 'axios';
import type { Note, NoteTag } from '../types/note';

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  search?: string;
  page: number;
  perPage: number;
}
interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}
interface DeleteNoteParams {
  id: string;
}
const NEXT_PUBLIC_NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
axios.defaults.baseURL = 'https://notehub-public.goit.study/api/';
axios.defaults.headers.common['Authorization'] =
  `Bearer ${NEXT_PUBLIC_NOTEHUB_TOKEN}`;

export async function fetchNotes({ search, page, perPage }: FetchNotesParams) {
  const response = await axios.get<FetchNotesResponse>('/notes', {
    params: {
      search,
      page,
      perPage,
    },
  });
  return response.data;
}

export async function createNote({ title, content, tag }: CreateNoteParams) {
  const response = await axios.post<Note>('/notes', { title, content, tag });
  return response.data;
}

export async function deleteNote({ id }: DeleteNoteParams) {
  const response = await axios.delete<Note>(`/notes/${id}`);
  return response.data;
}
