const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchTodo = () => {
  return fetch(`${BASE_URL}/todos`)
    .then(response => response.json())
    .then(json => json)
    .catch(error => {
      throw error
    });
}

export const fetchTodoById = (id) => {
  return fetch(`${BASE_URL}/todos/${id}`)
    .then(response => response.json())
    .then(json => json)
    .catch(error => {
      throw error
    });
}
