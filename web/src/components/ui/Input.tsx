export default function Input(props: any) {
    return (
      <input
        {...props}
        className="border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 w-full"
      />
    );
  }