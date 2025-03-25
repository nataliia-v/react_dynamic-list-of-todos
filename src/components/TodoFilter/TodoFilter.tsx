import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

enum SelectTodos {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

type Props = {
  todos: Todo[];
  changeTodoList: (filteredTodos: Todo[]) => void;
};

export const TodoFilter: React.FC<Props> = ({ todos, changeTodoList }) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<SelectTodos>(
    SelectTodos.All,
  );

  const changeSelectedValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value as SelectTodos);
  };

  const changeSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    let filteredTodos = [...todos];

    if (selectedValue === SelectTodos.Active) {
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
    }

    if (selectedValue === SelectTodos.Completed) {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
    }

    if (searchValue.trim() !== '') {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }

    changeTodoList(filteredTodos);
  }, [selectedValue, searchValue, todos, changeTodoList]);

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedValue}
            onChange={changeSelectedValue}
          >
            {Object.entries(SelectTodos).map(([key, value]) => (
              <option key={key} value={value}>
                {key}
              </option>
            ))}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          value={searchValue}
          placeholder="Search..."
          onChange={changeSearchValue}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchValue.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setSearchValue('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
