'use client';

import css from './NotesPage.module.css';
import { NoteList } from '@/components/NoteList/NoteList';
import { fetchNotes } from '@/lib/api';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useState } from 'react';
import { Pagination } from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import { NoteForm } from '@/components/NoteForm/NoteForm';
import { SearchBox } from '@/components/SearchBox/SearchBox';
import { useDebouncedCallback } from 'use-debounce';

export default function App() {
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [search, setSearch] = useState('');
  const handleOpenModal = () => {
    setModal(true);
  };
  const handleCloseModal = () => {
    setModal(false);
  };

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const perPage = 12;

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes({ page, perPage, search }),
    placeholderData: keepPreviousData,
  });
  const notes = data?.notes ?? [];
  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error</p>;
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {isFetching && <p>Updating...</p>}
        <button onClick={handleOpenModal} className={css.button}>
          Create note +
        </button>
        {modal && (
          <Modal closeFunction={handleCloseModal}>
            <NoteForm onClose={handleCloseModal} />
          </Modal>
        )}

        <SearchBox
          value={searchValue}
          onChange={value => {
            setSearchValue(value);
            handleSearch(value);
          }}
        />

        {(data?.totalPages ?? 0) > 1 && (
          <Pagination
            totalPages={data?.totalPages ?? 0}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
      </header>
      {notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}
