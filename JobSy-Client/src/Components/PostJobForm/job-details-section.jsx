import RichTextEditor from "./rich-text-editor" // Assuming you have this component

const JobDetailsSection = ({ formData, handleInputChange }) => {
  return (
    <div className="p-6 border-b border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Job Details</h2>

      {/* Upload Company Image - Renamed from 'featuredImage' in UI, now 'company_image' to match serializer */}
      <div className="mb-6">
        <label htmlFor="company_image" className="block text-sm font-medium text-gray-700 mb-2">
          Upload Company Image (e.g., banner)
        </label>
        <label
          htmlFor="company_image"
          className="inline-block px-6 py-2 bg-lime-500 text-white font-semibold rounded-lg shadow-md cursor-pointer hover:bg-lime-600 transition duration-200"
        >
          Browse File
        </label>
        <input
          type="file"
          id="company_image"
          name="company_image" // Matches serializer field: company_image
          onChange={handleInputChange}
          className="hidden"
        />
        {formData.company_image && (
          <p className="mt-2 text-sm text-gray-500">
            Selected file: {formData.company_image.name}
          </p>
        )}
      </div>

      {/* Job Title - Renamed from 'jobTitle' in UI, now 'title' to match serializer */}
      <div className="mb-6">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
        <input
          type="text"
          id="title"
          name="title" // Matches serializer field: title
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Product Designer"
          className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {/* Location */}
      <div className="mb-6">
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">Location</label>
        <input
          type="text"
          id="location"
          name="location" // Matches serializer field: location
          value={formData.location}
          onChange={handleInputChange}
          placeholder="e.g. New York"
          className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {/* Job Type - Renamed from 'jobType' in UI, now 'job_type' to match serializer */}
      <div className="mb-6">
        <label htmlFor="job_type" className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
        <select
          id="job_type"
          name="job_type" // Matches serializer field: job_type
          value={formData.job_type}
          onChange={handleInputChange}
          className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
        >
          <option value="">Select Job Type</option>
          <option value="full-time">Full Time</option>
          <option value="part_time">Part Time</option>
          <option value="contract">Contract</option>
          <option value="freelance">Freelance</option>
        </select>
      </div>

      {/* Salary */}
      <div className="mb-6">
        <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-2">Salary (Optional)</label>
        <input
          type="text" // Changed type to text to align with CharField in serializer, though validation could be added for numbers
          id="salary"
          name="salary" // Matches serializer field: salary
          value={formData.salary}
          onChange={handleInputChange}
          placeholder="e.g. 100000"
          className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {/* Vacancy */}
      <div className="mb-6">
        <label htmlFor="vacancy" className="block text-sm font-medium text-gray-700 mb-2">Vacancy (Optional)</label>
        <input
          type="number"
          id="vacancy"
          name="vacancy" // Matches serializer field: vacancy
          value={formData.vacancy}
          onChange={handleInputChange}
          placeholder="e.g. 5"
          className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {/* Experience */}
      <div className="mb-6">
        <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">Experience (Optional)</label>
        <input
          type="text"
          id="experience"
          name="experience" // Matches serializer field: experience
          value={formData.experience}
          onChange={handleInputChange}
          placeholder="e.g. 2+ years"
          className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {/* Gender */}
      <div className="mb-6">
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">Gender Preference</label>
        <select
          id="gender"
          name="gender" // Matches serializer field: gender
          value={formData.gender}
          onChange={handleInputChange}
          className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
        >
          <option value="any">Any</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      {/* Deadline */}
      <div className="mb-6">
        <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
          Application Deadline
        </label>
        <input
          type="date"
          id="deadline"
          name="deadline" // Matches serializer field: deadline
          value={formData.deadline}
          onChange={handleInputChange}
          className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                       calendar-icon-black"
        />
      </div>

      {/* Job Description - Renamed from 'jobDescription' in UI, now 'description' to match serializer */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
        <RichTextEditor
          name="description" // Matches serializer field: description
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Write Job Description!"
          rows={8}
        />
      </div>

      {/* Responsibilities */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Responsibilities (Optional)</label>
        <RichTextEditor
          name="responsibilities" // Matches serializer field: responsibilities
          value={formData.responsibilities}
          onChange={handleInputChange}
          placeholder="List job responsibilities here..."
          rows={6}
        />
      </div>

      {/* Education */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Education Requirements (Optional)</label>
        <RichTextEditor
          name="education" // Matches serializer field: education
          value={formData.education}
          onChange={handleInputChange}
          placeholder="Specify education requirements..."
          rows={6}
        />
      </div>

      {/* Benefits */}
      <div className="mb-6">
        <label className="text-black block text-sm font-medium mb-2">Benefits (Optional)</label>
        <RichTextEditor
          name="benefits" // Matches serializer field: benefits
          value={formData.benefits}
          onChange={handleInputChange}
          placeholder="List benefits offered..."
          rows={6}
        />
      </div>
    </div>
  );
};

export default JobDetailsSection;