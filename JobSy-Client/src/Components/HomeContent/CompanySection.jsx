import React from 'react';
import UseFetchJobList from '../Hooks/UseFetchJobList';

export default function CompanySection() {
  const { fetchedJobs, loading } = UseFetchJobList();
  const companies = fetchedJobs.slice(0, 8); 

  if (loading) {
    return <p>Loading companies...</p>;
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Companies We've Helped</h2>
        <p className="text-gray-500 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
          Discover some of the companies we've had the pleasure of working with.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center">
          {companies.length > 0 ? (
            companies.map((company, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              >
                <img
                  src={company.logo_image} 
                  alt={`${company.name} logo`}
                  className="max-h-12 w-auto object-contain filter brightness-0 contrast-100"
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500">No company logos available at the moment.</p>
          )}
        </div>
      </div>
    </section>
  );
}
