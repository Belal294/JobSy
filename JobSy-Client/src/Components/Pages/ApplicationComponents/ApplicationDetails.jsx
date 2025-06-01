export default function ApplicationDetails({ formData, handleInputChange }) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">APPLICATION DETAILS:</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="job_title" className="block text-sm font-medium text-gray-700 mb-1">
            Applying For Position
          </label>
          <input
            type="text"
            id="job_title"
            name="job_title" // ✅ correct key
            value={formData.job_title}
            onChange={handleInputChange}
            className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Software Engineer, Marketing Manager"
            required
          />
        </div>

        <div>
          <label htmlFor="years_experience" className="block text-sm font-medium text-gray-700 mb-1">
            Years of Experience
          </label>
          <input
            type="number"
            id="years_experience"
            name="years_experience" // ✅ correct key
            value={formData.years_experience}
            onChange={handleInputChange}
            className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            required
          />
        </div>

        <div>
          <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
            Earliest Start Date
          </label>
          <input
            type="date"
            id="availability"
            name="availability"
            value={formData.availability}
            onChange={handleInputChange}
            className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="expected_salary" className="block text-sm font-medium text-gray-700 mb-1">
            Expected Annual Salary (in USD)
          </label>
          <input
            type="number"
            id="expected_salary"
            name="expected_salary" 
            value={formData.expected_salary}
            onChange={handleInputChange}
            className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            step="1000"
            placeholder="e.g., 60000"
          />
        </div>
      </div>
    </div>
  );
}
