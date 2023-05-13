import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ReactPaginate from 'react-paginate';
import "./App.scss"
import Cards from "./components/Cards";

function App() {
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [query, setQuery] = useState("");
  const [domainFilter, setDomainFilter] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");


  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch('https://mocki.io/v1/f05cb6e5-d9af-4d7f-b897-6cf8026d90d7');
      const data = await response.json();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  const usersPerPage = 20;
  const firstUserDisplayed = pageNumber * usersPerPage;
  const lastUserDisplayed = firstUserDisplayed + usersPerPage;
  const pageCount = Math.ceil(users.length / usersPerPage);


  function handlePageClick(event) {
    setPageNumber(event.selected);
  };

  function search(data) {
    let filteredData = data;
    if (query) {
      filteredData = filteredData.filter(user => user.first_name.toLowerCase().includes(query.toLowerCase()));
    }
    if (selectedGender) {
      filteredData = filteredData.filter(user => user.gender === selectedGender);
    }
    if (domainFilter) {
      filteredData = filteredData.filter(user => user.domain === domainFilter);
    }
    if (selectedAvailability) {
      filteredData = filteredData.filter(user => user.available.toString() == selectedAvailability);
    }

    return filteredData.slice(firstUserDisplayed,lastUserDisplayed);
  }

  function handleGenderChange(event) {
    setSelectedGender(event.target.value);
  }

  function handleDomainFilterChange(event) {
    setDomainFilter(event.target.value);
  }

  function handleAvailabilityChange(event) {
    setSelectedAvailability(event.target.value);
  }

  const domains = [...new Set(users.map(user => user.domain))];
  const genders = [...new Set(users.map(user => user.gender))];

  return (
    <div className="container">
      <nav class="navbar navbar-light navbar-expand">
      <form class="form-inline">
          <input class="form-control mr-4" type="search" placeholder="Search" aria-label="Search" onChange={e => setQuery(e.target.value)} />
          </form>
          <form class="form-inline flex">
        <select id="domain-filter" className="form-control" value={domainFilter} onChange={handleDomainFilterChange} >
            <option value="">Domain</option>
            {domains.map(domain => (
              <option key={domain} value={domain}>{domain}</option>
            ))}
          </select>

          <select className="form-control mr-4" value={selectedGender} onChange={handleGenderChange}>
            <option value="">Gender</option>
            {genders.map(gender => (
              <option key={gender} value={gender}>{gender}</option>
            ))}
          </select>

          <select className="form-control mr-4" value={selectedAvailability} onChange={handleAvailabilityChange}>
            <option value="">Availability</option>
            <option value="true">Available</option>
            <option value="false">Not Available</option>

          </select>
        </form>

      </nav>
      <Cards userData={search(users)}></Cards>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        breakLinkClassName="page-link"
        pageCount={pageCount}
        previousLabel="< previous"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        disabledClassName="disabled"
        pageLinkClassName='page-link'
      />
    </div>
     );
}

export default App;
