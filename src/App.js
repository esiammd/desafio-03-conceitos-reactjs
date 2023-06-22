import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `new-repository-${Date.now()}`,
      url: `https://github.com/username/new-repository-${Date.now()}`,
      techs: ['NodeJS', 'ReactJS', 'JavaScript']
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.splice(id, 1));
  }

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
