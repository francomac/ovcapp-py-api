// En tu punto de entrada de la aplicación
import "@tailwindcss/ui/dist/tailwind-ui.min.css"; // Importa los estilos de Tailwind UI
import "tailwindcss/tailwind.css"; // Importa los estilos base de Tailwind CSS

import { useEffect, useState } from "react";
import api from "./api";
import Header from "./components/Header.jsx";
import DateTimePicker from "./components/dateTimePicker/DateTimePicker.jsx";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
    is_income: false,
    date: "",
  });

  const fetchTransactions = async () => {
    const response = await api.get("/transactions/");
    console.log(response);
    setTransactions(response.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleInputChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await api.post("/transactions", formData);
    fetchTransactions();
    setFormData({
      amount: "",
      category: "",
      description: "",
      is_income: false,
      date: "",
    });
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen);
  }

  console.log(transactions);

  return (
    <>
      <Header onToggleSidebar={toggleSidebar} />
      <form onSubmit={handleFormSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Amount
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="amount"
                    id="amount"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleInputChange}
                    value={formData.amount}
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="category"
                    id="category"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleInputChange}
                    value={formData.category}
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="description"
                    id="description"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleInputChange}
                    value={formData.description}
                  />
                </div>
              </div>

              <fieldset className="sm:col-span-3">
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  Income?
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="is_income"
                        name="is_income"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        onChange={handleInputChange}
                        value={formData.value}
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="is_income"
                        className="font-medium text-gray-900"
                      >
                        Income?
                      </label>
                      <p className="text-gray-500">Income Data...</p>
                    </div>
                  </div>
                </div>
              </fieldset>

              <div className="sm:col-span-3">
                <label
                  htmlFor="send-to"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Send On
                </label>
                <div className="mt-2">
                  <DateTimePicker
                    id="send-on"
                    name="send-on"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={handleInputChange}
                    value={formData.date}
                  />
                </div>
              </div>

              <div
                className="h-6 w-px bg-gray-200 lg:hidden"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="-mx-4 mt-8 sm:-mx-0">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Income?
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Send On
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {transactions.map((record) => (
                <tr key={record.id}>
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                    {record.name}
                    <dl className="font-normal lg:hidden">
                      <dt className="sr-only">Category</dt>
                      <dd className="mt-1 truncate text-gray-700">
                        {record.category}
                      </dd>
                      <dt className="sr-only sm:hidden">Description</dt>
                      <dd className="mt-1 truncate text-gray-500 sm:hidden">
                        {record.description}
                      </dd>
                    </dl>
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500 lg:table-cell">
                    {record.amount}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {record.is_income ? "Yes" : "No"}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {record.date}
                  </td>
                  <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit<span className="sr-only">, {record.name}</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default App;
