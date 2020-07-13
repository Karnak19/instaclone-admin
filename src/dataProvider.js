import axios from "axios";
import { stringify } from "query-string";

const apiUrl = "http://localhost:4040/api/v1";

export default {
  getList: (resource, params) => {
    const url = `${apiUrl}/${resource}`;

    return axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(({ data }) => {
        return {
          data: data.map((e) => {
            // We set username as an id.
            // From what i've understood, React Admin need an id
            // but my users resource use the username as the primary key
            let element = e;
            if (!e.id) {
              element.id = e.username;
            }
            return element;
          }),
          total: data.length,
        };
      });
  },

  getOne: (resource, params) =>
    axios
      .get(`${apiUrl}/${resource}/${params.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(({ data }) => ({
        data: data,
      })),

  getMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(({ data }) => ({ data: data }));
  },

  update: (resource, params) =>
    axios
      .put(
        `${apiUrl}/${resource}/${params.id}`,
        {
          ...params.data,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(({ json }) => ({ data: json })),

  create: (resource, params) =>
    axios
      .post(
        `${apiUrl}/${resource}`,
        {
          ...params.data,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(({ data }) => ({
        data: { ...params.data, id: data.username },
      })),
};
