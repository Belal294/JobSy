import RichTextEditor from "./rich-text-editor" // Assuming you have this component

const CompanyDetailsSection = ({ formData, handleInputChange }) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Company Details</h2>

      {/* Company Name - Renamed from 'companyName' in UI, now 'company_name' to match serializer */}
      <div className="mb-6">
        <label htmlFor="company_name" className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
        <input
          type="text"
          id="company_name"
          name="company_name" // Matches serializer field: company_name
          value={formData.company_name}
          onChange={handleInputChange}
          placeholder="e.g. Acme Corp"
          className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {/* Upload Logo - Renamed from 'featuredImage' in UI, now 'logo_image' to match serializer */}
      <div className="mb-6">
        <label htmlFor="logo_image" className="block text-sm font-medium text-gray-700 mb-2">
          Upload Logo
        </label>
        <label
          htmlFor="logo_image"
          className="inline-block px-6 py-2 bg-lime-500 text-white font-semibold rounded-lg shadow-md cursor-pointer hover:bg-lime-600 transition duration-200"
        >
          Browse File
        </label>
        <input
          type="file"
          id="logo_image"
          name="logo_image" // Matches serializer field: logo_image
          onChange={handleInputChange}
          className="hidden"
        />
        {formData.logo_image && (
          <p className="mt-2 text-sm text-gray-500">
            Selected file: {formData.logo_image.name}
          </p>
        )}
      </div>

      {/* Removed fields that are not in JobSerializer:
          tagline, companyDescription, website, facebookUsername, twitterUsername, linkedinUsername
      */}
    </div>
  );
};

export default CompanyDetailsSection;