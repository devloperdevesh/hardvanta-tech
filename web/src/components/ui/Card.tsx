export default function Card({ children }: any) {
    return (
      <div className="bg-white border rounded-xl p-5 hover:shadow-lg transition">
        {children}
      </div>
    );
  }