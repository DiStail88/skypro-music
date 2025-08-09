'use client';
import React, { useState, useRef } from 'react';
import { getUniqueValuesByKey } from '@/utils/helper';
import FilterItem from '../FilterItem/FilterItem';
import { data } from '@/data';
import style from './filter.module.css';

type FilterType = 'author' | 'year' | 'genre' | null;

export default function Filter() {
  const [openFilter, setOpenFilter] = useState<FilterType>(null);
  const [selectedFilters, setSelectedFilters] = useState<{
    author?: string;
    genre?: string;
    year?: string;
  }>({});
  const buttonRefs = {
    author: useRef<HTMLDivElement>(null),
    year: useRef<HTMLDivElement>(null),
    genre: useRef<HTMLDivElement>(null),
  };

  const uniqueAuthors = getUniqueValuesByKey(data, 'author');
  const uniqueGenres = getUniqueValuesByKey(data, 'genre');
  const yearOptions = ['Сначала новые', 'Сначала старые', 'По умолчанию'];

  function toggleFilter(type: FilterType) {
    setOpenFilter((prev) => (prev === type ? null : type));
  }

  function handleSelect(value: string) {
    if (!openFilter) return;
    setSelectedFilters((prev) => ({
      ...prev,
      [openFilter]: prev[openFilter] === value ? '' : value,
    }));
  }

  const getItemsForFilter = () => {
    switch (openFilter) {
      case 'author':
        return uniqueAuthors;
      case 'genre':
        return uniqueGenres;
      case 'year':
        return yearOptions;
      default:
        return [];
    }
  };

  const getFilterPosition = () => {
    if (!openFilter) return { left: 0 };
    const button = buttonRefs[openFilter].current;
    if (!button) return { left: 0 };

    return {
      left: button.offsetLeft,
    };
  };

  return (
    <div className={style.centerblock__filter}>
      <div
        ref={buttonRefs.author}
        className={`${style.filter__button} ${
          openFilter === 'author' ? style.filter__button_active : ''
        }`}
        onClick={() => toggleFilter('author')}
      >
        Исполнителю
      </div>
      <div
        ref={buttonRefs.year}
        className={`${style.filter__button} ${
          openFilter === 'year' ? style.filter__button_active : ''
        }`}
        onClick={() => toggleFilter('year')}
      >
        Году выпуска
      </div>
      <div
        ref={buttonRefs.genre}
        className={`${style.filter__button} ${
          openFilter === 'genre' ? style.filter__button_active : ''
        }`}
        onClick={() => toggleFilter('genre')}
      >
        Жанру
      </div>

      {openFilter && (
        <div className={style.filter__list} style={getFilterPosition()}>
          {getItemsForFilter().map((item) => (
            <FilterItem
              key={item}
              value={item}
              isSelected={selectedFilters[openFilter] === item}
              onClick={handleSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}
