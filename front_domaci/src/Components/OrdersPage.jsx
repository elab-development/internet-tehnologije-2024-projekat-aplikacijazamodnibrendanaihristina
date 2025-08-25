import React, { useState } from "react";
import "./OrdersPage.css";
import Navigation from "./Navigation";
import Pagination from "./Pagination";
const OrdersPage = () => {
  const [orders, setOrders] = useState([
    
      {
        id: 1,
        customer: "Milan Jovanović",
        items: [
          { name: "Duks", quantity: 2, price: 2500 },
          { name: "Jakna", quantity: 1, price: 7000 },
        ],
        total: 12000,
        status: "Na čekanju",
      },
      {
        id: 2,
        customer: "Ana Petrović",
        items: [
          { name: "Majica", quantity: 3, price: 1500 },
          { name: "Pantalone", quantity: 1, price: 4000 },
        ],
        total: 8500,
        status: "Izvršena",
      },
      {
        id: 3,
        customer: "Marko Milutinović",
        items: [
          { name: "Kaput", quantity: 1, price: 9000 },
          { name: "Šal", quantity: 2, price: 1000 },
        ],
        total: 11000,
        status: "Na čekanju",
      },
      {
        id: 4,
        customer: "Jovana Nikolić",
        items: [
          { name: "Haljina", quantity: 1, price: 5000 },
          { name: "Cipele", quantity: 1, price: 7500 },
        ],
        total: 12500,
        status: "Izvršena",
      },
      {
        id: 5,
        customer: "Petar Ilić",
        items: [
          { name: "Košulja", quantity: 2, price: 2500 },
          { name: "Kaiš", quantity: 1, price: 1500 },
        ],
        total: 6500,
        status: "Na čekanju",
      },
      {
        id: 6,
        customer: "Nina Pavlović",
        items: [
          { name: "Sako", quantity: 1, price: 8000 },
          { name: "Bluza", quantity: 2, price: 3000 },
        ],
        total: 14000,
        status: "Izvršena",
      },
      {
        id: 7,
        customer: "Vladimir Popović",
        items: [
          { name: "Kapa", quantity: 3, price: 1200 },
          { name: "Jakna", quantity: 1, price: 6000 },
        ],
        total: 9600,
        status: "Na čekanju",
      },
      {
        id: 8,
        customer: "Dragana Živanović",
        items: [
          { name: "Sandale", quantity: 2, price: 4000 },
          { name: "Torba", quantity: 1, price: 7000 },
        ],
        total: 15000,
        status: "Izvršena",
      },
      {
        id: 9,
        customer: "Igor Kostić",
        items: [
          { name: "Sat", quantity: 1, price: 12000 },
          { name: "Narukvica", quantity: 2, price: 3000 },
        ],
        total: 18000,
        status: "Na čekanju",
      },
      {
        id: 10,
        customer: "Milica Stanković",
        items: [
          { name: "Čizme", quantity: 1, price: 10000 },
          { name: "Čarape", quantity: 5, price: 500 },
        ],
        total: 12500,
        status: "Izvršena",
      },
  ]);

  const [statusFilter, setStatusFilter] = useState("Svi");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredOrders = orders.filter(
    (order) => statusFilter === "Svi" || order.status === statusFilter
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const displayedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleStatusChange = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id
          ? { ...order, status: order.status === "Na čekanju" ? "Izvršena" : "Na čekanju" }
          : order
      )
    );
  };


  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <Navigation />
      <div className="orders-page">
        <h2 className="page-title">Pregled porudžbina</h2>
        <div className="filter-container">
          <label htmlFor="statusFilter">Filter po statusu:</label>
          <select
            id="statusFilter"
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="Svi">Svi</option>
            <option value="Na čekanju">Na čekanju</option>
            <option value="Izvršena">Izvršena</option>
          </select>
        </div>

        <table className="orders-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Korisnik</th>
              <th>Stavke</th>
              <th>Ukupna cena</th>
              <th>Status</th>
              <th>Akcija</th>
            </tr>
          </thead>
          <tbody>
            {displayedOrders.map((order, index) => (
              <tr key={order.id}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{order.customer}</td>
                <td>
                  <ul>
                    {order.items.map((item, i) => (
                      <li key={i}>
                        {item.name} x{item.quantity} - {item.price} RSD
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{order.total} RSD</td>
                <td
                  className={`status ${
                    order.status === "Izvršena" ? "completed" : "pending"
                  }`}
                >
                  {order.status}
                </td>
                <td>
                  <button
                    className="status-btn"
                    onClick={() => handleStatusChange(order.id)}
                  >
                    {order.status === "Na čekanju"
                      ? "Označi kao izvršena"
                      : "Vrati na čekanje"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

         <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPrev={handlePrevPage}
                onNext={handleNextPage}
              />
      </div>
    </div>
  );
};

export default OrdersPage;
