export default function Button({ children, className, ...props }: any) {
  return (
    <button
      {...props}
      className={`bg-black text-white py-2 rounded-lg hover:scale-105 hover:shadow-md transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
}