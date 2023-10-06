import React, { useState, useEffect } from "react";

export default function Capsules() {
  const [capsules, setCapsules] = useState([]);
  const [filteredCapsules, setFilteredCapsules] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [capsulesPerPage] = useState(9);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(null);



  useEffect(() => {
    const fetchCapsules = async () => {
      const res = await fetch("https://api.spacexdata.com/v4/capsules");
      const data = await res.json();
      setCapsules(data);
    };

    fetchCapsules();
  }, []);

  useEffect(() => {
    setFilteredCapsules(
      capsules.filter(({ type, serial, launches, status }) => {
        const matchesSearch =
          type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          serial.toLowerCase().includes(searchQuery.toLowerCase()) ||
          launches.length.toString().includes(searchQuery.toLowerCase());
  
        const isFilterMatch = selectedFilter
          ? status.toLowerCase() === selectedFilter
          : true;
  
        return matchesSearch && isFilterMatch;
      })
    );
  }, [searchQuery, capsules, selectedFilter]);
  
  
  

  const indexOfLastCapsule = currentPage * capsulesPerPage;
  const indexOfFirstCapsule = indexOfLastCapsule - capsulesPerPage;
  const currentCapsules = filteredCapsules.slice(indexOfFirstCapsule, indexOfLastCapsule);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {/* Search Bar */}
      <div className="flex items-center justify-center h-12 mb-8">
        <input
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Search for Capsules..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
      </div>

        <div className="flex items-center justify-center mb-4">
        <label className="mr-4 text-green-500">
          <input
            type="checkbox"
            checked={selectedFilter === "active"}
            onChange={() => setSelectedFilter("active")}
          />{" "}
          Show Active Capsules
        </label>
        <label className="text-red-500">
          <input
            type="checkbox"
            checked={selectedFilter === "retired"}
            onChange={() => setSelectedFilter("retired")}
          />{" "}
          Show Retired Capsules (NON-DESTROYED/UNKNOWN)
        </label>
      </div>




      {/* Capsules */}
      <section className="py-32">
      <h1 className="heading text-center mb-10">Capsules</h1>
        
        <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5">
          {currentCapsules.map(
            ({
              id,
              type,
              serial,
              launches,
              last_update,
              land_landings,
              water_landings,
              reuse_count,
              status,
            }) => (
              <article key={id} className="articles">
                <h2 className="text-xl font-bold mb-5">
                    {type},{" "}
                    <span className="text-base opacity-75 font-light">
                      {serial}
                    </span>
                  </h2>
                  <ul>
                    <li className="mb-1">{launches.length} launches</li>
                    <li className="mb-1">{land_landings} land landings</li>
                    <li className="mb-1">{water_landings} water landings</li>
                    <li className="mb-1">Reused {reuse_count} times</li>
                    {status === "active" ? (
                      <li className="text-emerald-500">Active</li>
                    ) : (
                      <li className="text-rose-500">Retired</li>
                    )}
                  </ul>
                  <p className="mt-5 opacity-75">{last_update}</p>
              </article>
            )
          )}
        </div>

        {/* Pagination */}
        <div className="pagination">
          {[...Array(Math.ceil(filteredCapsules.length / capsulesPerPage)).keys()].map((number) => (
            <button key={number} onClick={() => paginate(number + 1)}>
              {number + 1}
            </button>
          ))}
        </div>
      </section>
    </>
  );
}
