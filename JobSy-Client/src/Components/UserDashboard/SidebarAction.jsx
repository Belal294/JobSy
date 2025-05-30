export default function SidebarAction({ icon, text }) {
  return (
    <button className="w-full py-3 flex items-center justify-between text-gray-800 hover:bg-gray-100 rounded-md px-3 transition-colors duration-200 ease-in-out font-medium">
      <span>{text}</span>
      {icon}
    </button>
  );
}