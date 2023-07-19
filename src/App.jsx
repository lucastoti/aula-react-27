import React, { useState } from 'react';

const App = () => {
	const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [published, setPublished] = useState(false);
  const [id, setId] = useState('');
  const [tutorial, setTutorial] = useState(null);

	const fetchData = () => {
		fetch('http://localhost:9000/api/tutorials')
	    .then(data => data.json())
	    .then(res => console.log(res))
	};

  const save = () => {
    console.log(title, description, published);
    const novoTutorial = {
      title: title,
      description: description,
      published: published
    };

    fetch('http://localhost:9000/api/tutorials', {
        method: 'POST',
        body: JSON.stringify(novoTutorial),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(data => data.json())
      .then(res => console.log(res))
  };

  const buscar = () => {
    const url = 'http://localhost:9000/api/tutorials/' + id;
    fetch(url)
      .then(data => data.json())
      .then(res => setTutorial(res))
      .catch(erro => console.log(erro))
  };

  const tratandoValor = () => {
    if (tutorial) {
      if (tutorial.id) {
        return tutorial.title;
      } else {
        return tutorial.message;
      }
    } else {
      return 'Sem resultados';
    }
  }

  const atualizar = () => {
    const url = 'http://localhost:9000/api/tutorials/' + id;
    const atualizacao = {
      title: title
    };

    fetch(url, {
        method: 'PUT',
        body: JSON.stringify(atualizacao),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(data => data.json())
      .then(res => console.log(res))
  };

  const deletar = () => {
    const url = 'http://localhost:9000/api/tutorials/' + id;
    fetch(url, {
        method: 'DELETE',
      })
      .then(data => data.json())
      .then(res => console.log(res))
  };
  return (
    <div>
      <div>
        <label>
          Title:
          <input value={title} onChange={e => setTitle(e.target.value)} />
        </label>
      </div>

      <div>
        <label>
          Description:
          <input value={description} onChange={e => setDescription(e.target.value)} />
        </label>
      </div>

      <div>
        <label>
          Published:
          <input type='checkbox' value={published} onChange={e => setPublished(e.target.checked)} />
        </label>
      </div>

      <div>
        <button onClick={save}>Save</button>
      </div>

      ----------------

      <div>
        Meu tutorial => ID
        <br />
        <input type='number' value={id} onChange={e => setId(e.target.value)} />
        <button onClick={buscar}>Buscar</button>
      </div>

      <div>
        {tratandoValor()}
      </div>

      ----------------

      <div>
        Atualizar meu tutorial => ID
        <br />
        <input type='number' value={id} onChange={e => setId(e.target.value)} /> <br/>
        Title: <input value={title} onChange={e => setTitle(e.target.value)} /> <br/>
        <button onClick={atualizar}>Atualizar</button>
      </div>

      ----------------  

      <div>
        Deletar um tutorial => ID
        <br />
        <input type='number' value={id} onChange={e => setId(e.target.value)} /> <br/>
        <button onClick={deletar}>Deletar</button>
      </div>


    </div>
  )
};

export default App;
